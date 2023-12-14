import { useMemo } from 'react';
import { isDesktop } from 'react-device-detect';

import type { AdItem, TargetItem } from '@/types/ads';
import {
  CategoryDesktop,
  CategoryMobile,
  DetailDesktop,
  DetailMobile,
  HomepageDesktop,
  HomepageMobile,
  SubCategoryDesktop,
  SubCategoryMobile,
} from '@/utils/ads/slots';

function Capitalize(str: any) {
  let word: any = '';
  word = str.charAt(0).toUpperCase() + str.slice(1);
  return word;
}

export const useSlotsFromPage = (
  pathName: string,
  category?: string | string[]
) => {
  const { ads, pageTargetting } = useMemo(() => {
    let adsItem: AdItem[] = [];
    let targetting: TargetItem = ['', ''];
    switch (pathName) {
      case '/':
        adsItem = isDesktop ? HomepageDesktop : HomepageMobile;
        adsItem = adsItem.map((ad) => {
          return {
            ...ad,
            category: ad.category ?? 'Homepage',
            slotId: `${isDesktop ? '/PopbelaDesktop/' : '/PopbelaMobile/'}`,
          };
        });
        targetting = ['page_type', 'home'];
        return {
          ads: adsItem,
          pageTargetting: targetting,
        };
      case '/[category]/[subCategory]/[author]/[slug]':
        adsItem = isDesktop ? DetailDesktop : DetailMobile;
        adsItem = adsItem.map((ad) => {
          return {
            ...ad,
            category: ad.category ?? Capitalize(category),
            slotId: `${isDesktop ? '/PopbelaDesktop/' : '/PopbelaMobile/'}`,
          };
        });
        targetting = ['page_type', 'article'];
        return {
          ads: adsItem,
          pageTargetting: targetting,
        };
      case '/[category]':
        adsItem = isDesktop ? CategoryDesktop : CategoryMobile;
        adsItem = adsItem.map((ad) => {
          return {
            ...ad,
            category: ad.category ?? Capitalize(category),
            slotId: `${isDesktop ? '/PopbelaDesktop/' : '/PopbelaMobile/'}`,
          };
        });
        targetting = ['page_type', 'category'];
        return {
          ads: adsItem,
          pageTargetting: targetting,
        };
      case '/[category]/[subCategory]':
        adsItem = isDesktop ? SubCategoryDesktop : SubCategoryMobile;
        adsItem = adsItem.map((ad) => {
          return {
            ...ad,
            category: ad.category ?? Capitalize(category),
            slotId: `${isDesktop ? '/PopbelaDesktop/' : '/PopbelaMobile/'}`,
          };
        });
        targetting = ['page_type', 'category'];
        return {
          ads: adsItem,
          pageTargetting: targetting,
        };
      default:
        return {
          ads: adsItem,
          pageTargetting: targetting,
        };
    }
  }, [pathName, category]);
  return { ads, pageTargetting };
};
export function getPropertiesAds(
  pathName: string,
  category?: string | string[]
): { ads: AdItem[]; pageTargetting: TargetItem } {
  let adsItem: AdItem[] = [];
  let targetting: TargetItem = ['', ''];
  switch (pathName) {
    case '/':
      adsItem = isDesktop ? HomepageDesktop : HomepageMobile;
      adsItem = adsItem.map((ad) => {
        return {
          ...ad,
          category: ad.category ?? 'Homepage',
          slotId: `${isDesktop ? '/PopbelaDesktop/' : '/PopbelaMobile/'}`,
        };
      });
      targetting = ['page_type', 'home'];
      return {
        ads: adsItem,
        pageTargetting: targetting,
      };
    case '/[category]/[subCategory]/[author]/[slug]':
      adsItem = isDesktop ? DetailDesktop : DetailMobile;
      adsItem = adsItem.map((ad) => {
        return {
          ...ad,
          category: ad.category ?? Capitalize(category),
          slotId: `${isDesktop ? '/PopbelaDesktop/' : '/PopbelaMobile/'}`,
        };
      });
      targetting = ['page_type', 'article'];
      return {
        ads: adsItem,
        pageTargetting: targetting,
      };
    case '/[category]':
      adsItem = isDesktop ? CategoryDesktop : CategoryMobile;
      adsItem = adsItem.map((ad) => {
        return {
          ...ad,
          category: ad.category ?? Capitalize(category),
          slotId: `${isDesktop ? '/PopbelaDesktop/' : '/PopbelaMobile/'}`,
        };
      });
      targetting = ['page_type', 'category'];
      return {
        ads: adsItem,
        pageTargetting: targetting,
      };
    case '/[category]/[subCategory]':
      adsItem = isDesktop ? SubCategoryDesktop : SubCategoryMobile;
      adsItem = adsItem.map((ad) => {
        return {
          ...ad,
          category: ad.category ?? Capitalize(category),
          slotId: `${isDesktop ? '/PopbelaDesktop/' : '/PopbelaMobile/'}`,
        };
      });
      targetting = ['page_type', 'category'];
      return {
        ads: adsItem,
        pageTargetting: targetting,
      };
    default:
      return {
        ads: adsItem,
        pageTargetting: targetting,
      };
  }
}
