import type { ContainerProps } from '@chakra-ui/layout';
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDefaultComponent } from '@/adapters/hooks/components';
import type {
  BreadcrumbProps,
  FlyingCardDetailProps,
  ShareSocialProps,
} from '@/components';
import type {
  SectionExclusiveProps,
  SectionHoroscopeProps,
  SectionPopCreatorProps,
  TrendingProps,
} from '@/sections';
import type { DeviceViewProps } from '@/types';
import type { TAdProps, TadsSlot } from '@/types/ads';
import type { ArticleProps } from '@/types/article';
import type { LabelsProps } from '@/types/label';
import type { LatestProps } from '@/types/latest';
import type { MediaChannelsProps } from '@/types/mediaChannels';
import type {
  ResponseCurrentHoroscope as ResponseCurrentHoroscopes,
  ResponseHoroscopes,
} from '@/types/responses/components/horoscopes';
import type {
  ArticleCover,
  ResponseDataArticle,
  Tag,
} from '@/types/responses/pages/detail-article';
import { hostNameOrigin } from '@/utils/hostnameOrigin';
import { toSafetyStringSEO } from '@/utils/TextTransform';
import { toDateFormat } from '@/utils/toDateFromUnix';

import type { CommentFacebookProps } from './Comment';
import type { CoverDetailArticleProps } from './CoverDetailArticle';
import type { SectionRelatedArticleProps } from './Related';
import type { TScriptGA } from './Scripts';
import type { TShareDetailArticle } from './Share/Content';
import type { TWarningAdult } from './WarningAdult';

