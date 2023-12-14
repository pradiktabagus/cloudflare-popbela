import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type {
  CardNowOnPopbelaProps,
  CardPotraitProps,
  CustomSLiderProps,
  HeadingVariantProps,
} from '@/components';
import type { DeviceViewProps } from '@/types/device';
import type { ResponseNowOnPopbela } from '@/types/section/now-on-popbela';

export type NowOnPopbelaProps = {
  data: ResponseNowOnPopbela[];
  containerProps?: ContainerProps;
} & DeviceViewProps;

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components').then((mod) => mod.ContainerSection)
);
const CardNowOnPopbela = dynamic<CardNowOnPopbelaProps>(() =>
  import('@/components').then((mod) => mod.CardNowOnPopbela)
);
const CardPotrait = dynamic<CardPotraitProps>(() =>
  import('@/components').then((mod) => mod.CardPotrait)
);
const CustomSlider = dynamic<CustomSLiderProps>(() =>
  import('@/components').then((mod) => mod.CustomSlider)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components').then((mod) => mod.HeadingVariant)
);
export const SectionNowOnPopbela = (props: NowOnPopbelaProps) => {
  const { data, containerProps } = props;
  return (
    <ContainerSection {...containerProps}>
      <section data-testid="section-now-on-popbela" className="mb-4">
        <HeadingVariant
          data-testid="title-section-now-on-popbela"
          variant="section"
          marginBottom="30px"
          display="flex"
          overflow="hidden"
          alignItems="baseline"
          _after={{
            content: '""',
            left: '.5em',
            position: 'relative',
            flexGrow: 1,
            background: '#bbb',
            lineHeight: 0,
            height: '1px',
          }}
        >
          Now On Popbela
        </HeadingVariant>
        <CustomSlider
          autoplaySpeed={5000}
          slidesToShow={1}
          slidesToScroll={1}
          arrows
          autoplay
        >
          {data?.map(
            (datas, index) =>
              datas.latest_posts.length > 0 && (
                <Box key={index} width="full">
                  <Flex width="inherit" flexDirection="column">
                    <Box
                      width="inherit"
                      marginBottom="15px"
                      data-testid="headline-now-on-popbela"
                    >
                      <CardNowOnPopbela
                        data={{
                          ...datas.category,
                          title: datas.latest_posts[0]?.title,
                          article_url: datas.latest_posts[0]?.article_url,
                          release_date: datas.latest_posts[0]?.release_date,
                          cover_article: datas.latest_posts[0]?.cover,
                          excerpt: datas.latest_posts[0]?.excerpt,
                          author: datas.latest_posts[0]?.author,
                        }}
                      />
                    </Box>
                    <Grid templateColumns="repeat(4, 1fr)" gap="15px">
                      {datas.latest_posts?.map((item, i) => {
                        return (
                          i > 0 && (
                            <Box
                              key={i}
                              data-testid="list-article-now-on-popbela"
                            >
                              <CardPotrait
                                data={item}
                                heightimg={163}
                                height="full"
                                paddingdesc="10px 10px 10px 15px"
                                loadingImg="lazy"
                              />
                            </Box>
                          )
                        );
                      })}
                    </Grid>
                  </Flex>
                </Box>
              )
          )}
        </CustomSlider>
      </section>
    </ContainerSection>
  );
};
