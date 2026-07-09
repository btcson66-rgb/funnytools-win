// Email download gate: results stay free on-page; downloading a file asks for
// an email first and the backend mails the file (or unlocks a local download).
// Config + labels are injected by ToolLayout as a JSON script tag so this
// module stays i18n-free. If the config tag is missing the gate is disabled
// and every download falls back to the original local behavior.

import { SITE } from '../config/site';
import { trackDownloadGate } from './analytics';

const ENDPOINT = SITE.downloadGateEndpoint;
const STORAGE_KEY = 'ft_gate_email';
const MAX_EMAIL_FILE_BYTES = 5 * 1024 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface GateFile {
  blob: Blob;
  filename: string;
}

export interface GateRequest {
  tool: string;
  /** Produce the generated file; return null if it cannot be built. */
  getFile: () => Promise<GateFile | null> | GateFile | null;
  /** Original local download behavior; used as fail-open fallback. */
  fallback: () => void;
  /** Element the gate panel is inserted after; defaults to the tool's .actions row. */
  anchor?: HTMLElement | null;
}

interface GateLabels {
  title: string;
  desc: string;
  emailPlaceholder: string;
  submit: string;
  sending: string;
  sentEmail: string;
  sentLocal: string;
  invalidEmail: string;
  error: string;
  privacyNote: string;
  changeEmail: string;
}

interface GateConfig {
  lang: string;
  labels: GateLabels;
}

let cachedConfig: GateConfig | null | undefined;
let stylesInjected = false;

function readConfig(): GateConfig | null {
  if (cachedConfig !== undefined) return cachedConfig;

  const tag = document.querySelector('script[data-download-gate-config]');
  if (!tag || !tag.textContent) {
    cachedConfig = null;
    return cachedConfig;
  }

  try {
    cachedConfig = JSON.parse(tag.textContent) as GateConfig;
  } catch {
    cachedConfig = null;
  }

  return cachedConfig;
}

function savedEmail(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function saveEmail(email: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, email);
  } catch {
    /* private mode: gate still works per-session */
  }
}

function clearEmail() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function injectStyles() {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement('style');
  style.textContent = [
    '.ft-gate{margin-top:14px;padding:16px;border:1px solid var(--line);border-radius:10px;background:var(--card);display:grid;gap:10px;}',
    '.ft-gate p{margin:0;color:var(--ink);}',
    '.ft-gate .ft-gate-note{color:var(--muted);font-size:0.85rem;line-height:1.5;}',
    '.ft-gate form{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;}',
    '.ft-gate input[type=email]{min-height:44px;border:1px solid var(--line);border-radius:8px;background:var(--soft);color:var(--ink);padding:8px 12px;font:inherit;}',
    '.ft-gate .ft-gate-status[hidden]{display:none;}',
    '.ft-gate .ft-gate-change{background:none;border:none;padding:0;color:var(--brand);cursor:pointer;font:inherit;text-decoration:underline;}',
    '@media (max-width:560px){.ft-gate form{grid-template-columns:1fr;}}',
  ].join('\n');
  document.head.appendChild(style);
}

function buildToolUrl(): string {
  return window.location.origin + window.location.pathname;
}

async function resolveFile(request: GateRequest): Promise<GateFile | null> {
  try {
    return await request.getFile();
  } catch {
    return null;
  }
}

async function submitGate(email: string, request: GateRequest, labels: GateLabels, lang: string, setStatus: (text: string, busy?: boolean) => void): Promise<void> {
  setStatus(labels.sending, true);
  trackDownloadGate('gate_submit', request.tool);

  const formData = new FormData();
  formData.set('email', email);
  formData.set('site', 'funnytools');
  formData.set('tool', request.tool);
  formData.set('lang', lang);
  formData.set('toolUrl', buildToolUrl());
  formData.set('website', '');

  const file = await resolveFile(request);
  if (file && file.blob.size > 0 && file.blob.size <= MAX_EMAIL_FILE_BYTES) {
    formData.set('file', file.blob, file.filename);
  }

  let payload: { ok?: boolean; delivery?: string; code?: string } | null = null;

  try {
    const response = await fetch(ENDPOINT, { method: 'POST', body: formData });
    payload = (await response.json()) as { ok?: boolean; delivery?: string; code?: string };
  } catch {
    payload = null;
  }

  if (!payload) {
    // Endpoint unreachable: never hold the user's file hostage to our backend.
    trackDownloadGate('gate_fallback_local', request.tool, 'endpoint_unreachable');
    request.fallback();
    setStatus(labels.sentLocal);
    return;
  }

  if (!payload.ok) {
    if (payload.code === 'invalid_email') {
      setStatus(labels.invalidEmail);
      return;
    }
    trackDownloadGate('gate_fallback_local', request.tool, payload.code || 'server_error');
    request.fallback();
    setStatus(labels.sentLocal);
    return;
  }

  saveEmail(email);

  if (payload.delivery === 'email') {
    trackDownloadGate('gate_email_sent', request.tool);
    setStatus(labels.sentEmail.replace('{email}', email));
    return;
  }

  trackDownloadGate('gate_fallback_local', request.tool, 'delivery_local');
  request.fallback();
  setStatus(labels.sentLocal);
}