export type TDetail = DeviceViewProps & {
  data: ResponseDataArticle;
};
const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const AdsLeaderboard = dynamic<TAdProps>(() =>
  import('@/components/Ads/Leaderboard').then((mod) => mod.AdsLeaderboard)
);
const AdsMr1 = dynamic<TAdProps>(() =>
  import('@/components/Ads/MR/mr1').then((mod) => mod.AdsMr1)
);
const AdsMr2 = dynamic<TAdProps>(() =>
  import('@/components/Ads/MR/mr2').then((mod) => mod.AdsMr2)
);
const AdsSkinLeft = dynamic<TAdProps>(() =>
  import('@/components/Ads/Skin/left').then((mod) => mod.AdsSkinLeft)
);
const AdsSkinRight = dynamic<TAdProps>(() =>
  import('@/components/Ads/Skin/right').then((mod) => mod.AdsSkinRight)
);
const AdsSticky = dynamic<TadsSlot>(() =>
  import('@/components/Ads/Sticky').then((mod) => mod.AdsSticky)
);
const Breadcrumb = dynamic<BreadcrumbProps>(() =>
  import('@/components/Breadcrumb').then((cmp) => cmp.Breadcrumb)
);
const CoverDetailArticle = dynamic<CoverDetailArticleProps>(() =>
  import('./CoverDetailArticle').then((cmp) => cmp.CoverDetailArticle)
);
const Article = dynamic<ArticleProps>(() =>
  import('@/components/Article/article-split').then((cmp) => cmp.ArticleSpit)
);
const SectionComment = dynamic<CommentFacebookProps>(() =>
  import('./Comment').then((cmp) => cmp.CommentFacebook)
);
const SectionRelatedArticle = dynamic<SectionRelatedArticleProps>(() =>
  import('./Related').then((sec) => sec.SectionRelated)
);
const SectionTrending = dynamic<TrendingProps>(() =>
  import('@/sections/Trending').then((sec) => sec.SectionTrending)
);
const SectionHoroscope = dynamic<SectionHoroscopeProps>(() =>
  import('@/sections/Horoscope').then((sec) => sec.SectionHoroscope)
);
const SectionExclusive = dynamic<SectionExclusiveProps>(() =>
  import('@/sections/Exclusive').then((sec) => sec.SectionExclusive)
);
const SectionPopCreator = dynamic<SectionPopCreatorProps>(() =>
  import('@/sections/PopCreator').then((sec) => sec.SectionPopCreator)
);
const SectionLatest = dynamic<LatestProps>(() =>
  import('@/sections/Latest').then((sec) => sec.SectionLatest)
);
const SectionMedia = dynamic<MediaChannelsProps>(
  () => import('./MediaChannel')
);
const SectionPromotion = dynamic(() => import('./Promotion'));
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const Labels = dynamic<LabelsProps>(() =>
  import('@/components/Label').then((mod) => mod.Labels)
);
const ScriptGA = dynamic<TScriptGA>(() => import('./Scripts'), {
  ssr: false,
});
const ShareSocial = dynamic<ShareSocialProps>(
  () => import('./Share').then((cmp) => cmp.FloatingShare),
  {
    ssr: false,
  }
);
const ShareDetail = dynamic<TShareDetailArticle>(
  () => import('./Share').then((cmp) => cmp.ContentShare),
  {
    ssr: false,
  }
);
const WarningAdult = dynamic<TWarningAdult>(() => import('./WarningAdult'), {
  ssr: false,
});
const FlyingCardDetail = dynamic<FlyingCardDetailProps>(
  () =>
    import('@/components/Cards/FlyingCard').then((cmp) => cmp.FlyingCardDetail),
  { ssr: false }
);
const Detail = ({ isDesktop, isMobile, data }: TDetail) => {
  const router = useRouter();
  const { subCategory, slug, category } = router.query;
  // ref untuk cek posisi avatar, untuk show/hide fliying card
  const avatarRef = useRef<HTMLDivElement>(null);
  const [canShowFlyCard, setCanShowFlyCard] = useState(true);
  const { data: dataCurrentHoroscope } =
    useDefaultComponent<ResponseCurrentHoroscopes>({
      end_point: '/current-horoscope',
    });
  const { data: dataHoroscopes } = useDefaultComponent<ResponseHoroscopes>({
    end_point: '/horoscopes',
  });
  const options = {
    triggerOnce: true,
    fallbackInView: true,
    rootMargin: '25px 0px',
    threshold: 0.5,
  };

  const [refRelated, InViewRelated] = useInView(options);
  const [refMedia, InViewMedia] = useInView(options);
  const [refExclusive, InViewExclusive] = useInView(options);
  const [refPopCreator, InViewPopCreator] = useInView(options);
  const [refLatest, InViewLatest] = useInView(options);

  useEffect(() => {
    if (typeof document !== undefined) {
      document.addEventListener('scroll', () => {
        if (avatarRef.current) {
          const bRect = avatarRef.current.getBoundingClientRect();
          const currentTop = bRect.top;
          setCanShowFlyCard(currentTop <= 90);
        }
      });
    }
  }, []);

  useEffect(() => {
    const HeadingElement = Array.from(document.querySelectorAll('h3'));
    const PElenent = Array.from(document.querySelectorAll('p'));
    const bacaJugaLinks = [...HeadingElement, ...PElenent];
    const filtered = bacaJugaLinks?.filter((element) =>
      element.innerText.toLowerCase().includes('baca juga')
    );
    filtered.forEach((el) => el.classList.add('auto-baca-juga'));
    return () => {
      filtered.forEach((el) => el.classList.remove('auto-baca-juga'));
    };
  }, [slug]);
  const article = data?.data ?? ({} as ResponseDataArticle['data']);
  const cover =
    article?.article_details?.find(({ type }) => type === 'cover')?.cover ??
    ({} as ArticleCover);

  useEffect(() => {
    const handleRouteStart = () => {
      if (router.query.page) return;
      const code = `
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'read_article',
          'property':'popbela',
              'platform':'web',
              'device':'${isMobile ? 'mobile' : 'desktop'}',
              'page_type':'article_detail',
              'page_type_var': 'full',
              'screen_name': '${toSafetyStringSEO(
                article.meta_title ?? article.title
              )}',
              'content_type':'article',
              'content_type_var':'${article.type}',
              'content_title':'${toSafetyStringSEO(article.title)}',
              'content_id':'${article.uuid}',
              'content_slug':'${article.article_url}?page=all',
              'content_publisher': 'popbela',
              'content_tag':'${article?.tags
                ?.map(({ name }) => name)
                .join(',')}',
              'content_published_date':'${toDateFormat(
                article?.release_date,
                'YYYY-MM-DD hh:mm:ss'
              )}',
              'content_updated_date':'${toDateFormat(
                article?.updated_at,
                'YYYY-MM-DD hh:mm:ss'
              )}',
              'content_category': '${article.category.name}',
              'content_category_id':'${article.category.slug}',
              'content_subcategory':'${article.sub_category.name}',
              'content_subcategory_id':'${article.sub_category.slug}',
              'content_creator_id':'${article.author.uuid}',
              'content_creator_username':'${toSafetyStringSEO(
                article.author.username
              )}',
              'content_creator_fullname':'${toSafetyStringSEO(
                article.author.name
              )}',
              'content_creator_role':'writer',
        })
      `;
      const GaScript = document.createElement('script');
      GaScript.id = 'Ga-detail-article';
      GaScript.async = true;
      GaScript.appendChild(document.createTextNode(code));
      document.head.appendChild(GaScript);
    };
    router.events.on('routeChangeStart', handleRouteStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
    };
  }, [
    router,
    isMobile,
    article.type,
    article.title,
    article.meta_title,
    article.slug,
    article.article_url,
    article?.tags,
    article?.release_date,
    article?.updated_at,
    article.category.name,
    article.category.slug,
    article.sub_category.name,
    article.sub_category.slug,
    article.uuid,
    article.author.username,
    article.author.name,
    article.author.uuid,
  ]);
  return (
    <>
      {isMobile && (
        <FlyingCardDetail category={`${category}`} canShow={canShowFlyCard} />
      )}
      <AdsLeaderboard
        isDesktop={isDesktop}
        isMobile={isMobile}
        key="detail-article-leaderboard"
      />
      <ContainerSection>
        <Breadcrumb
          paths={[
            { title: 'Home', link: '/' },
            {
              title: article.category?.name ?? '',
              link: article.category?.category_url ?? '',
            },
            ...(isDesktop
              ? [
                  {
                    title: article.sub_category?.name ?? '',
                    link: article.sub_category?.category_url ?? '',
                  },
                  {
                    title: article.title,
                    isCurrentPage: true,
                  },
                ]
              : [
                  {
                    title: article.sub_category?.name ?? '',
                    link: article.sub_category?.category_url ?? '',
                    hasLink: true,
                  },
                ]),
          ]}
          py="8px"
          mb="20px"
        />
      </ContainerSection>
      <ContainerSection>
        <section data-testid="section-news-top" className="mb-5">
          <Grid
            display={{ base: 'block', lg: 'grid' }}
            templateColumns={isDesktop ? 'repeat(12, 1fr)' : 'repeat(1, 1fr)'}
            position="relative"
            gap={isDesktop ? '20px' : '0px'}
          >
            <GridItem colSpan={isDesktop ? 8 : 1} order={isDesktop ? 1 : 2}>
              <Box width="inherit" position="relative">
                <article>
                  <CoverDetailArticle
                    title={article.title}
                    sub_category={article.sub_category}
                    excerpt={article.excerpt}
                    release_date={article.release_date}
                    cover={article.type === 'quiz' ? article?.cover : cover}
                    author={article.author}
                    article_url={article.article_url}
                    avatarRef={avatarRef}
                  />
                  <Article
                    isMobile={isMobile}
                    article={{
                      title: article?.title,
                      slug: article?.slug,
                      category_url: article?.category?.category_url,
                      sub_category_name: article?.sub_category?.name,
                      sub_category_url: article.sub_category?.category_url,
                      author: article?.author?.name,
                      release_date: article?.release_date,
                      updated_at: article?.updated_at,
                      tags: article?.tags,
                      article_url: article?.article_url,
                    }}
                    variant={article?.type === 'quiz' ? 'quiz' : 'article'}
                    body={article?.body}
                    data={{
                      listicle: article?.article_details?.slice(3) ?? [],
                      description: article?.description,
                      sub_category: article?.sub_category,
                      url: article?.article_url,
                      title: article?.title,
                      excerpt: article?.excerpt,
                    }}
                  />
                  <Center data-testid="share-article">
                    <Wrap flexDirection={isDesktop ? 'column' : 'row'}>
                      <WrapItem
                        display="flex"
                        alignItems="center"
                        width={{ base: '100%', lg: 'auto' }}
                        justifyContent="center"
                      >
                        <Flex
                          alignItems="baseline"
                          gap="5px"
                          flexDirection="row"
                        >
                          <Box width="18px" height="18px">
                            <FontAwesomeIcon
                              icon={faShareAlt}
                              fontSize="18px"
                            />
                          </Box>
                          <Text fontSize="22px" fontWeight="700" color="title">
                            Share Artikel
                          </Text>
                        </Flex>
                      </WrapItem>
                      <WrapItem
                        width={{ base: '100%', lg: 'auto' }}
                        justifyContent="center"
                      >
                        <ShareDetail
                          article={{
                            title: article.title,
                            url: hostNameOrigin() + article.article_url,
                            excerpt: article.excerpt ?? '',
                          }}
                        />
                      </WrapItem>
                    </Wrap>
                  </Center>
                </article>
              </Box>
              {article?.flag !== 'csc' && (
                <SectionPromotion
                  tag={(article.tags ?? []).map(
                    ({ tag_slug }: Tag) => tag_slug
                  )}
                />
              )}
              <Heading
                as="h4"
                borderBottom="2px solid primary"
                mb="15px"
                mt="20px"
                fontFamily="futuraBook"
                display="inline-block"
                fontWeight="700"
                fontSize="18px"
                w="55px"
              >
                TOPIC
              </Heading>
              <Labels
                paths={(article?.tags ?? []).map(
                  ({ name, tag_url }: { name: string; tag_url: string }) => ({
                    title: name,
                    path: tag_url,
                  })
                )}
              />
              <SectionComment article_url={article.article_url} />
              <div ref={refMedia}>
                {InViewMedia && (
                  <SectionMedia
                    backgroundCard="transparent"
                    category={article?.category?.name.toLowerCase()}
                    isDesktop={isDesktop}
                    containerProps={{
                      maxW: 'full',
                      px: 0,
                      mb: { base: '25px', md: '20px' },
                    }}
                  />
                )}
              </div>
              <div id="945bcf80a53881dafde56a1aef8f627e"></div>
              <div ref={refRelated}>
                {InViewRelated && (
                  <SectionRelatedArticle
                    gridProps={{ mt: '20px' }}
                    backgroundCard="transparent"
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    article={{
                      title: article?.title,
                      slug: article?.slug,
                      category_url: article?.category?.category_url,
                      sub_category_name: article?.sub_category?.name,
                      sub_category_url: article.sub_category?.category_url,
                      author: article?.author?.name,
                      release_date: article?.release_date,
                      updated_at: article?.updated_at,
                      tags: article?.tags,
                      article_url: article?.article_url,
                    }}
                  />
                )}
              </div>
            </GridItem>
            <GridItem
              colSpan={{ base: 1, lg: 4 }}
              order={{ base: 1, lg: 2 }}
              display="flex"
              flexDirection="column"
            >
              <VStack position={{ base: 'unset', lg: 'relative' }} flex="1">
                <Box className="w-full lg:sticky lg:top-[113px]">
                  <AdsMr1
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    key="detail-artikel-mr-1"
                  />
                  {isDesktop && (
                    <SectionTrending
                      classNameSection="lg:bg-transparent"
                      backgroundCard="transparent"
                      isDesktop={isDesktop}
                      article={{
                        title: article?.title,
                        slug: article?.slug,
                        category_url: article?.category?.category_url,
                        sub_category_name: article?.sub_category?.name,
                        sub_category_url: article.sub_category?.category_url,
                        author: article?.author?.name,
                        release_date: article?.release_date,
                        updated_at: article?.updated_at,
                        tags: article?.tags,
                        article_url: article?.article_url,
                      }}
                    />
                  )}
                  <AdsMr2
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    key="homepage-mr-2"
                  />
                  <div>
                    <SectionHoroscope
                      containerProps={{
                        border: isDesktop ? '1px solid #bbb' : 'unset',
                        px: isDesktop ? '1rem' : 0,
                      }}
                      bgColor="transparent"
                      isDesktop={isDesktop}
                      isMobile={isMobile}
                      ssr={true}
                      currentHoroscope={dataCurrentHoroscope?.horoscope}
                      horoscopes={dataHoroscopes?.horoscopes}
                    />
                  </div>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </section>
      </ContainerSection>
      <div ref={refExclusive}>
        {InViewExclusive && (
          <SectionExclusive
            containerProps={{
              maxW: 'full',
              px: 0,
              mb: { base: '25px', md: '20px' },
            }}
            isDesktop={isDesktop}
            ssr={false}
            article={{
              title: article?.title,
              slug: article?.slug,
              category_url: article?.category?.category_url,
              sub_category_name: article?.sub_category?.name,
              sub_category_url: article.sub_category?.category_url,
              author: article?.author?.name,
              release_date: article?.release_date,
              updated_at: article?.updated_at,
              tags: article?.tags,
              article_url: article?.article_url,
            }}
          />
        )}
      </div>
      <div ref={refPopCreator}>
        {InViewPopCreator && (
          <SectionPopCreator
            containerProps={{
              px: 0,
              mb: { base: '25px', md: '30px' },
              mt: { md: '40px' },
            }}
            ssr={false}
          />
        )}
      </div>
      <ContainerSection px={isDesktop ? '1rem' : 0}>
        <div ref={refLatest}>
          {InViewLatest && (
            <SectionLatest
              isDesktop={isDesktop}
              category={subCategory}
              titleLatest={article?.sub_category?.name}
              backgroundCard="transparent"
              article={{
                title: article?.title,
                slug: article?.slug,
                category_url: article?.category?.category_url,
                sub_category_name: article?.sub_category?.name,
                sub_category_url: article.sub_category?.category_url,
                author: article?.author?.name,
                release_date: article?.release_date,
                updated_at: article?.updated_at,
                tags: article?.tags,
                article_url: article?.article_url,
              }}
            />
          )}
        </div>
      </ContainerSection>
      <ShareSocial
        isDesktop={isDesktop}
        article={{
          title: article.title,
          url: hostNameOrigin() + article.article_url,
          excerpt: article.excerpt ?? '',
        }}
      />
      <WarningAdult adult_content={article?.adult_content} />
      <AdsSticky key="detail-artikel-sticky" className="bottom-[36px]" />
      <AdsSkinLeft
        isDesktop={isDesktop}
        isMobile={isMobile}
        key="detail-artikel-skin-left"
      />
      <AdsSkinRight
        isDesktop={isDesktop}
        isMobile={isMobile}
        key="detail-artikel-skin-right"
      />
      {/* advertnative */}
      <Script
        id="advertnative"
        async
        strategy="lazyOnload"
        src="https://click.advertnative.com/loading/?handle=16493"
      />
      <ScriptGA
        uuid={article?.uuid}
        title={article?.title}
        slug={article?.slug}
        category_url={article?.category?.category_url}
        category_name={article?.category?.name}
        category_slug={article?.category?.slug}
        sub_category_name={article?.sub_category?.name}
        sub_category_url={article.sub_category?.category_url}
        sub_category_slug={article.sub_category.slug}
        author={article?.author?.name}
        author_slug={article?.author.username}
        release_date={article?.release_date}
        updated_at={article?.updated_at}
        tags={article?.tags}
        article_url={article?.article_url}
        device={isDesktop ? 'desktop' : 'mobile'}
        isFull={router.query.page === 'full'}
        type={article?.type}
      />
    </>
  );
};
export default Detail;
