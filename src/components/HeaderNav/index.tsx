import 'dayjs/locale/id';

import type { StackProps } from '@chakra-ui/layout';
import { Box, HStack, Text } from '@chakra-ui/layout';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import dynamic from 'next/dynamic';

import type { Category } from '@/types/category';
import type { LinkProps } from '@/types/customLink';
import { checkBetweenDates } from '@/utils/checkBetweenDates';
import clsxm from '@/utils/clsxm';
import { useGetToggleFlag } from '@/utils/firebase/remoteConfig';

dayjs.extend(isBetween);

const CustomLink = dynamic<LinkProps>(() =>
  import('../Link').then((mod) => mod.CustomLink)
);

const SkeletonBox = dynamic(() =>
  import('../Skeleton').then((mod) => mod.SkeletonBox)
);

type HeaderNavProps = {
  categories: Category[];
  linkClassname?: string;
  variant?: 'mobile' | 'desktop';
  activeCategoryUrl?: string;
} & StackProps;

const RamadhanMicroSiteLink = ({
  ramadanDates,
  activeCategoryUrl,
  linkClassname,
}: {
  ramadanDates: any;
  activeCategoryUrl?: string;
  linkClassname?: string;
}) => {
  const ramadhanMicroSite = {
    category_url: process.env.ramadanMicrositeLink,
    active: false,
    name: 'RAMADAN',
  };
  const currentDate = dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss');
  const startDate = dayjs(ramadanDates?.result?.start_date).format(
    'YYYY-MM-DD hh:mm:ss'
  );
  const endDate = dayjs(ramadanDates?.result?.end_date).format(
    'YYYY-MM-DD hh:mm:ss'
  );
  if (
    !checkBetweenDates({
      currentDate,
      startDate,
      endDate,
    }) ||
    ramadanDates?.result === ''
  )
    return <></>;

  return (
    <Box
      key="ramadan"
      as="li"
      color={
        ramadhanMicroSite.active ||
        ramadhanMicroSite.category_url === activeCategoryUrl
          ? 'primary'
          : '#373737'
      }
      _hover={{ color: 'primary' }}
      transitionProperty="color"
      transitionDuration="300"
      className={clsxm(
        linkClassname,
        'transition-opacity ease-in duration-700 opacity-100'
      )}
      data-testid="nav-category"
    >
      <Text
        as={CustomLink}
        target="_blank"
        href={ramadhanMicroSite.category_url}
        display="inline-block"
        py={{ sm: '3px', md: '7px' }}
        px={{ sm: '7px', md: '15px' }}
        fontSize={{ sm: '16px', md: '17px' }}
        fontFamily="futuraBook"
        textTransform="uppercase"
        lineHeight={{ sm: '22px', md: '20px' }}
      >
        {ramadhanMicroSite.name}
      </Text>
    </Box>
  );
};

export const HeaderNav = (props: HeaderNavProps) => {
  const {
    categories,
    linkClassname,
    variant = 'desktop',
    activeCategoryUrl,
    ...stackProps
  } = props;

  const isForMobile = variant === 'mobile';
  const ramadanMicrositeToggle = useGetToggleFlag('menu_navbar_ramadan');

  return (
    <HStack
      as="ul"
      w={isForMobile ? 'full' : 'fit-content'}
      maxW="full"
      spacing={{ base: '5px', md: 0 }}
      justifyContent={
        isForMobile ? { base: 'flex-start', sm2: 'space-evenly' } : 'center'
      }
      listStyleType="none"
      whiteSpace="nowrap"
      _before={isForMobile ? { display: 'table', content: `" "` } : {}}
      _after={isForMobile ? { display: 'table', content: `" "` } : {}}
      {...stackProps}
      data-testid="header-nav"
    >
      {ramadanMicrositeToggle?.isLoadingFlag ? (
        <Box
          height="18px"
          marginBottom="10px"
          flex={1}
          paddingLeft={{ base: 0, md: '15px' }}
          paddingRight={{ base: 0, md: '15px' }}
          alignItems="center"
          display="flex"
          gap={4}
        >
          {Array(categories?.length ?? 4)
            .fill(true)
            .map((_, i) => (
              <SkeletonBox
                key={i}
                className="h-full w-[100px] rounded leading-none"
              />
            ))}
        </Box>
      ) : (
        <>
          <RamadhanMicroSiteLink
            activeCategoryUrl={activeCategoryUrl}
            linkClassname={linkClassname}
            ramadanDates={ramadanMicrositeToggle}
          />
          {categories.map((category) => (
            <Box
              key={category.category_url + category.name}
              as="li"
              color={
                category.active || category.category_url === activeCategoryUrl
                  ? 'primary'
                  : '#373737'
              }
              _hover={{ color: 'primary' }}
              transitionProperty="color"
              transitionDuration="300"
              className={clsxm(linkClassname)}
              data-testid="nav-category"
            >
              <Text
                as={CustomLink}
                href={category.category_url}
                display="inline-block"
                py={{ sm: '3px', md: '7px' }}
                px={{ sm: '7px', md: '15px' }}
                fontSize={{ sm: '16px', md: '17px' }}
                fontFamily="futuraBook"
                textTransform="uppercase"
                lineHeight={{ sm: '22px', md: '20px' }}
              >
                {category.name}
              </Text>
            </Box>
          ))}
        </>
      )}
    </HStack>
  );
};
