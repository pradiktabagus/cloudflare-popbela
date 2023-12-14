/* eslint-disable @typescript-eslint/naming-convention */
import { Heading } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { trackerArticles } from '@/containers/detail/Scripts';
import type { ArticleProps } from '@/types/article';
import type { ImageArticleProps } from '@/types/image';
import clsxm from '@/utils/clsxm';
import { getArticleUrl } from '@/utils/getArticleUrl';

import style from './article-detail.module.scss';
import type { TQuizArticle } from './Quiz';

const ReadMore = dynamic(() => import('./ReadMore'));
const ImageArticle = dynamic<ImageArticleProps>(() =>
  import('../Images/ImageArticle').then((mod) => mod.ImageArticle)
);

const Yummy = dynamic(() => import('./Yummy'));
const Quiz = dynamic<TQuizArticle>(() => import('./Quiz'));
const Embed = dynamic(() => import('./Embed'));
const AdsInarticle = dynamic(() => import('@/components/Ads/Inarticle'));
const AdsKaikai = dynamic(() => import('@/components/Ads/Kaikai'));
export const ArticleSpit = ({
  data,
  variant = 'article',
  body,
  article,
  isMobile,
}: ArticleProps) => {
  const { listicle, title, sub_category, description } = data;
  const { query } = useRouter();
  const { page } = query;
  const renderAds = (ads: string) => {
    if (variant === 'kaikai') {
      return (
        <AdsKaikai
          id={ads}
          adUnit="/ContentGenerator/KaikaiPopbela"
          size={[
            [336, 280],
            [300, 250],
          ]}
        />
      );
    }
    return <AdsInarticle isMobile={isMobile} id={ads} />;
  };
  const renderSection = (item: any, i: number) => {
    switch (item.type) {
      case 'content':
      case 'ingredients':
      case 'instructions':
      case 'recipe_content':
        return (
          <Fragment key={i}>
            <div
              data-testid={`content-listicle-${item?.listicle_no}`}
              dangerouslySetInnerHTML={{
                __html: item?.value,
              }}
            />
            {item?.ads && renderAds(item?.ads)}
          </Fragment>
        );
      case 'title':
      case 'ingredients_title':
      case 'instructions_title':
      case 'recipe':
        return (
          <Fragment key={i}>
            <Heading
              data-testid={`title-listicle-${item?.listicle_no}`}
              as={item.value_type}
              dangerouslySetInnerHTML={{ __html: item?.value }}
            />
            {item?.ads && renderAds(item?.ads)}
          </Fragment>
        );
      case 'image':
      case 'ingredients_image':
      case 'instructions_image':
      case 'recipe_image':
        return (
          <Fragment key={i}>
            <div
              className={style['image-listicle']}
              data-testid={`image-listicle-${item?.listicle_no}`}
            >
              <ImageArticle
                priorityImg={false}
                loadingImg="lazy"
                data={{
                  source_name: item.cover?.source_name ?? '',
                  image_url: item.cover?.source_url ?? '',
                  title: title ?? '',
                }}
              />
            </div>
            {item?.ads && renderAds(item?.ads)}
          </Fragment>
        );
      case 'readmore':
        return (
          <Fragment key={i}>
            <div
              onClick={
                article
                  ? () =>
                      trackerArticles({
                        article,
                        position: '',
                        destination: getArticleUrl(item?.value) || '/',
                        section: `Baca Juga`,
                      })
                  : () => null
              }
              data-testid="readmore"
              className={style['readmore-container']}
              dangerouslySetInnerHTML={{
                __html: item?.value,
              }}
            />
            {item?.ads && renderAds(item?.ads)}
          </Fragment>
        );
      case 'instagram':
      case 'facebook':
      case 'twitter':
      case 'youtube':
      case 'embedHTML':
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: item?.value }} />
        );
      default:
        return <div key={i} />;
    }
  };

  return (
    <Fragment>
      <section className={clsxm(!page ? 'mb-14' : 'mb-9')}>
        <div className={clsxm('mt-0 w-full', 'article-content')}>
          {listicle?.map((item, i) => (
            <div
              key={i}
              className={
                variant === 'article'
                  ? clsxm(
                      !page &&
                        item.listicle_no &&
                        item.listicle_no > 2 &&
                        'hidden',
                      !page &&
                        item.listicle_no === 2 &&
                        listicle[i + 1]?.listicle_no === 3 &&
                        style['half-listicle'],
                      item.type === 'readmore' ? 'mb-2' : 'mb-5'
                    )
                  : ''
              }
            >
              {renderSection(item, i)}
            </div>
          ))}
          {variant === 'quiz' && (
            <Fragment>
              <div
                data-testid="content"
                dangerouslySetInnerHTML={{
                  __html: description ?? '<></>',
                }}
              />
              <Quiz
                title={data.title ?? ''}
                excerpt={data.excerpt ?? ''}
                article_url={data.url ?? ''}
                type={body?.type}
                data={body?.data}
              />
            </Fragment>
          )}
        </div>

        {sub_category?.name === 'food' && <Yummy />}
        {variant === 'article' &&
          !page &&
          listicle?.some((i) => i.listicle_no === 3) && <ReadMore />}
        <Embed listTicle={listicle} />
      </section>
    </Fragment>
  );
};
