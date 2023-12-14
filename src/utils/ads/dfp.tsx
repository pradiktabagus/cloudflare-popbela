import type { AdItem, TargetItem } from '@/types/ads';

const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30;
export const googleTag = () => {
  const global = window.googletag || { cmd: [] };
  return global;
};
const REFRESH_KEY = 'refresh';
const REFRESH_VALUE = 'true';
export const dfp = {
  createSlots: (
    ads: AdItem[],
    enableLazyload: boolean,
    DFPNetworkID: string | number | undefined,
    pageTargetting: TargetItem
  ) => {
    googleTag().cmd.push(() => {
      ads.forEach(
        ({
          slotId,
          divId,
          sizeMappings,
          slotTargetting,
          type,
          category,
        }: AdItem) => {
          let responsiveMappings: any = null;
          let mappings: any = sizeMappings;

          if (sizeMappings.length > 0) {
            const [firstSizeMapping]: any = sizeMappings;

            if (
              typeof firstSizeMapping === 'object' &&
              !!firstSizeMapping.breakpoint &&
              !!firstSizeMapping.sizes
            ) {
              const sizeMapping = googleTag().sizeMapping();

              mappings = [];

              sizeMappings.forEach(({ breakpoint, sizes }: any) => {
                sizeMapping.addSize(breakpoint, sizes);

                const [firstSize] = sizes;

                if (!!firstSize && Array.isArray(firstSize)) {
                  mappings.push(...sizes);
                } else {
                  mappings.push(sizes);
                }
              });

              responsiveMappings = sizeMapping.build();
            }
          }

          let slot: any;
          if (type === 'custom') {
            slot = googleTag()?.defineOutOfPageSlot(
              `/${DFPNetworkID}${slotId}${category}`,
              divId
            );
            slotTargetting?.map((item: TargetItem) =>
              slot.setTargeting(item[0], item[1])
            );
            slot.addService(googleTag().pubads());
          } else if (type === 'INTERSTITIAL') {
            slot = googleTag()
              .defineOutOfPageSlot(
                `/${DFPNetworkID}${slotId}Interstitial`,
                googleTag().enums.OutOfPageFormat.INTERSTITIAL
              )
              ?.addService(googleTag().pubads());
          } else {
            slot = googleTag()?.defineSlot(
              `/${DFPNetworkID}${slotId}${category}`,
              mappings,
              divId
            );
            slotTargetting?.map((item: TargetItem) =>
              slot.setTargeting(item[0], item[1])
            );
            slot.setCollapseEmptyDiv(false)?.addService(googleTag().pubads());
          }
          if (responsiveMappings) {
            slot.defineSizeMapping(responsiveMappings);
          }
        }
      );
      googleTag().pubads().setTargeting(pageTargetting[0], pageTargetting[1]);
      googleTag()
        .pubads()
        .addEventListener('impressionViewable', (event: any) => {
          const { slot } = event;

          if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
            setTimeout(() => {
              googleTag().pubads().refresh([slot]);
            }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
          }
        });

      if (enableLazyload) {
        // Enable lazyload with some good defaults
        googleTag().pubads().enableLazyLoad({
          fetchMarginPercent: 500,
          renderMarginPercent: 200,
          mobileScaling: 2.0,
        });
      }
      googleTag().pubads().enableSingleRequest();
      googleTag().enableServices();
    });
  },
  showSlot: (divId: string) => {
    googleTag().cmd.push(() => {
      googleTag().display(divId);
    });
  },
  removeSlots: () => {
    googleTag().cmd.push(() => {
      googleTag().destroySlots();
    });
  },
  refreshAllSlot: () => {
    googleTag().cmd.push(() => {
      googleTag().pubads().refresh();
    });
  },
  clearAllSlot: () => {
    googleTag().cmd.push(() => {
      googleTag().pubads().clear();
    });
  },
};
