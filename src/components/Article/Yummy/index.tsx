import { Box } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { ImageLoaderProps } from '@/components/Images';
import type { LinkProps } from '@/types/customLink';

const CustomLink = dynamic<LinkProps>(() =>
  import('../../Link').then((mod) => mod.CustomLink)
);
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('../../Images').then((mod) => mod.ImageLoader)
);
const Index = () => {
  return (
    <div data-testid="section-yummy-app" className="mt-7">
      <CustomLink href="http://bit.ly/downloadyummypopbelafood">
        <Box position="relative" width="full" height={120}>
          <ImageLoader
            data-testid="yummy-image"
            fill
            alt="yummy"
            className="object-cover"
            src="https://cdn.popbela.com/content-images/avatar/vob-voice-of-baceprot_20220420175505.JPG"
            priority={true}
          />
        </Box>
      </CustomLink>
    </div>
  );
};
export default Index;
