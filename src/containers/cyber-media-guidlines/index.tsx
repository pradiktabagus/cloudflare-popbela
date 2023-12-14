import type { ContainerProps } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { HeadingVariantProps } from '@/components';
import type { DeviceViewProps } from '@/types/device';

const Description = dynamic<any>(() => import('./description'));
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container/index').then((mod) => mod.ContainerSection)
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading/HeadingVariant').then(
    (mod) => mod.HeadingVariant
  )
);
export type TCyberMedia = DeviceViewProps;
const CyberMedia = ({ isDesktop }: TCyberMedia) => {
  return (
    <>
      <ContainerSection>
        <Box as="section" data-testid="title-cyber-media">
          <HeadingVariant
            as="h2"
            data-testid="title-cyber-media"
            variant="section"
            fontSize={isDesktop ? '30px' : '24px'}
            marginBottom={isDesktop ? '45px' : '30px'}
            marginTop={isDesktop ? '25px' : '10px'}
            display="flex"
            overflow="hidden"
            alignItems="baseline"
            textTransform="unset"
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
            Pedoman Media Siber
          </HeadingVariant>
        </Box>
      </ContainerSection>
      <Description />
    </>
  );
};
export default CyberMedia;
