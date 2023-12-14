import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { ImageLoaderProps } from '@/components';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container/index').then((mod) => mod.ContainerSection)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader/index').then((mod) => mod.ImageLoader)
);
const Description = () => {
  return (
    <ContainerSection>
      <Box bg="#fff" p={{ base: '0px', md: '45px 40px' }}>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box
            position="relative"
            height={{ base: '30vh', md: '350px' }}
            width={{ base: '100%', md: '100%' }}
            flex="1"
          >
            <ImageLoader
              src="https://image.popbela.com/content-images/post/20160125/adorngirl-com-2cc1ace77a2f60e9a58ffbd790f3396c.jpg"
              priority
              fill
              className="object-cover"
              alt="contact-us"
            />
          </Box>
          <Box
            p="20px"
            fontSize="22px"
            color="#616161"
            flex="1"
            marginLeft={{ base: '0', md: '15px' }}
          >
            <div>
              <Heading
                as="h3"
                fontFamily="limerick"
                fontWeight="700"
                lineHeight="1.4"
                marginBottom="10px"
                fontSize="30px"
                color="#333"
              >
                Untuk menghubungi tim POPBELA.com
              </Heading>
              <Text marginBottom="25px">
                Silahkan langsung kirimkan e-mail ke{' '}
                <a className="text-primary" href="mailto:hello@popbela.com">
                  hello@popbela.com
                </a>
                .
              </Text>
              <Text marginBottom="25px">
                Kita dengan senang hati akan menjawab pertanyaan dan{' '}
                <em>feedback</em>mu. Semoga harimu menyenangkan!
              </Text>
            </div>
          </Box>
        </Flex>
      </Box>
    </ContainerSection>
  );
};
export default Description;
