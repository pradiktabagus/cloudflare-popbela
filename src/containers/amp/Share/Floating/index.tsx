import type { ShareSocialProps } from '@/components';

const ShareSocialAmp = ({ article: { title, url } }: ShareSocialProps) => {
  return (
    <div data-testid="share-social-amp" className="share-social">
      <amp-social-share
        data-testid="share-facebook"
        width="50"
        height="36"
        type="facebook"
        data-param-app_id={process.env.facebook_app_id}
        data-param-href={`${url}?utm_source=facebook&amp;utm_medium=sharer&amp;utm_campaign=social`}
        data-param-quote={title}
      ></amp-social-share>
      <amp-social-share
        data-testid="share-twitter"
        width="50"
        height="36"
        type="twitter"
        data-param-href={`${url}?utm_source=twitter&amp;utm_medium=sharer&amp;utm_campaign=social`}
        data-param-text={title}
      ></amp-social-share>
      <amp-social-share
        data-testid="share-whatsapp"
        width="50"
        height="36"
        type="whatsapp"
        data-param-href={`${url}?utm_source=WA&amp;utm_medium=sharer&amp;utm_campaign=social`}
        data-param-text={`${title} ${url}?utm_source=WA&amp;utm_medium=sharer&amp;utm_campaign=social`}
      ></amp-social-share>
      <amp-social-share
        data-testid="share-line"
        width="50"
        height="36"
        type="line"
        data-param-href={`${url}?utm_source=line&amp;utm_medium=sharer&amp;utm_campaign=social`}
        data-param-text={`${title} ${url}?utm_source=line&amp;utm_medium=sharer&amp;utm_campaign=social`}
      ></amp-social-share>
      <style jsx>{`
        amp-social-share {
          flex: 1 1 0%;
        }
        .share-social {
          position: fixed;
          right: 0px;
          top: unset;
          -webkit-transform: none;
          -moz-transform: none;
          -ms-transform: none;
          transform: none;
          bottom: 0px;
          height: 36px;
          width: 100%;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          z-index: 9;
        }
      `}</style>
    </div>
  );
};
export default ShareSocialAmp;
