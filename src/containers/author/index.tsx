import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import type { ImageLoaderProps } from '@/components';
import type { SectionPopCreatorProps } from '@/sections';
import type { DeviceViewProps } from '@/types';
import type { AvatarProps } from '@/types/avatar';
import type { LatestOptProps } from '@/types/latest';
import type { AuthorPageResponse } from '@/types/responses/pages/author';

type TAuthor = DeviceViewProps;

export type TAuthorPage = {
  data?: AuthorPageResponse;
} & TAuthor;

const SectionLatestAuthor = dynamic<LatestOptProps>(() =>
  import('@/sections/Latest/author').then((mod) => mod.SectionLatestAuthor)
);
const SectionPopCreator = dynamic<SectionPopCreatorProps>(() =>
  import('@/sections/PopCreator').then((sec) => sec.SectionPopCreator)
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container/index').then((mod) => mod.ContainerSection)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader/index').then((mod) => mod.ImageLoader)
);
const Avatar = dynamic<AvatarProps>(() =>
  import('@/components/Avatar/index').then((mod) => mod.Avatar)
);
const Author = ({ isDesktop, data }: TAuthorPage) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <h1 className="seo">
        {data?.user?.name} - Popbela.com: A Pop-culture and Lifestyle for
        Millennials Women
      </h1>
      <ContainerSection paddingTop="20px" paddingBottom="20px">
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection={isDesktop ? 'row' : 'column'}
        >
          {data?.user?.user_type_slug === 'popcreator' && (
            <>
              <Box
                height={{ sm: '60px', lg: '59px' }}
                width={{ sm: 'full', lg: '244px' }}
                position="relative"
                as="h2"
                float="left"
                marginRight={isDesktop ? '-10rem' : ''}
                marginBottom={!isDesktop ? '1rem' : '0'}
              >
                <ImageLoader
                  data-testid="logo-popcreator"
                  fill
                  alt="popcreator"
                  className="object-contain"
                  src={'/v3/assets/images/global/logo-popcreator-medium.svg'}
                  loading="lazy"
                />
              </Box>
              {!isDesktop && <hr className="w-full border" />}
            </>
          )}
          <Flex
            width="100%"
            alignItems="center"
            gap="10px"
            justifyContent="center"
            marginTop={!isDesktop ? '1rem' : ''}
          >
            <Avatar
              className="bg-transparent"
              boxSize={{ base: '60px', lg: '135px' }}
              data={{
                name: data?.user?.name ?? '',
                avatar: data?.user?.avatar2 ?? '',
                author_url: data?.user?.username ?? '',
              }}
            />
            <Box
              overflow="hidden"
              color="#333"
              fontSize="22px"
              fontFamily="limerick"
              fontWeight="600"
              textTransform="uppercase"
              data-testid="author-article"
            >
              <h2>{data?.user?.name}</h2>
            </Box>
          </Flex>
        </Flex>
      </ContainerSection>
      <SectionLatestAuthor
        data={data?.latest?.articles}
        category={slug}
        isDesktop={isDesktop}
        type={
          data?.user?.user_type_slug === 'contributor'
            ? 'author'
            : 'popcreators'
        }
      />
      {data?.user?.user_type_slug === 'contributor' && (
        <SectionPopCreator
          containerProps={{
            px: 0,
            mb: { base: '25px', md: '30px' },
            mt: { md: '40px' },
          }}
          data={data?.popcreator_of_the_month}
          ssr={false}
        />
      )}
    </>
  );
};
export default Author;
