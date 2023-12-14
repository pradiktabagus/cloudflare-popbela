import dynamic from 'next/dynamic';

import type { ShareSocialProps } from '@/components';
import type { CoverDetailArticleProps } from '@/containers/detail/CoverDetailArticle';
import type { DateDefaultProps } from '@/types/date';
import { hostNameOrigin } from '@/utils/hostnameOrigin';

const ShareDetailAmp = dynamic<ShareSocialProps>(() =>
  import('../Share').then((sec) => sec.ContentShare)
);
const DateDefault = dynamic<DateDefaultProps>(() =>
  import('@/components/Date/index').then((mod) => mod.DateDefault)
);
const CoverDetailArticleAmp = ({
  title,
  excerpt,
  sub_category,
  release_date,
  cover,
  author,
  article_url_amp = '',
}: CoverDetailArticleProps) => {
  return (
    <div data-testid="cover-detail-article-amp">
      <h1 className="amp-title-article" data-testid="title-article-amp">
        {title}
      </h1>
      <p className="amp-excerpt-article" data-testid="excerpt-article-amp">
        <em>{excerpt}</em>
      </p>
      <div className="amp-post-category">
        <div data-testid="sub-category-article-amp">
          <a
            href={sub_category?.category_url}
            className="amp-post-category-label"
          >
            {sub_category?.name}
          </a>
        </div>
        <div className="amp-post-date" data-testid="time">
          <DateDefault date={release_date} />
        </div>
      </div>
      <div data-testid="cover-article-amp">
        <div className="cover-article-amp">
          <amp-img
            src={cover?.source_url}
            alt={title}
            layout="responsive"
            height="254px"
            width="381px"
          />
          <span className="source-name-amp">
            <a href="/" className="source-label-amp">
              {cover?.source_name}
            </a>
          </span>
        </div>
      </div>
      <div className="amp-author">
        <div className="avatar-author-amp">
          <a href={`${author?.author_url}`}>
            <amp-img
              src={author?.avatar}
              layout="responsive"
              alt={author?.name}
              height="25px"
              width="25px"
              className="amp-img-author"
            />
          </a>
        </div>
        <strong data-testid="author-article-amp" className="name-author-amp">
          {author?.name}
        </strong>
      </div>
      <div data-testid="share-article-bottom-top" className="amp-share">
        <ShareDetailAmp
          article={{
            url: hostNameOrigin() + article_url_amp,
            title: title || '',
            excerpt: excerpt || '',
          }}
        />
      </div>
      <style jsx>{`
        .amp-title-article {
          margin-top: 0;
          font-family: LimerickMedium, sans-serif;
          font-weight: 500;
          line-height: 1.4;
          font-size: 26px;
          margin-bottom: 10px;
          color: #333;
        }
        .amp-excerpt-article {
          font-size: 20px;
          line-height: inherit;
          margin-top: 0;
          margin-bottom: 10px;
          color: #4c4c4c;
        }
        .amp-post-category {
          position: relative;
          width: 100%;
          display: flex;
          font-size: 20px;
        }
        .amp-post-category-label {
          text-decoration: none;
          flex: 1;
          color: #d72772;
          font-weight: 600;
          font-size: 20px;
          text-transform: uppercase;
          font-family: bahijMitra, sans-serif;
        }
        .amp-post-date {
          flex: auto;
          text-align: right;
          font-size: 20px;
          color: #4c4c4c;
        }
        .source-name-amp {
          font-size: smaller;
          color: #fff;
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 1px 6px;
          font-style: italic;
          background: rgba(0, 0, 0, 0.5);
          font-family: BahijMitraRegular, sans-serif;
        }
        .source-label-amp {
          text-decoration: none;
          font-size: smaller;
          color: #fff;
        }
        .amp-author {
          display: flex;
          justify-content: center;
          width: 100%;
          flex-direction: row;
          margin-top: 10px;
          align-items: center;
        }
        .amp-img-author {
          border-radius: 100%;
        }
        .cover-article-amp {
          position: relative;
          width: 100%;
        }
        .avatar-author-amp {
          width: 25px;
          height: 25px;
        }
        .name-author-amp {
          margin-left: 15px;
          text-transform: uppercase;
          color: #4c4c4c;
          font-size: 20px;
        }
        .amp-share {
          display: flex;
          margin-top: 10px;
          gap: 4px;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
export default CoverDetailArticleAmp;
