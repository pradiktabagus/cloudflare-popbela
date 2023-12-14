import {
  Box,
  Center,
  Divider as ChakraDivider,
  Flex,
  Text,
} from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { DeviceViewProps } from '@/types';

import type { ImageLoaderProps } from '../Images';

const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const ContainerSearch = ({
  children,
  testId,
}: {
  children: React.ReactNode;
  testId: string;
}) => {
  return (
    <Box w="full" paddingY="10px" data-testid={testId}>
      {children}
    </Box>
  );
};

const ImageEmpty = () => {
  return (
    <ImageLoader
      alt="Empty Search"
      src="/v3/assets/images/global/empty-search.png"
      height={160}
      width={209}
    />
  );
};

const FlexWrapper = ({ children }: { children: React.ReactNode }) => (
  <Flex direction="column" justifyContent="center" alignItems="center" w="full">
    {children}
  </Flex>
);

const FlexWrapperPopUp = ({ children }: { children: React.ReactNode }) => (
  <Flex
    direction="row"
    justifyContent="center"
    alignItems="center"
    h="300px"
    w="full"
  >
    {children}
  </Flex>
);

const Divider = () => (
  <ChakraDivider
    orientation="vertical"
    opacity="1"
    borderColor="#bbb"
    height="200px"
  />
);

const ImageLogo = () => {
  return (
    <ImageLoader
      alt="Logo Popbela"
      src="/v3/assets/images/global/logo.png"
      height={28}
      width={120}
    />
  );
};

export const ContainerSearchDefaultPopup = () => {
  return (
    <ContainerSearch testId="container-search-default">
      <FlexWrapperPopUp>
        <Flex flex={1} justifyContent="flex-end" alignItems="center">
          <Box height="200px" width="209px" mr="15px">
            <ImageEmpty />
          </Box>
        </Flex>
        <Divider />
        <Flex
          flex={1}
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          pt="30px"
          pl="40px"
        >
          <ImageLogo />
          <Text fontFamily="bahijMitra" fontSize="18px" color="#646464">
            You can search everything in here.
            <br />
            Find article fashion, beauty,
            <br />
            relationship and lifestyle.
          </Text>
        </Flex>
      </FlexWrapperPopUp>
    </ContainerSearch>
  );
};

export const ContainerSearchDefault = ({ isDesktop }: DeviceViewProps) => {
  return (
    <ContainerSearch testId="container-search-default">
      {isDesktop ? (
        <FlexWrapper>
          <Flex justifyContent="flex-end" alignItems="center">
            <Box height="100px" width="100px" mr="15px">
              <ImageEmpty />
            </Box>
          </Flex>
          <Text fontFamily="bahijMitra" fontSize="18px" color="#646464">
            You can search everything in here. Find article fashion, beauty,
            relationship and lifestyle.
          </Text>
        </FlexWrapper>
      ) : (
        <FlexWrapper>
          <Flex justifyContent="flex-end" alignItems="center" gap={2}>
            <Box width="100px" mr="15px">
              <ImageEmpty />
            </Box>
            <Text fontFamily="bahijMitra" fontSize="16px" color="#646464">
              You can search everything in here. Find article fashion, beauty,
              relationship and lifestyle.
            </Text>
          </Flex>
        </FlexWrapper>
      )}
    </ContainerSearch>
  );
};

export const ContainerSearchNotFound = ({ isDesktop }: DeviceViewProps) => {
  return (
    <ContainerSearch testId="container-search-not-found">
      <Center display="flex" flexDirection="column" paddingY="39px">
        <Text
          color="#797D7F"
          fontWeight="800"
          fontSize={isDesktop ? '36px' : '24px'}
          fontFamily="limerickMedium"
        >
          No Result Found
        </Text>
        <Text
          fontFamily="bahijMitra"
          fontSize="20px"
          color="#646464"
          maxW="240px"
        >
          Please search with different keyword
        </Text>
      </Center>
    </ContainerSearch>
  );
};
