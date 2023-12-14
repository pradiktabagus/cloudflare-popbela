import type { ContainerProps } from '@chakra-ui/layout';
import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Fade } from '@chakra-ui/transition';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { Fragment, useState } from 'react';

import { useDefaultComponent } from '@/adapters/hooks/components';
import type {
  ButtonProps,
  GridListHoroscopesProps,
  HeadingVariantProps,
  ImageLoaderProps,
} from '@/components';
import type { LinkProps } from '@/types/customLink';
import type { DeviceViewProps } from '@/types/device';
import type { Horoscope } from '@/types/horoscopes';
import type {
  ResponseCurrentHoroscope as ResponseCurrentHoroscopes,
  ResponseHoroscopes,
} from '@/types/responses/components/horoscopes';
import type { ResponseCurrentHoroscope } from '@/types/responses/horoscope';

export type SectionHoroscopeProps = {
  horoscopes?: Horoscope[];
  currentHoroscope?: ResponseCurrentHoroscope;
  containerProps?: ContainerProps;
  bgColor?: string;
  ssr?: boolean;
} & DeviceViewProps;

const beforeAfterStyle = {
  bgColor: '#bbb',
  content: '""',
  display: 'inline-block',
  height: '1px',
  pos: 'relative',
  width: '50%',
};
const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const Button = dynamic<ButtonProps>(() =>
  import('@/components/Buttons/ButtonDefault').then((mod) => mod.Button)
);
const GridListHoroscopes = dynamic<GridListHoroscopesProps>(() =>
  import('@/components/GridListHoroscopes').then(
    (mod) => mod.GridListHoroscopes
  )
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading/HeadingVariant').then(
    (mod) => mod.HeadingVariant
  )
);
const SkeletonBox = dynamic(() =>
  import('@/components/Skeleton/SkeletonBox').then((mod) => mod.SkeletonBox)
);
export const SectionHoroscope = ({
  isDesktop = true,
  bgColor = 'white',
  containerProps,
  currentHoroscope: currentHoroscopeSSR,
  horoscopes: horoscopesSSR,
  ssr = true,
}: SectionHoroscopeProps) => {
  const [visibleChooseZodiac, setVisibleChooseZodiac] = useState(false);
  const { data: dataCurrentHoroscope, isFetching } =
    useDefaultComponent<ResponseCurrentHoroscopes>({
      end_point: '/current-horoscope',
    });
  const { data: dataHoroscopes } = useDefaultComponent<ResponseHoroscopes>({
    end_point: '/horoscopes',
  });
  const currentHoroscope = ssr
    ? currentHoroscopeSSR
    : dataCurrentHoroscope?.horoscope;
  const horoscopes = ssr ? horoscopesSSR : dataHoroscopes?.horoscopes;
  return (
    <ContainerSection {...containerProps}>
      {isDesktop ? (
        <Box
          as="section"
          data-testid="section-horoscope"
          bgColor={bgColor}
          p="30px"
          fontSize="18px"
          pos="relative"
        >
          <HStack justifyContent="center" mb="20px">
            <CustomLink href="/horoscopes">
              <HeadingVariant
                fontSize="25px"
                _hover={{ color: '#911348' }}
                as="h2"
              >
                horoscope
              </HeadingVariant>
            </CustomLink>
          </HStack>
          <Text
            color="title"
            fontWeight="700"
            fontSize="22px"
            textAlign="center"
            mb="20px"
          >
            {"This week's horoscope"}
          </Text>
          <Grid
            templateColumns={'auto 1fr'}
            columnGap="15px"
            alignItems="end"
            mb="30px"
          >
            {isFetching && !ssr ? (
              <SkeletonBox className="h-[75px] w-[75px] rounded-full leading-none" />
            ) : (
              <GridItem
                boxSize="75px"
                as={CustomLink}
                href={currentHoroscope?.horoscope_url}
              >
                <ImageLoader
                  src={
                    currentHoroscope?.icon ??
                    '/v3/assets/images/global/not-found.png'
                  }
                  width={75}
                  height={75}
                  loading="lazy"
                  alt="horoscopes"
                />
              </GridItem>
            )}
            <GridItem as={VStack} alignItems="flex-start">
              {isFetching && !ssr ? (
                <Fragment>
                  <SkeletonBox className="mb-1 h-4 w-24 rounded-full leading-none" />
                  <SkeletonBox className="h-14 w-full rounded leading-none" />
                </Fragment>
              ) : (
                <Fragment>
                  <Text
                    as={CustomLink}
                    fontSize="18px"
                    fontWeight="700"
                    fontFamily="limerick"
                    color="primary"
                    textTransform="uppercase"
                    href={currentHoroscope?.horoscope_url}
                  >
                    {currentHoroscope?.name}
                  </Text>
                  <Text
                    noOfLines={3}
                    fontSize="18px"
                    lineHeight="1"
                    color="#484C4E"
                  >
                    {`${(currentHoroscope?.excerpt ?? '').slice(0, 65)}... `}
                    <Text
                      as={CustomLink}
                      color="primary"
                      _hover={{ color: '#911348' }}
                      href={currentHoroscope?.horoscope_url}
                    >
                      read more
                    </Text>
                  </Text>
                </Fragment>
              )}
            </GridItem>
          </Grid>
          <Text textAlign="center" mb="20px">
            See more horoscopes here
          </Text>
          <Center>
            <Button
              bgColor={bgColor}
              py="6px"
              color="title"
              onClick={() => setVisibleChooseZodiac((prev) => !prev)}
            >
              <HStack fontSize="16px" fontWeight="400" whiteSpace="nowrap">
                <Box>{"What's yours?"}</Box>
                <FontAwesomeIcon icon={faCaretUp} width="10px" height="16px" />
              </HStack>
            </Button>
          </Center>
          <Fade in={visibleChooseZodiac}>
            <Box
              pos="absolute"
              top="5px"
              left="0"
              right="0"
              px="40px"
              bg="white"
              h="78%"
              display={visibleChooseZodiac ? 'block' : 'none'}
            >
              <GridListHoroscopes as="grid" initialData={horoscopes} />
            </Box>
          </Fade>
        </Box>
      ) : (
        <Box
          as="section"
          data-testid="section-horoscope"
          w="full"
          maxW="100vw"
          marginBottom="35px"
          padding="0 1.2rem"
        >
          <HeadingVariant
            variant="section"
            textAlign="center"
            pb="15px"
            _before={{
              ...beforeAfterStyle,
              right: '0.5em',
              ml: '-50%',
            }}
            _after={{
              ...beforeAfterStyle,
              left: '0.5em',
              mr: '-50%',
            }}
            overflow="hidden"
            fontSize="24px"
          >
            horoscope
          </HeadingVariant>
          <GridListHoroscopes as="list" initialData={horoscopes} />
        </Box>
      )}
    </ContainerSection>
  );
};
