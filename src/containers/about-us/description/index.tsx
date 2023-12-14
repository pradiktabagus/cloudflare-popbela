import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { ImageLoaderProps } from '@/components';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container/index').then((mod) => mod.ContainerSection)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);

const ABOUT_PHOTO =
  'https://image.popbela.com/content-images/post/20230404/popbela-team-hyp00365-1-ae7223f65a2ff8ee4c17ecf04a38427b.jpg';

const Description = () => {
  return (
    <ContainerSection>
      <Box bg="#fff" p={{ base: '0px', md: '45px 40px' }}>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box
            position="relative"
            height={{ base: '30vh', md: '350px' }}
            width={{ base: '100%', md: '100%' }}
          >
            <ImageLoader
              src={ABOUT_PHOTO}
              priority
              fill
              className="object-cover"
              alt="about-us"
            />
          </Box>
          <Box
            p="20px"
            fontSize="22px"
            color="#616161"
            flex="1"
            minW={{ base: '100%', md: '550px' }}
            marginLeft={{ base: '0', md: '15px' }}
          >
            <div>
              <Heading
                as="h3"
                fontFamily="limerick"
                fontWeight="700"
                lineHeight="1.4"
                marginBottom="10px"
              >
                We are every woman’s best friend
              </Heading>
              <Text marginBottom="25px">
                Popbela.com is the leading multi-platform digital media covering
                fashion, beauty, pop-culture, and lifestyle for Millennials and
                Gen Z women in Indonesia.
              </Text>
              <Text marginBottom="25px">
                We craft the latest trending, news, and relevant content to our
                smart audience, ranging from pop-culture, fashion, beauty,
                lifestyle, to social, politics, career, and culture. Popbela.com
                strives to deliver high quality and worth-sharing content to its
                audience right where they are, utilizing its massive and
                interconnected multi-platform channels.
              </Text>
              <Text marginBottom="25px">
                Popbela.com believes in 7 pillars: gender equality, anti sexual
                harassment, anti bullying, anti stereotyping, unity in different
                races and ethnicities, unity in different religions, and
                redefining beauty.
              </Text>
            </div>
          </Box>
        </Flex>
        <div>
          <Box>
            <Box textAlign="center" fontSize="22px" color="#616161">
              <Heading
                as="h3"
                fontFamily="limerick"
                fontSize="22px"
                fontWeight="700"
                lineHeight="1.4"
                marginBottom="25px"
              >
                Editorial Team of Popbela.com
              </Heading>
              <Center>
                <Box>
                  <Box marginBottom="25px">
                    <Text marginBottom="8px">
                      <strong>Editor in Chief</strong>
                    </Text>
                    <Text>Judithya Pitana</Text>
                  </Box>
                  <Box marginBottom="25px">
                    <Text marginBottom="8px">
                      <strong>Creative Editor</strong>
                    </Text>
                    <Text>Michael Richards | Fashion</Text>
                    <Text>Nurul Ayu Utami | Lifestyle & Career</Text>
                    <Text>Jennifer Alexis Tanjung | Beauty</Text>
                  </Box>
                  <Box marginBottom="25px">
                    <Text marginBottom="8px">
                      <strong>Creative Writer</strong>
                    </Text>
                    <Text>Hafidhza Andiza | Fashion</Text>
                    <Text>Niken Ari Prayitno | Lifestyle & Career</Text>
                    <Text>Windari Subangkit | Relationship</Text>
                    <Text>Natasha Cecilia Anindita | Relationship </Text>
                    <Text>Shavira Annisa Putri | Beauty</Text>
                  </Box>
                </Box>
              </Center>
            </Box>
          </Box>
        </div>
      </Box>
    </ContainerSection>
  );
};
export default Description;
