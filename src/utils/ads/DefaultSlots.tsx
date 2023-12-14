import type { AdItem } from '@/types/ads';

export const interstitialSlots: AdItem = {
  slotId: '',
  sizeMappings: [],
  divId: '',
  slotTargetting: [['', '']],
  type: 'INTERSTITIAL',
  category: 'Interstitial',
};

export const customSlots: AdItem = {
  slotId: '',
  sizeMappings: [],
  divId: 'div-gpt-ad-oop1',
  slotTargetting: [['pos', 'oop1']],
  type: 'custom',
};
