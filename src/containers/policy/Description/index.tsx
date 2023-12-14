import type { ContainerProps } from '@chakra-ui/layout';
import { Box, Center, Heading } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

const Definisi = dynamic(() => import('../Definisi'));
const PersyaratanUmum = dynamic(() => import('../PersyaratanUmum'));
const HakCipta = dynamic(() => import('../HakCipta'));
const PersyaratanContent = dynamic(() => import('../PersyaratanContent'));
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const Description = () => {
  return (
    <ContainerSection>
      <Box color="#616161" lineHeight="1.4" fontSize="24px">
        <Center flexDirection="column">
          <Heading
            as="h3"
            fontFamily="Limerick"
            fontSize="24px"
            fontWeight="700"
            marginTop="20px"
            marginBottom="10px"
          >
            Platform IDN Media
          </Heading>
          <Heading
            marginTop="10px"
            marginBottom="10px"
            as="h2"
            fontFamily="Limerick"
            fontSize="22px"
            fontWeight="500"
          >
            Diperbaharui pada 28 Februari 2020
          </Heading>
        </Center>
        <article>
          <Definisi />
          <PersyaratanUmum />
          <HakCipta />
          <PersyaratanContent />
        </article>
      </Box>
    </ContainerSection>
  );
};
export default Description;
