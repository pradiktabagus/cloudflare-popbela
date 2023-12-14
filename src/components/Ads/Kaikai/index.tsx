import { useEffect, useState } from 'react';

import type { GeneralSize } from '@/types/ads';
import { googleTag } from '@/utils/ads/dfp';

const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30;
const REFRESH_KEY = 'refresh';
const REFRESH_VALUE = 'true';
const AdsKaikai = ({
  id,
  adUnit,
  size,
  className,
}: {
  id: string;
  adUnit: string;
  size: GeneralSize;
  className?: string;
}) => {
  const [idAds, setIdAds] = useState('');
  const randomId = (divId: string) => {
    const newValue = `${divId}-${Math.floor(Math.random() * 10000000 + 1)}`;
    setIdAds(newValue);
  };
  useEffect(() => {
    if (idAds === '') return;
    googleTag().cmd.push(() => {
      googleTag()
        .defineSlot(`/${process.env.dfp_network_id}${adUnit}`, size, idAds)
        ?.setTargeting(REFRESH_KEY, REFRESH_VALUE)
        .setCollapseEmptyDiv(false)
        .addService(googleTag().pubads());
      googleTag().display(idAds);
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
      googleTag().pubads().enableLazyLoad({
        fetchMarginPercent: 500,
        renderMarginPercent: 200,
        mobileScaling: 2.0,
      });
      googleTag().pubads().enableSingleRequest();
      googleTag().enableServices();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAds, adUnit]);

  useEffect(() => {
    randomId(id);
  }, [id]);
  return <div id={idAds} className={className} />;
};
export default AdsKaikai;
