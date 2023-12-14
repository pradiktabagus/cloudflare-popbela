import type { AdItem } from '@/types/ads';

import { customSlots, interstitialSlots } from '../DefaultSlots';

const CategoryDesktop: AdItem[] = [
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
    slotTargetting: [['pos', 'MR1']],
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
    divId: 'div-gpt-ad-infeed1',
    slotTargetting: [['pos', 'InFeed1']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[728, 90]],
    divId: 'div-gpt-ad-infeed2',
    slotTargetting: [['pos', 'InFeed2']],
  },
  {
    slotId: '/PopbelaDesktop/[kategori]',
    sizeMappings: [[728, 90]],
    divId: 'div-gpt-ad-infeed3',
    slotTargetting: [['pos', 'InFeed3']],
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
    ...customSlots,
    slotId: '/PopbelaDesktop/[kategori]',
  },
  {
    ...interstitialSlots,
    slotId: '/PopbelaDesktop/[kategori]',
  },
];
const CategoryMobile: AdItem[] = [
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
    ],
    divId: 'div-gpt-ad-infeed1',
    slotTargetting: [['pos', 'InFeed1']],
  },
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [
      [300, 250],
      [320, 100],
    ],
    divId: 'div-gpt-ad-infeed2',
    slotTargetting: [['pos', 'InFeed2']],
  },
  {
    slotId: '/PopbelaMobile/[Kategori]',
    sizeMappings: [[300, 250]],
    divId: 'div-gpt-ad-infeed3',
    slotTargetting: [['pos', 'InFeed3']],
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
    slotId: '/PopbelaMobile/[kategori]',
  },
  {
    ...interstitialSlots,
    slotId: '/PopbelaMobile/[Kategori]',
  },
];
export { CategoryDesktop, CategoryMobile };
