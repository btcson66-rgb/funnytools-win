export type DecisionProductLocale = 'zh' | 'en';

export type DecisionProvider = 'payhip' | 'gumroad';

export interface DecisionProduct {
  id: `PRODUCT-00${1 | 2 | 3 | 4 | 5}`;
  name: Record<DecisionProductLocale, string>;
  value: Record<DecisionProductLocale, string>;
  price: string;
  primarySite: 'roomfeng' | 'worthcalc' | 'funnytools';
  ownedLanding: Record<DecisionProductLocale, string>;
  providers: Partial<Record<DecisionProvider, string>>;
}

// Stable IDs are contracts shared by the owned surfaces and the three-site
// analytics funnel. Provider links are the exact already-live checkout URLs;
// this registry deliberately contains no product creation or price mutation.
export const decisionProducts: DecisionProduct[] = [
  {
    id: 'PRODUCT-001',
    name: { zh: 'RoomFeng Moving & New Home OS', en: 'RoomFeng Moving & New Home OS' },
    value: {
      zh: '把搬家、打包與新家整理拆成可執行的完整系統。',
      en: 'Turn moving, packing, and new-home setup into an executable system.',
    },
    price: 'US$12.99',
    primarySite: 'roomfeng',
    ownedLanding: {
      zh: 'https://roomfeng.win/zh/moving-new-home-os/',
      en: 'https://roomfeng.win/en/moving-new-home-os/',
    },
    providers: {
      payhip: 'https://payhip.com/buy?s=1&link=quhS0',
      gumroad: 'https://gumroad.com/checkout?product=ikgpjk&quantity=1',
    },
  },
  {
    id: 'PRODUCT-002',
    name: { zh: 'RoomFeng Small Space Layout Vault', en: 'RoomFeng Small Space Layout Vault' },
    value: {
      zh: '用可重複的空間規劃檢查表，降低小宅配置試錯成本。',
      en: 'Use repeatable small-space planning checklists to reduce layout guesswork.',
    },
    price: 'US$17.99',
    primarySite: 'roomfeng',
    ownedLanding: {
      zh: 'https://roomfeng.win/zh/small-space-layout-vault/',
      en: 'https://roomfeng.win/en/small-space-layout-vault/',
    },
    providers: {
      payhip: 'https://payhip.com/buy?s=1&link=4hgtL',
      gumroad: 'https://gumroad.com/checkout?product=nwadqz&quantity=1',
    },
  },
  {
    id: 'PRODUCT-003',
    name: { zh: 'Freelancer Pricing Decision Engine', en: 'Freelancer Pricing Decision Engine' },
    value: {
      zh: '把不可計費時間、成本、風險與報價選項放進同一個接案決策模型。',
      en: 'Model hidden hours, costs, risk, and quote options before accepting freelance work.',
    },
    price: 'US$19',
    primarySite: 'worthcalc',
    ownedLanding: {
      zh: 'https://worthcalc.win/zh/freelancer-pricing-decision-engine/',
      en: 'https://worthcalc.win/en/freelancer-pricing-decision-engine/',
    },
    providers: {
      payhip: 'https://payhip.com/buy?s=1&link=tVdur',
      gumroad: 'https://gumroad.com/checkout?product=spgrvp&quantity=1',
    },
  },
  {
    id: 'PRODUCT-004',
    name: { zh: 'Wedding Seating Conflict Solver', en: 'Wedding Seating Conflict Solver' },
    value: {
      zh: '在免費座位表工具之外，處理婚禮關係衝突、限制與可行排座方案。',
      en: 'Go beyond a free seating chart to model wedding relationship conflicts and constraints.',
    },
    price: 'US$19',
    primarySite: 'funnytools',
    ownedLanding: {
      zh: 'https://funnytools.win/wedding-seating-conflict-solver/',
      en: 'https://funnytools.win/en/wedding-seating-conflict-solver/',
    },
    providers: {
      payhip: 'https://payhip.com/buy?s=1&link=v7mjB',
    },
  },
  {
    id: 'PRODUCT-005',
    name: { zh: 'Job Offer True Value Decision Engine', en: 'Job Offer True Value Decision Engine' },
    value: {
      zh: '比較薪資、福利、通勤、時間與生活適配度，而不是只看 offer 數字。',
      en: 'Compare salary, benefits, commute, time, and fit instead of judging an offer by salary alone.',
    },
    price: 'US$19',
    primarySite: 'worthcalc',
    ownedLanding: {
      zh: 'https://worthcalc.win/zh/job-offer-true-value-decision-engine/',
      en: 'https://worthcalc.win/en/job-offer-true-value-decision-engine/',
    },
    providers: {
      payhip: 'https://payhip.com/buy?s=1&link=NDfro',
      gumroad: 'https://gumroad.com/checkout?product=xbsnpk&quantity=1',
    },
  },
];