function renderPanel(request: GateRequest, config: GateConfig, mount: HTMLElement, prefill: string) {
  injectStyles();

  const existing = mount.parentElement?.querySelector<HTMLElement>('.ft-gate[data-gate-tool="' + request.tool + '"]');
  if (existing) {
    existing.hidden = false;
    existing.querySelector<HTMLInputElement>('input[type=email]')?.focus();
    return existing;
  }

  const labels = config.labels;
  const panel = document.createElement('div');
  panel.className = 'ft-gate';
  panel.setAttribute('data-gate-tool', request.tool);

  const title = document.createElement('p');
  title.innerHTML = '<strong></strong>';
  (title.firstChild as HTMLElement).textContent = labels.title;

  const desc = document.createElement('p');
  desc.className = 'ft-gate-note';
  desc.textContent = labels.desc;

  const form = document.createElement('form');
  form.noValidate = true;

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.required = true;
  emailInput.placeholder = labels.emailPlaceholder;
  emailInput.autocomplete = 'email';
  emailInput.value = prefill;

  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'website';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  honeypot.setAttribute('aria-hidden', 'true');
  honeypot.style.position = 'absolute';
  honeypot.style.left = '-9999px';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'btn go';
  submitButton.textContent = labels.submit;

  const status = document.createElement('p');
  status.className = 'ft-gate-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.hidden = true;

  const note = document.createElement('p');
  note.className = 'ft-gate-note';
  note.textContent = labels.privacyNote;

  form.append(emailInput, honeypot, submitButton);
  panel.append(title, desc, form, status, note);
  mount.insertAdjacentElement('afterend', panel);

  const setStatus = (text: string, busy = false) => {
    status.textContent = text;
    status.hidden = !text;
    submitButton.disabled = busy;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (honeypot.value.trim()) return;

    const email = emailInput.value.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus(labels.invalidEmail);
      return;
    }

    void submitGate(email, request, labels, config.lang, setStatus);
  });

  emailInput.focus();
  return panel;
}

/**
 * Entry point for tool components: call instead of triggering the download
 * directly. Shows the email panel (or reuses the saved email) and delivers
 * the file by email, falling back to the original local download whenever
 * delivery by email is not possible.
 */
export function requestGatedDownload(request: GateRequest): void {
  const config = readConfig();

  if (!config) {
    request.fallback();
    return;
  }

  trackDownloadGate('gate_view', request.tool);

  const mount =
    request.anchor ||
    (document.querySelector('.tool-interaction .actions') as HTMLElement | null) ||
    (document.querySelector('.tool-interaction') as HTMLElement | null);

  if (!mount) {
    request.fallback();
    return;
  }

  const known = savedEmail();

  if (known && EMAIL_PATTERN.test(known)) {
    const panel = renderPanel(request, config, mount, known);
    const status = panel.querySelector<HTMLElement>('.ft-gate-status');
    const form = panel.querySelector('form');
    const submitButton = panel.querySelector<HTMLButtonElement>('button[type=submit]');
    if (form) form.hidden = true;

    const setStatus = (text: string, busy = false) => {
      if (status) {
        status.textContent = text;
        status.hidden = !text;
      }
      if (submitButton) submitButton.disabled = busy;
    };

    void submitGate(known, request, config.labels, config.lang, setStatus).then(() => {
      if (!status || status.hidden) return;
      const change = document.createElement('button');
      change.type = 'button';
      change.className = 'ft-gate-change';
      change.textContent = config.labels.changeEmail;
      change.addEventListener('click', () => {
        clearEmail();
        change.remove();
        if (form) {
          form.hidden = false;
          panel.querySelector<HTMLInputElement>('input[type=email]')?.focus();
        }
      });
      status.append(' ');
      status.appendChild(change);
    });
    return;
  }

  renderPanel(request, config, mount, '');
}
