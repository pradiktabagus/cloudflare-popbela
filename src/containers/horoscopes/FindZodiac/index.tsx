import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { HeadingVariantProps, ZodiacProps } from '@/components';
import type { DeviceViewProps } from '@/types';
import type { Horoscope } from '@/types/responses/pages/horoscopes';

export type TSectionFindZodiac = {
  data?: Horoscope[];
  containerProps?: ContainerProps;
} & DeviceViewProps;

const CardZodiac = dynamic<ZodiacProps>(() =>
  import('@/components/Cards/CardZodiac').then((cmp) => cmp.CardZodiac)
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((cmp) => cmp.ContainerSection)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading/HeadingVariant').then(
    (cmp) => cmp.HeadingVariant
  )
);
const FindZodiac = ({
  data,
  isDesktop,
  containerProps,
}: TSectionFindZodiac) => {
  return (
    <ContainerSection {...containerProps}>
      <Box as="section" data-testid="section-find-zodiac">
        <HeadingVariant
          as="h2"
          data-testid="title-section-find-zodiac"
          variant="section"
          fontSize={isDesktop ? '30px' : '24px'}
          marginBottom={isDesktop ? '35px' : '15px'}
          display="flex"
          overflow="hidden"
          alignItems="baseline"
          textAlign={isDesktop ? 'left' : 'center'}
          _before={{
            content: isDesktop ? 'none' : '""',
            position: 'relative',
            flexGrow: 1,
            background: '#bbb',
            lineHeight: 0,
            height: '1px',
            right: '.5rem',
            width: 'auto',
            display: 'inline-block',
          }}
          _after={{
            content: '""',
            position: 'relative',
            left: '.5rem',
            flexGrow: 1,
            background: '#bbb',
            lineHeight: 0,
            height: '1px',
            width: 'auto',
            display: 'inline-block',
          }}
        >
          Find Your Zodiac
        </HeadingVariant>
        <Grid
          templateColumns={isDesktop ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'}
          gap={isDesktop ? '38px' : '10px'}
        >
          {data?.map((horoscope) => (
            <Box key={horoscope.name} data-testid="item-zodiac">
              <CardZodiac
                data={horoscope}
                padding={isDesktop ? '10px 20px' : '10px 15px 5px'}
              />
            </Box>
          ))}
        </Grid>
      </Box>
    </ContainerSection>
  );
};
export default FindZodiac;
