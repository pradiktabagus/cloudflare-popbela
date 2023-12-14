import type { AdItem } from '@/types/ads';

import { customSlots, interstitialSlots } from '../DefaultSlots';

const DetailDesktop: AdItem[] = [
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [
      [970, 250],
      [970, 90],
    ],
    divId: 'div-gpt-ad-leaderboard',
    slotTargetting: [['pos', 'leaderboard']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [
      [300, 250],
      [300, 600],
    ],
    divId: 'div-gpt-ad-mr1',
    slotTargetting: [
      ['refresh', 'true'],
      ['pos', 'MR1'],
    ],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [
      [300, 250],
      [300, 600],
    ],
    divId: 'div-gpt-ad-mr2',
    slotTargetting: [['pos', 'MR2']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[728, 90]],
    divId: 'div-gpt-ad-inarticle1',
    slotTargetting: [['pos', 'InArticle1']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[728, 90]],
    divId: 'div-gpt-ad-inarticle2',
    slotTargetting: [['pos', 'InArticle2']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[728, 90]],
    divId: 'div-gpt-ad-inarticle3',
    slotTargetting: [['pos', 'InArticle3']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[120, 600]],
    divId: 'div-gpt-ad-skin_left',
    slotTargetting: [['pos', 'Skin_Left']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[120, 600]],
    divId: 'div-gpt-ad-skin_right',
    slotTargetting: [['pos', 'Skin_Right']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[1, 1]],
    divId: 'div-gpt-ad-custom1',
    slotTargetting: [['pos', 'custom1']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[1, 1]],
    divId: 'div-gpt-ad-custom2',
    slotTargetting: [['pos', 'custom2']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[728, 90]],
    divId: 'div-gpt-ad-sticky',
    slotTargetting: [
      ['refresh', 'true'],
      ['pos', 'Sticky'],
    ],
  },
  {
    ...customSlots,
    slotId: '/PopbelaDesktop/[kategori]',
  },
  {
    ...interstitialSlots,
    slotId: '/PopbelaDesktop/[kategori]',
  },
];
const DetailMobile: AdItem[] = [
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [
      [300, 250],
      [320, 100],
      [1, 1],
    ],
    divId: 'div-gpt-ad-leaderboard',
    slotTargetting: [['pos', 'Leaderboard']],
  },
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [
      [300, 250],
      [320, 100],
      [1, 1],
    ],
    divId: 'div-gpt-ad-inarticle1',
    slotTargetting: [['pos', 'InArticle1']],
  },
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [
      [300, 250],
      [320, 100],
      [1, 1],
    ],
    divId: 'div-gpt-ad-inarticle2',
    slotTargetting: [['pos', 'InArticle2']],
  },
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [[300, 250]],
    divId: 'div-gpt-ad-inarticle3',
    slotTargetting: [['pos', 'InArticle3']],
  },
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [
      [320, 100],
      [320, 50],
    ],
    divId: 'div-gpt-ad-sticky',
    slotTargetting: [
      ['refresh', 'true'],
      ['pos', 'Sticky'],
    ],
  },
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [[1, 1]],
    divId: 'div-gpt-ad-custom1',
    slotTargetting: [['pos', 'custom1']],
  },
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [[1, 1]],
    divId: 'div-gpt-ad-custom2',
    slotTargetting: [['pos', 'custom2']],
  },
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [
      [1, 1],
      [320, 480],
    ],
    divId: 'div-gpt-ad-mega_billboard',
    slotTargetting: [['pos', 'mega_billboard']],
  },
  {
    ...customSlots,
    slotId: '/PopbelaMobile/[Kategori]',
  },

  {
    ...interstitialSlots,
    slotId: '/PopbelaMobile/[Kategori]',
  },
];
export { DetailDesktop, DetailMobile };
