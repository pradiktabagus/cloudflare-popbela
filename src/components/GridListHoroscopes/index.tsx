import type { BoxProps, GridProps, TextProps } from '@chakra-ui/layout';
import { Box, Flex, Grid, GridItem, HStack, Text } from '@chakra-ui/layout';
import Skeleton from 'react-loading-skeleton';

import { useDefaultComponent } from '@/adapters/hooks/components';
import type { Horoscope } from '@/types/horoscopes';
import type { ResponseHoroscope } from '@/types/responses/horoscope';
import clsxm from '@/utils/clsxm';

import { ImageLoader } from '../Images';
import { CustomLink } from '../Link';

export type GridListHoroscopesProps = {
  as?: 'list' | 'grid';
  initialData?: Horoscope[];
  iconProps?: BoxProps;
  nameProps?: TextProps;
  gridProps?: GridProps;
};

const SkeletonItemHoroscope = ({ isGrid }: { isGrid: boolean }) => (
  <Flex
    direction={isGrid ? 'row' : 'column'}
    alignItems="center"
    gap="10px"
    w={isGrid ? '38px' : '65px'}
  >
    <Skeleton
      containerClassName={clsxm(
        isGrid ? 'w-[38px] h-[38px]' : 'w-[65px] h-[65px]'
      )}
      className={clsxm(isGrid ? 'w-[38px] h-[38px]' : 'w-[65px] h-[65px]')}
    />
    <Skeleton
      containerClassName="h-[20px] w-[60px]"
      className="h-[20px] w-[60px]"
    />
  </Flex>
);

const arrayEmptyZodiac = Array.from(Array(12).keys());

const HoroscopeItem = ({
  zodiac,
  isGrid,
  iconProps,
  nameProps,
}: { zodiac: Horoscope; isGrid: boolean } & Pick<
  GridListHoroscopesProps,
  'iconProps' | 'nameProps'
>) => (
  <Box role="group" data-testid="item-horoscope" w={isGrid ? 'full' : '65px'}>
    <CustomLink
      href={zodiac.horoscope_url}
      className={clsxm('flex items-center', isGrid ? 'flex-row' : 'flex-col')}
    >
      <Box
        boxSize={isGrid ? '38px' : '65px'}
        mr={isGrid ? '5px' : 0}
        {...iconProps}
      >
        <ImageLoader
          noLoader={false}
          src={zodiac.icon}
          width={65}
          height={65}
          loading="lazy"
          alt={zodiac.name}
        />
      </Box>
      <Text
        fontFamily="limerick"
        fontWeight="700"
        fontSize="14px"
        color={isGrid ? 'secondary' : 'title'}
        mt={isGrid ? 0 : '10px'}
        textTransform="uppercase"
        _groupHover={{ color: 'primary' }}
        {...nameProps}
      >
        {zodiac.name}
      </Text>
    </CustomLink>
  </Box>
);

export const GridListHoroscopes = ({
  as = 'grid',
  iconProps,
  nameProps,
  gridProps,
}: GridListHoroscopesProps) => {
  const isGrid = as === 'grid';
  const horoscopesQuery = useDefaultComponent<ResponseHoroscope>({
    end_point: '/horoscopes',
  });

  return isGrid ? (
    <Grid
      gridTemplateColumns="repeat(2, 1fr)"
      gap="10px"
      data-testid="grid-horoscopes"
      {...gridProps}
    >
      {horoscopesQuery.isLoading
        ? arrayEmptyZodiac.map((n) => (
            <GridItem key={n} display="flex" justifyContent="flex-start">
              <SkeletonItemHoroscope isGrid />
            </GridItem>
          ))
        : horoscopesQuery.data?.horoscopes.map((zodiac) => (
            <GridItem
              key={zodiac.name}
              display="flex"
              justifyContent="flex-start"
            >
              <HoroscopeItem
                zodiac={zodiac}
                isGrid={isGrid}
                iconProps={iconProps}
                nameProps={nameProps}
              />
            </GridItem>
          ))}
    </Grid>
  ) : (
    <Box h="96px" overflowY="hidden" w="full">
      <HStack
        overflowX="scroll"
        w="full"
        maxW="full"
        spacing="25px"
        data-testid="list-horoscopes"
        pb="20px"
      >
        {horoscopesQuery.isLoading
          ? arrayEmptyZodiac.map((n) => (
              <SkeletonItemHoroscope key={n} isGrid={false} />
            ))
          : horoscopesQuery.data?.horoscopes.map((zodiac) => (
              <HoroscopeItem
                key={zodiac.name}
                zodiac={zodiac}
                isGrid={isGrid}
                iconProps={iconProps}
                nameProps={nameProps}
              />
            ))}
      </HStack>
    </Box>
  );
};
