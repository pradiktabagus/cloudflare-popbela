import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type {
  CardMobileProps,
  CardPotraitProps,
  CustomSLiderProps,
} from '@/components';
import type { DeviceViewProps } from '@/types/device';
import type { ResponseHeadline } from '@/types/section/headline';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const CardPotrait = dynamic<CardPotraitProps>(() =>
  import('@/components/Cards/CardPotrait').then((mod) => mod.CardPotrait)
);
const CardMobilePotrait = dynamic<CardMobileProps>(() =>
  import('@/components/Cards/CardMobilePotrait').then(
    (mod) => mod.CardMobilePotrait
  )
);
const CustomSlider = dynamic<CustomSLiderProps>(() =>
  import('@/components/Slider').then((mod) => mod.CustomSlider)
);
export type HeadlineProps = {
  data?: ResponseHeadline[];
  imageHeight?: string | number;
  headingTitle?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  containerProps?: ContainerProps;
} & DeviceViewProps;
export const SectionHeadline = (props: HeadlineProps) => {
  const {
    data = [],
    imageHeight = '436px',
    isDesktop,
    headingTitle = 'h2',
    containerProps,
  } = props;
  return (
    <ContainerSection {...containerProps}>
      <section data-testid="section-headline" className="mb-5">
        {isDesktop ? (
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" gap="10px">
              {
                // make sure max is 3 article
                data.slice(0, 3).map((item, i) => (
                  <CardPotrait
                    key={i}
                    data={item}
                    heightimg={imageHeight}
                    titleProps={{ as: headingTitle }}
                    csc={item.flag === 'csc'}
                    priorityImg={true}
                  />
                ))
              }
            </Grid>
          </Box>
        ) : (
          <CustomSlider
            dots={true}
            withDefaultResponsive={true}
            slidesToShow={3}
            slidesToScroll={1}
            withMargin={false}
            autoplay
            autoplaySpeed={5000} // 5s
          >
            {data.slice(0, 3).map((item, i) => (
              <Box key={i}>
                <CardMobilePotrait
                  data={item}
                  titleProps={{ as: 'h2' }}
                  csc={item.flag === 'csc'}
                  priorityImg={true}
                />
              </Box>
            ))}
          </CustomSlider>
        )}
      </section>
    </ContainerSection>
  );
};
