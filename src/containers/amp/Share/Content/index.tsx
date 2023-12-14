import type { ShareSocialProps } from '@/components';

const ShareDetailAmp = ({ article: { title, url } }: ShareSocialProps) => {
  return (
    <div className="share-detail-amp">
      <ul className="share-detail-wrap">
        <li className="share-item" data-testid="share-facebook">
          <amp-social-share
            width="50"
            height="40"
            type="facebook"
            data-param-app_id={process.env.facebook_app_id}
            data-param-href={`${url}?utm_source=facebook&amp;utm_medium=sharer&amp;utm_campaign=social`}
            data-param-quote={title}
          ></amp-social-share>
        </li>
        <li className="share-item" data-testid="share-facebook">
          <amp-social-share
            width="50"
            height="40"
            type="twitter"
            data-param-href={`${url}?utm_source=twitter&amp;utm_medium=sharer&amp;utm_campaign=social`}
            data-param-text={title}
          ></amp-social-share>
        </li>
        <li className="share-item" data-testid="share-pinterest">
          <amp-social-share
            width="50"
            height="40"
            type="pinterest"
            data-param-href={`${url}?utm_source=pinterest&amp;utm_medium=sharer&amp;utm_campaign=social`}
            data-param-text={title}
          ></amp-social-share>
        </li>
        <li className="share-item" data-testid="share-linkedin">
          <amp-social-share
            width="50"
            height="40"
            type="linkedin"
            data-param-text={title}
            data-param-url={`https://www.linkedin.com/shareArticle?mini=true&url=${url}?title=${title}&source=popbela&utm_source=linkedin&amp;utm_medium=sharer&amp;utm_campaign=social`}
          ></amp-social-share>
        </li>
      </ul>
      <style jsx>{`
        .share-detail-amp {
          overflow: hidden;
        }
        .share-detail-wrap {
          --chakra-wrap-x-spacing: 4px;
          --chakra-wrap-y-spacing: 4px;
          --wrap-x-spacing: calc(var(--chakra-wrap-x-spacing) / 2);
          --wrap-y-spacing: calc(var(--chakra-wrap-y-spacing) / 2);
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex-wrap: wrap;
          -webkit-flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          list-style-type: none;
          padding: 0px;
          margin: calc(var(--wrap-y-spacing) * -1)
            calc(var(--wrap-x-spacing) * -1);
        }
        .share-detail-wrap > *:not(style) {
          margin: var(--wrap-y-spacing) var(--wrap-x-spacing);
        }
        .share-item {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: flex-start;
          -webkit-box-align: flex-start;
          -ms-flex-align: flex-start;
          align-items: flex-start;
        }
      `}</style>
    </div>
  );
};
export default ShareDetailAmp;
