import type { ContainerProps } from '@chakra-ui/layout';
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';

import type {
  BreadcrumbProps,
  ShareDetailArticleProps,
  ShareSocialProps,
} from '@/components';
import type { DeviceViewProps } from '@/types';
import type { ArticleProps } from '@/types/article';
import type { LabelsProps } from '@/types/label';
import type { ResponsePreviewArticlePage } from '@/types/responses/pages/preview-article';
import { hostNameOrigin } from '@/utils/hostnameOrigin';

import { CoverDetailArticle } from '../detail/CoverDetailArticle';

export type TPreviewArticle = DeviceViewProps & {
  data: ResponsePreviewArticlePage;
};

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const Article = dynamic<ArticleProps>(() =>
  import('@/components/Article').then((mod) => mod.Article)
);
const Breadcrumb = dynamic<BreadcrumbProps>(() =>
  import('@/components/Breadcrumb').then((mod) => mod.Breadcrumb)
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const Labels = dynamic<LabelsProps>(() =>
  import('@/components/Label').then((mod) => mod.Labels)
);
const ShareDetail = dynamic<ShareDetailArticleProps>(() =>
  import('@/components/Share/DetailArticle').then((mod) => mod.ShareDetail)
);
const ShareSocial = dynamic<ShareSocialProps>(() =>
  import('@/components/Share/Floating').then((mod) => mod.ShareSocial)
);
const PreviewArticle = ({ isDesktop, data }: TPreviewArticle) => {
  const article = data ?? ({} as ResponsePreviewArticlePage);
  return (
    <>
      {isDesktop && (
        <ContainerSection>
          <Breadcrumb
            paths={[
              { title: 'Home', link: '/' },
              {
                title: article?.category?.name ?? '',
                link: article?.category?.category_url ?? '',
              },
              {
                title: article?.sub_category?.name ?? '',
                link: article?.sub_category?.category_url ?? '',
              },
              {
                title: article?.title || '',
                isCurrentPage: true,
              },
            ]}
            py="8px"
            mb="20px"
          />
        </ContainerSection>
      )}
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
                    title={article?.title}
                    sub_category={article?.sub_category}
                    excerpt={article?.excerpt}
                    release_date={article?.release_date}
                    cover={article?.cover}
                    author={article?.author}
                  />
                  <Article
                    variant={article?.type === 'quiz' ? 'quiz' : 'article'}
                    body={article?.body}
                    data={{
                      description: article?.description,
                      sub_category: article?.sub_category,
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
                            title: article?.title ?? '',
                            // url: hostNameOrigin() + article?.article_url,
                            url: hostNameOrigin(),
                            excerpt: article?.excerpt ?? '',
                          }}
                        />
                      </WrapItem>
                    </Wrap>
                  </Center>
                </article>
              </Box>
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
            </GridItem>

            <GridItem
              colSpan={{ base: 1, lg: 4 }}
              order={{ base: 1, lg: 2 }}
              display="flex"
              flexDirection="column"
            ></GridItem>
          </Grid>
        </section>
      </ContainerSection>
      <ShareSocial
        isDesktop={isDesktop}
        article={{
          title: article?.title ?? '',
          // url: hostNameOrigin() + article?.article_url,
          url: hostNameOrigin(),
          excerpt: article?.excerpt ?? '',
        }}
      />
      <style>
        {`
        #read-more{
          display: none !important;
        }
        `}
      </style>
    </>
  );
};

export default PreviewArticle;
