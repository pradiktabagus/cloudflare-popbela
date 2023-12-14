import type { GridProps } from '@chakra-ui/layout';
import { Grid, GridItem } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { useGetRelatedSection } from '@/adapters/hooks/components';
import type { CardPotraitProps, HeadingVariantProps } from '@/components';
import type { DeviceViewProps } from '@/types';
import type { CardLandscapeProps, CardOptionProps } from '@/types/card';
import type { ResponseArticle } from '@/types/responses/article';
import type { ResponseRelated } from '@/types/responses/components/related';

import { type TScriptGA, trackerArticles } from '../Scripts';

export type SectionRelatedArticleProps = {
  articles?: ResponseArticle[];
  backgroundCard?: string;
  gridProps?: GridProps;
  ssr?: boolean;
  article?: TScriptGA;
} & DeviceViewProps;
const CardLandscape = dynamic<CardOptionProps>(() =>
  import('@/components/Cards/CardLandscape').then((mod) => mod.CardLandscape)
);
const CardLandscapeAmp = dynamic<CardLandscapeProps>(() =>
  import('@/components/Cards/CardLandscape/amp').then(
    (mod) => mod.CardLandscapeAmp
  )
);
const CardPotrait = dynamic<CardPotraitProps>(() =>
  import('@/components/Cards/CardPotrait').then((mod) => mod.CardPotrait)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading/HeadingVariant').then(
    (mod) => mod.HeadingVariant
  )
);
const SkeletonRelated = dynamic(() => import('@/components/Skeleton/Related'));
const RelatedArticleMobile = ({
  articles = [],
  backgroundCard,
  gridProps,
  article,
}: SectionRelatedArticleProps) => {
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap="25px 10px"
      id="related-article"
      {...gridProps}
    >
      {articles.map((item: any, index: number) => (
        <GridItem key={item.article_url} className="related-item">
          <CardLandscape
            trackerCallbacks={
              article
                ? () =>
                    trackerArticles({
                      article,
                      position: index + 1,
                      destination: item.article_url,
                      section: `Related`,
                    })
                : () => null
            }
            data={item}
            widthimg="130px"
            heightimg="155px"
            titleProps={{
              fontSize: '16px',
              fontFamily: 'limerickMedium',
              as: 'h4',
            }}
            backgroundColor={backgroundCard}
            loadingImg="lazy"
          />
        </GridItem>
      ))}
    </Grid>
  );
};

const RelatedArticleDesktop = ({
  articles = [],
  backgroundCard,
  article,
}: SectionRelatedArticleProps) => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      columnGap="30px"
      id="related-article"
    >
      {articles.map((item: any, index: number) => (
        <GridItem key={item.article_url} className="related-item">
          <CardPotrait
            trackerCallbacks={
              article
                ? () =>
                    trackerArticles({
                      article,
                      position: index + 1,
                      destination: item.article_url,
                      section: `Related`,
                    })
                : () => null
            }
            data={item}
            heightimg="150px"
            noOfLines={2}
            paddingdesc="10px 0"
            titleProps={{ as: 'h4' }}
            backgroundColor={backgroundCard}
            loadingImg="lazy"
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export const RelatedArticleAmp = ({
  articles = [],
}: SectionRelatedArticleProps) => {
  return (
    <div className="grid-related-article">
      {articles?.map((releated, index) => (
        <div key={index} data-testid="item-article-amp">
          <CardLandscapeAmp
            data={releated}
            widthimg="130px"
            heightimg="135px"
            titleProps={{
              fontSize: '16px',
              fontFamily: 'limerickMedium',
              as: 'h4',
            }}
          />
        </div>
      ))}
      <style jsx>{`
        .grid-related-article {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(1, 1fr);
        }
      `}</style>
    </div>
  );
};

const beforeAfterStyle = {
  position: 'relative',
  flexGrow: 1,
  background: '#bbb',
  lineHeight: 0,
  height: '1px',
  width: 'auto',
  display: 'inline-block',
};

export const SectionRelated = ({
  isDesktop,
  backgroundCard,
  gridProps,
  article,
}: SectionRelatedArticleProps) => {
  const router = useRouter();
  const { query } = router;
  const { data: articles, isFetching } = useGetRelatedSection<ResponseRelated>({
    end_point: `category=${query.category}`,
    version: 'v2',
  });
  return (
    <section className="w-full" id="section-related">
      <HeadingVariant
        data-testid="title-section-now-on-popbela"
        variant="section"
        fontSize={{ base: '24px', lg: '30px' }}
        marginBottom={{ base: '15px', lg: '20px' }}
        display="flex"
        overflow="hidden"
        alignItems="baseline"
        textAlign={{ base: 'center', lg: 'left' }}
        _before={{
          ...beforeAfterStyle,
          content: { base: '""', lg: 'none' },
          right: '.5rem',
        }}
        _after={{
          ...beforeAfterStyle,
          content: '""',
          left: '.5rem',
        }}
        as="h3"
      >
        Related Article
      </HeadingVariant>
      <Fragment>
        {isFetching ? (
          <SkeletonRelated dataDummy={[1, 2, 3]} isDesktop={isDesktop} />
        ) : (
          <Fragment>
            {isDesktop ? (
              <RelatedArticleDesktop
                articles={articles?.data}
                backgroundCard={backgroundCard}
                article={article}
              />
            ) : (
              <RelatedArticleMobile
                articles={articles?.data}
                backgroundCard={backgroundCard}
                article={article}
                {...gridProps}
              />
            )}
          </Fragment>
        )}
      </Fragment>
    </section>
  );
};
