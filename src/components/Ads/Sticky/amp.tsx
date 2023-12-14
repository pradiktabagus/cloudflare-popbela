import type { TAdsAmp } from '@/types/ads';

export const AdsStickyAmp = ({ kategori }: TAdsAmp) => {
  return (
    <div className="center-ads">
      <amp-sticky-ad layout="nodisplay">
        <amp-ad
          width="320"
          height="100"
          type="doubleclick"
          data-slot={`/${process.env.dfp_network_id}/PopbelaAMP/${kategori}`}
          json='{"targeting":{"pos":["Sticky"]}}'
          data-multi-size="320x100,320x50"
        ></amp-ad>
      </amp-sticky-ad>
      <style jsx>{`
        amp-sticky-ad {
          bottom: 36px;
        }
        .center-ads {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          padding-bottom: 20px;
        }
      `}</style>
    </div>
  );
};
