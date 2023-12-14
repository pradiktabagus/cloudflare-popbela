import { Box, Grid, GridItem } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

const SkeletonBox = dynamic(() =>
  import('../SkeletonBox').then((mod) => mod.SkeletonBox)
);
const SkeletonPromotion = () => {
  return (
    <section
      className="my-6 grid grid-cols-1 gap-y-2"
      data-testid="section-promotion"
    >
      <div
        className="relative min-h-[80px]
w-full rounded bg-[#FFE0EC] px-5 py-4"
      >
        <div className="flex flex-col items-center md:flex-row">
          <Box
            height="30px"
            flex={1}
            paddingLeft={{ base: 0, md: '15px' }}
            alignItems="center"
            display="flex"
          >
            <SkeletonBox className="h-full w-[180px] rounded leading-none" />
          </Box>
          <Grid flex={1} mt="12px" gap="6px" width="full">
            <GridItem borderRadius="4px" height="40px">
              <SkeletonBox className="h-full w-full rounded leading-none" />
            </GridItem>
            <GridItem borderRadius="4px" height="40px">
              <SkeletonBox className="h-full w-full rounded leading-none" />
            </GridItem>
          </Grid>
        </div>
      </div>
    </section>
  );
};
export default SkeletonPromotion;
