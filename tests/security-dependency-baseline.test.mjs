import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

function versionParts(version) {
  return version.split(".").map(Number);
}

function atLeast(actual, minimum) {
  const left = versionParts(actual);
  const right = versionParts(minimum);

  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    const part = left[index] ?? 0;
    const floor = right[index] ?? 0;

    if (part !== floor) {
      return part > floor;
    }
  }

  return true;
}

test("browser PDF parser stays above the malicious-package advisory floor", () => {
  const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
  const installed = lock.packages["node_modules/pdfjs-dist"]?.version;

  assert.ok(installed, "pdfjs-dist must remain locked");
  assert.ok(
    atLeast(installed, "6.2.108"),
    `pdfjs-dist ${installed} is below the fixed 6.2.108 release`,
  );
});
