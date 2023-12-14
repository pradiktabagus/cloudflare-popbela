import { Box } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

const SkeletonBox = dynamic(() =>
  import('../SkeletonBox').then((mod) => mod.SkeletonBox)
);

const SkeletonPopCreator = () => {
  return (
    <Box
      data-testid="card-popcreator"
      height={{ sm: 'auto', lg: '426px' }}
      width="full"
      position="relative"
      paddingTop={{ sm: '100px' }}
      paddingBottom={{ sm: '50px' }}
    >
      <Box
        data-testid="background-card"
        position="absolute"
        top={0}
        right={0}
        left={0}
        bottom={0}
        overflow="hidden"
        margin="0 auto"
        zIndex={3}
        opacity=".5"
        width={{ lg: '100%' }}
        height={{ lg: '100%' }}
      >
        <Box
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          filter="grayscale(100%)"
          width={{ sm: '100%' }}
          height={{ sm: '200%', lg: '100%' }}
        >
          <SkeletonBox className="mb-2 h-full w-full rounded leading-none" />
        </Box>
      </Box>
      <Box
        data-testid="desc-popcreator"
        background="white"
        overflow="inherit"
        padding={{ sm: '20px', lg: '10px' }}
        width="90%"
        height={{ lg: '395px' }}
        top={{ sm: '14px', lg: '15px' }}
        left={{ lg: '38px' }}
        right={{ lg: '18px' }}
        margin="0 auto"
        position={{ sm: 'relative', lg: 'absolute' }}
        zIndex={4}
        display="flex"
        flexDirection={{ sm: 'column', lg: 'row' }}
        textAlign={{ sm: 'center', lg: 'left' }}
        alignItems={{ lg: 'center' }}
      >
        <Box
          flex={{ lg: '1' }}
          paddingRight={{ lg: '65px' }}
          marginLeft={{ lg: '-30px' }}
        >
          <Box
            width="100%"
            height={{ sm: '290px', lg: '371px' }}
            position="relative"
            marginTop={{ sm: '-85px', lg: '0' }}
            display="block"
          >
            <SkeletonBox className="h-full w-full leading-none" />
          </Box>
        </Box>
        <Box
          flex={{ lg: '1' }}
          height={{ lg: 'fit-content' }}
          paddingRight={{ lg: '55px' }}
          alignItems="center"
        >
          <Box marginTop="1rem" marginBottom="20px">
            <Box
              height={{ sm: '35px', lg: '40px' }}
              width={{ sm: 'full', lg: '165px' }}
              position="relative"
              as="h2"
            >
              <SkeletonBox className="mb-2 h-10 w-full rounded leading-none" />
            </Box>
          </Box>
          <SkeletonBox className="mb-1 h-6 w-full rounded leading-none" />
          <SkeletonBox className="mb-8 h-6 w-1/3 rounded leading-none" />
          <SkeletonBox className="mb-1 h-3 w-full rounded leading-none" />
          <Box
            marginTop="2rem"
            marginBottom="1.5rem"
            textTransform="uppercase"
            fontFamily="futuraBook"
            data-testid="button-seemore"
          >
            <SkeletonBox className="mb-1 h-8 w-20 leading-none" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonPopCreator;
