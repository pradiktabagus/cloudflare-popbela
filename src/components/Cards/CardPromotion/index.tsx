import { Grid, GridItem } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { ImageLoaderProps } from '@/components/Images';
import { HeadingTitle } from '@/components/Typography';
import type { CardPromotionProps } from '@/types/card';
import type { LinkProps } from '@/types/customLink';

const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('../../Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const CustomLink = dynamic<LinkProps>(() =>
  import('../../Link').then((mod) => mod.CustomLink)
);
function CardPromotion({ title, partner }: CardPromotionProps) {
  return (
    <div
      data-testid="item-promotion"
      className="relative min-h-[80px]
w-full rounded bg-[#FFE0EC] px-5 py-4"
    >
      <div className="flex flex-col md:flex-row">
        <HeadingTitle
          as="h3"
          fontWeight="bold"
          fontSize={{ base: 16, md: 22 }}
          color="#D61964"
          noOfLines={2}
          flex={1}
          paddingLeft={{ base: 0, md: '15px' }}
          alignItems="center"
          display="flex"
          data-testid="title-promotion"
        >
          {title}
        </HeadingTitle>
        <Grid
          flex={1}
          mt="12px"
          gap="6px"
          width="full"
          data-testid="list-partner"
        >
          {partner.map((item) => (
            <GridItem
              key={item.order_num}
              backgroundColor={{
                base: item?.partner?.color ?? 'transparent',
                md: 'transparent',
              }}
              borderColor={item?.partner?.color}
              borderWidth="1px"
              borderStyle="solid"
              borderRadius="4px"
              padding="6px"
              color={{ base: 'white', md: item?.partner?.color ?? 'black' }}
              as={CustomLink}
              href={item.url}
              data-testid="item-partner"
              target="_blank"
            >
              <div className="flex items-center justify-center gap-x-[8px]">
                <div className="relative h-7 w-7">
                  <ImageLoader
                    alt="Logo Partnet"
                    fill
                    src={item.partner.icon_url ?? ''}
                  />
                </div>
                <div>
                  <HeadingTitle
                    data-testid="title-partner"
                    as="h2"
                    fontWeight="bold"
                    fontSize={12}
                    noOfLines={1}
                  >{`Di ${item.partner.name}`}</HeadingTitle>
                </div>
              </div>
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
}
export { CardPromotion };
