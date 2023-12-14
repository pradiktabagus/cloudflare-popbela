import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { usePageDetail } from '@/adapters/hooks/pages';
import type { ShareSocialProps } from '@/components';
import type { BreadcrumbAmp } from '@/components/Breadcrumb/amp';
import type { TAdsAmp } from '@/types/ads';
import type { ArticleProps } from '@/types/article';
import type { LabelsAmpProps } from '@/types/label';
import type { LatestProps } from '@/types/latest';
import type { MediaChannelsProps } from '@/types/mediaChannels';
import type {
  ArticleCover,
  ResponseDataArticle,
  Tag,
} from '@/types/responses/pages/detail-article';
import { hostNameOrigin } from '@/utils/hostnameOrigin';

import type { CoverDetailArticleProps } from '../detail/CoverDetailArticle';
import type { SectionRelatedArticleProps } from '../detail/Related';
import type { TAnalyticsAmp } from './Analytics';
import type { TCommentAmp } from './Comment';
import type { TSectionPromotion } from './Promotion';

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const AdsLeaderboardAmp = dynamic<TAdsAmp>(() =>
  import('@/components/Ads/Leaderboard/amp').then(
    (ads) => ads.AdsLeaderboardAmp
  )
);
const AdsStickyAmp = dynamic<TAdsAmp>(() =>
  import('@/components/Ads/Sticky/amp').then((ads) => ads.AdsStickyAmp)
);
const CoverDetailArticleAmp = dynamic<CoverDetailArticleProps>(
  () => import('./CoverDetailArticle')
);
const ShareDetailAmp = dynamic<ShareSocialProps>(() =>
  import('./Share').then((sec) => sec.ContentShare)
);
const ShareSocialAmp = dynamic<ShareSocialProps>(() =>
  import('./Share').then((sec) => sec.FloatingShare)
);
const CommentFacebookAmp = dynamic<TCommentAmp>(() => import('./Comment'));
const AnalyticsAmp = dynamic<TAnalyticsAmp>(() => import('./Analytics'));
const ArticleAmp = dynamic<ArticleProps>(() => import('./Article'));
const SectionRelatedArticleAmp = dynamic<SectionRelatedArticleProps>(
  () => import('./Related')
);
const SectionLatestAmp = dynamic<LatestProps>(() =>
  import('@/sections/Latest/amp').then((cmp) => cmp.SectionLatestAmp)
);
const LabelsAmp = dynamic<LabelsAmpProps>(() =>
  import('@/components/Label/amp').then((cmp) => cmp.LabelsAmp)
);
const Breadcrumb = dynamic<BreadcrumbAmp>(
  () => import('@/components/Breadcrumb/amp')
);
const TrendingTopic = dynamic<any>(() => import('./TrendingTags'));
const SectionPromotion = dynamic<TSectionPromotion>(
  () => import('./Promotion')
);
const SectionMediaChannel = dynamic<MediaChannelsProps>(
  () => import('./MediaChannel')
);
const Amp = () => {
  const router = useRouter();
  const { authorAmp, slug, page, category, subCategory } = router.query;
  const key = `/${category}/${subCategory}/amp/${authorAmp}/${slug}`;
  const { data } = usePageDetail<ResponseDataArticle>(
    {
      end_point: `article/detail/${category}/${subCategory}/${authorAmp}/${slug}?show=${
        page ?? 'wrap'
      }&type=amp`,
    },
    key
  );
  const article = data?.data ?? ({} as ResponseDataArticle['data']);
  const cover =
    article?.article_details?.find(({ type }) => type === 'cover')?.cover ??
    ({} as ArticleCover);
  return (
    <>
      <div data-testid="amp-article-container">
        <article>
          <AdsLeaderboardAmp kategori={article?.category?.name} />
          <Breadcrumb
            category={article?.category}
            sub_category={article?.sub_category}
          />
          <CoverDetailArticleAmp
            title={article.title}
            excerpt={article.excerpt}
            sub_category={article.sub_category}
            release_date={article.release_date}
            cover={cover}
            author={article.author}
            article_url_amp={article.article_url_amp}
          />
          <ArticleAmp
            variant="article"
            data={{
              url: article?.article_url_amp,
              description: article?.description,
              sub_category: article?.sub_category,
              read_more: !page,
              listicle: article?.article_details?.slice(3) ?? [],
            }}
          />
          <div
            className="container-share-detail-amp"
            data-testid="share-article-bottom-amp"
          >
            <div className="share-detail-wrap">
              <ul>
                <li className="share-artikel-label-amp">
                  <div className="label-share-container">
                    <div className="icon-share-alt">
                      <FontAwesomeIcon icon={faShareAlt} fontSize="18px" />
                    </div>
                    <p className="label-share">Share Artikel</p>
                  </div>
                </li>
                <li className="share-item-artikel-list-amp">
                  <ShareDetailAmp
                    article={{
                      url: hostNameOrigin() + article.article_url_amp,
                      title: article.title || '',
                      excerpt: article.excerpt || '',
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
          <SectionPromotion
            tag={(article.tags ?? []).map(({ tag_slug }: Tag) => tag_slug)}
          />
          <div className="topic-amp">
            <h4 className="heading-topic-amp">TOPIC</h4>
            <LabelsAmp
              paths={(article?.tags ?? []).map(
                ({ name, tag_url }: { name: string; tag_url: string }) => ({
                  title: name,
                  path: tag_url,
                })
              )}
            />
          </div>
          <TrendingTopic />
        </article>
      </div>
      <CommentFacebookAmp url={article.article_url_amp} />
      <SectionMediaChannel category={article?.category?.name.toLowerCase()} />
      <amp-iframe
        title="test"
        height="900"
        width="380"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        allowfullscreen
        frameborder="0"
        src="https://click.advertnative.com/loading_iframe/?handle=16519&h=a0ea3da034726e0294940b249f9e5ed5"
      >
        <amp-img
          layout="fill"
          src="https://click.advertnative.com/loading_iframe/img/placeholder.png"
          placeholder
        ></amp-img>
      </amp-iframe>
      <SectionRelatedArticleAmp />
      <SectionLatestAmp titleLatest={article?.sub_category?.name} />
      <AdsStickyAmp kategori={article?.category?.name} />
      <ShareSocialAmp
        article={{
          url: hostNameOrigin() + article.article_url_amp,
          title: article.title || '',
          excerpt: article.excerpt || '',
        }}
      />
      <AnalyticsAmp
        title={article?.title}
        author={authorAmp}
        path={article.article_url_amp}
        sections={`${article?.category?.name}, ${article?.sub_category?.name}`}
      />
      <style jsx>{`
        .container-amp {
          width: inherit;
          position: relative;
          padding: 15px;
        }
        .container-share-detail-amp {
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
        }
        .share-detail-wrap {
          overflow: hidden;
          flex-direction: row;
        }
        .share-detail-wrap ul {
          --chakra-wrap-x-spacing: 0.5rem;
          --chakra-wrap-y-spacing: 0.5rem;
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
        .share-detail-wrap ul > *:not(style) {
          margin: var(--wrap-y-spacing) var(--wrap-x-spacing);
        }
        .share-artikel-label-amp {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 100%;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
        }
        .share-item-artikel-list-amp {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: flex-start;
          -webkit-box-align: flex-start;
          -ms-flex-align: flex-start;
          align-items: flex-start;
          width: 100%;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
        }
        .label-share-container {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-align-items: baseline;
          -webkit-box-align: baseline;
          -ms-flex-align: baseline;
          align-items: baseline;
          gap: 5px;
        }
        .icon-share-alt {
          width: 18px;
          height: 15px;
        }
        .label-share {
          margin-block-start: 1em;
          margin-block-end: 1em;
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }
        .heading-topic-amp {
          font-family: limerick;
          font-weight: 700;
          font-size: 16px;
          line-height: 1.33;
          border-bottom: 2px solid;
          border-color: #d72772;
          margin-bottom: 15px;
          margin-top: 20px;
          display: inline-block;
          width: 55px;
        }
        .topic-amp {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};
export default Amp;
