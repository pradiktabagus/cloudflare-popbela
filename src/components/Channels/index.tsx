import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  VStack,
  Wrap,
} from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import dynamic from 'next/dynamic';
import type { ImageProps } from 'next/image';

import type { LinkProps } from '@/types/customLink';

import type { ImageLoaderProps } from '../Images';

const DEFAULT_IMG_WIDTH = '143px';
const DEFAULT_IMG_HEIGHT = '41px';
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
type ChannelProps = {
  link: string;
  image: Pick<ImageProps, 'width' | 'height' | 'src' | 'alt' | 'style'>;
  amp_width?: string;
  amp_height?: string;
  target?: '_blank' | '_self' | string;
};

const Channel: React.FC<ChannelProps> = ({ link, image, target }) => {
  return (
    <Box
      position="relative"
      width={image.width || DEFAULT_IMG_WIDTH}
      height={image.height || DEFAULT_IMG_HEIGHT}
      style={image.style}
    >
      <CustomLink href={link} className={`relative contents`} target={target}>
        <ImageLoader
          src={image.src}
          noLoader={false}
          alt={image.alt}
          width={400}
          height={300}
          className="h-[inherit] object-contain"
          loading="lazy"
          sizes="33vh"
        />
      </CustomLink>
    </Box>
  );
};

const listChannel: ChannelProps[] = [
  // Tier 1
  {
    link: 'https://www.idn.app/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-7-8e9dae8304c585001e8f5219c936b169.png',
      alt: 'IDN',
      width: '9',
    },
    amp_width: '50',
    target: '_blank',
  },
  {
    link: 'https://www.idntimes.com',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-6-1fbd1931b9b9a5b6d9e053b903f5bf8e.png',
      alt: 'IDN Times',
      width: '24',
    },
    amp_width: '120',
    target: '_blank',
  },
  {
    link: 'https://www.popbela.com',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-8-68d2de2097b02a91ac02e655b7dbf77b.png',
      alt: 'Popbela',
      width: '28',
    },
    amp_width: '120',
    target: '_blank',
  },
  {
    link: 'https://www.popmama.com',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-9-bfa63fd9408b49ebf09867bcb357aa42.png',
      alt: 'Popmama',
      width: '24',
    },
    amp_width: '120',
    target: '_blank',
  },
  {
    link: 'https://www.yummy.co.id/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-10-db3165c31e213550c8abbd182cc3a770.png',
      alt: 'Yummy',
      width: '12',
    },
    amp_width: '60',
    amp_height: '30',
    target: '_blank',
  },
  {
    link: 'http://www.fortuneidn.com/',
    image: {
      src: 'https://image.fortuneidn.com/logo/fortune_logo.png?format=webp&width=114&height=38',
      alt: 'Fortuneidn',
      width: '16',
    },
    target: '_blank',
    amp_width: '60',
  },
  {
    link: 'https://ggwp.id/media',
    image: {
      src: 'https://image.popbela.com/content-images/post/20231017/image-58-2cfe1333f557c283a705400ad0b7a5ed.png',
      alt: 'GGWP',
      width: '16',
    },
    target: '_blank',
    amp_width: '100',
  },
  {
    link: 'http://duniaku.com/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-13-5a1b635ca68cb810a940e526b1a06ea2.png',
      alt: 'Duniaku',
      width: '16',
    },
    amp_width: '100',
    target: '_blank',
  }, // End Of Tier 1
  {
    // Tier 2
    link: 'https://www.idn.media/Products',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-14-994e862d74d10fe486c5d0e363d7e040.png',
      alt: 'IDN Creator Network',
      width: '36',
    },
    amp_width: '120',
    target: '_blank',
  },
  {
    link: 'https://www.ice.id/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-15-f11ba793e64b64d23205b254e78b0812.png',
      alt: 'ICE',
      width: '12',
    },
    amp_width: '55',
    amp_height: '30',
    target: '_blank',
  },
  {
    link: 'https://www.morf.id/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230712/image-37-54766e795ce3a7c4ff34431b9662b5e1.png',
      alt: 'morf',
      width: '20',
    },
    amp_width: '80',
    amp_height: '50',
    target: '_blank',
  },
  {
    link: 'https://saweria.co/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230830/image-50-806cd642af477cbe0333179c08dfa354.png',
      alt: 'saweria',
      width: 65,
      height: 45,
    },
    amp_width: '80',
    amp_height: '50',
    target: '_blank',
  },

  {
    link: 'https://www.idn.media/Products',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-16-12a6af27ff8e8940eb1b115e76dfa8d1.png',
      alt: 'IDN Event',
      width: '24',
    },
    amp_width: '90',
    target: '_blank',
  },
  {
    link: 'https://www.idn.media/Products',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-27-8786fb790b67c4e9d1bf43e2b706f029.png',
      alt: 'Bluebird IDN OOH',
      width: '40',
    },
    amp_width: '120',
    target: '_blank',
  },
  {
    link: 'https://www.idn.media/Products',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-17-7c18e2f47c9a826d61f0b351cdad4dc6.png',
      alt: 'IDN Pictures',
      width: '32',
    },
    amp_width: '120',
    target: '_blank',
  },
  {
    link: 'https://www.idn.media/Products',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-20-4bf868fc0dfdd3e1888f3678a4eaa062.png',
      alt: 'IDN Foundation',
      width: '36',
    },
    amp_width: '130',
    target: '_blank',
  },
  {
    link: 'https://jkt48.com/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-21-94decb90180b4d5777db9e2d26ecd53e.png',
      alt: 'JKT48',
      width: '10',
      height: '16',
    },
    amp_width: '40',
    amp_height: '80',
    target: '_blank',
  },

  {
    link: 'https://research.idntimes.com/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-29-919255b42081d53669e76a3c8a02d431.png',
      alt: 'IDN Research Institute',
      width: '40',
    },
    amp_width: '160',
    amp_height: '20',
    target: '_blank',
  }, // End of Tier 2
  {
    // Tier 3
    link: 'https://www.imgs.idntimes.com/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-23-c85bd6b2d96134730aabf92dd477dd6d.png',
      alt: 'Indonesia Millennial and Gen Z Summit',
      width: '12',
    },
    amp_width: '60',
    amp_height: '35',
    target: '_blank',
  },
  {
    link: 'https://www.fortunesummit.fortuneidn.com/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-24-cbc86e07efb3c8170ec88d48a772526c.png',
      alt: 'FORTUNE Indonesia Summit',
      width: '10',
    },
    amp_width: '60',
    amp_height: '35',
    target: '_blank',
  },
  {
    link: 'https://beautyfestasia.popbela.com/',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-25-1bac60854c479092fbfcd4c18b0b771c.png',
      alt: 'Beautyfest Asia',
      width: '12',
    },
    amp_width: '60',
    amp_height: '35',
    target: '_blank',
  },
  {
    link: 'https://www.idn.media/Products',
    image: {
      src: 'https://image.popbela.com/content-images/post/20230216/image-26-e683aedce85b7af03a039d07c46da6f6.png',
      alt: 'Indonesia Memasak by Yummy',
      width: '12',
    },
    amp_width: '60',
    amp_height: '35',
    target: '_blank',
  },
];

export const Channels = () => {
  const [isMobile] = useMediaQuery('(max-width: 767px)');

  const renderDivider = () => <Divider borderBottomColor="blackAlpha.500" />;

  return (
    <VStack justifyContent="center" data-testid="channels">
      <Flex
        w="full"
        alignItems="baseline"
        justifyContent="center"
        py={isMobile ? '0' : '10px'}
        px={'10px'}
      >
        {!isMobile && renderDivider()}
        <Heading
          fontFamily="futuraTemeed"
          fontSize="24px"
          fontWeight="700"
          color="primary"
          mb="5px"
          mx="15px"
          as="div"
        >
          CHANNELS
        </Heading>
        {!isMobile && renderDivider()}
      </Flex>
      {isMobile && <Divider borderBottomColor="blackAlpha.500" />}
      <Grid
        templateColumns={
          isMobile
            ? ['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)']
            : 'repeat(1, 1fr)'
        }
        columnGap={isMobile ? '0' : '30px'}
        alignItems="flex-start"
        w="full"
        px="10px"
        maxW="full"
      >
        <Grid>
          {/* Tier 1 */}
          <Box flexWrap="wrap" gap={2} my={2} display="flex">
            {listChannel.slice(0, 8).map((channel) => (
              <Channel
                key={channel.link + channel.image.src}
                link={channel.link}
                image={{
                  ...channel.image,
                  width: channel?.image?.width ?? 20,
                  height: channel?.image?.height ?? 6,
                }}
                target={channel.target}
              />
            ))}
          </Box>
          {renderDivider()}
          {/* Tier 2 */}
          <Box
            flexWrap="wrap"
            gap={3}
            my={2}
            display="flex"
            alignItems="center"
          >
            {listChannel.slice(8, 18).map((channel) => (
              <Channel
                key={channel.link + channel.image.src}
                link={channel.link}
                image={{
                  ...channel.image,
                  width: channel?.image?.width ?? 20,
                  height: channel?.image?.height ?? 5,
                }}
                target={channel.target}
              />
            ))}
          </Box>
          {renderDivider()}
          {/* Tier 3 */}
          <Wrap gap={2} my={2} display="flex">
            {listChannel.slice(18, listChannel.length).map((channel) => (
              <Channel
                key={channel.link + channel.image.src}
                link={channel.link}
                image={{
                  ...channel.image,
                  width: channel?.image?.width ?? 20,
                  height: channel?.image?.height ?? 10,
                }}
                target={channel.target}
              />
            ))}
          </Wrap>
        </Grid>
      </Grid>
    </VStack>
  );
};

// Channels for AMP
export const ChannelsAmp = (): JSX.Element => {
  const ampChannelsStyle = `
    .channels-heading {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .channels-list {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      padding: 12px;
    }
    .channels-heading {
      display: flex;
      justify-content: center;
    }

    .channel-link {
      position: relative;
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    amp-img.contain img {
      object-fit: contain;
    }
    .channels-title {
      font-family: futuraTemeed;
      font-size: 24px;
      font-weight: 700;
      color: #d72772;
    }
    .divider {
      height: 1px;
      margin-top: 10px;
      margin-bottom: 10px;
      background: #d72772;
    }
  `;
  return (
    <div data-testid="channels-amp">
      <style jsx>{ampChannelsStyle}</style>
      <div className="channels-heading">
        <h2 className="channels-title">CHANNELS</h2>
      </div>
      <div className="channels-list">
        {listChannel.slice(0, 8).map((channel) => (
          <a
            key={channel.link}
            href={channel.link}
            className="channel-link"
            style={{
              width: `${channel.amp_width}px`,
              height: `${channel.amp_height ?? '20'}px`,
            }}
          >
            <amp-img
              key={channel.link}
              layout="fill"
              className="contain"
              alt={channel?.image.alt}
              src={channel.image.src}
            ></amp-img>
          </a>
        ))}
      </div>
      <div className="divider" />
      <div className="channels-list">
        {listChannel.slice(8, 18).map((channel) => (
          <a
            key={channel.link}
            href={channel.link}
            className="channel-link"
            style={{
              width: `${channel.amp_width}px`,
              height: `${channel.amp_height ?? '20'}px`,
            }}
          >
            <amp-img
              key={channel.link}
              src={channel.image.src}
              alt={channel?.image.alt}
              className="contain"
              layout="fill"
            ></amp-img>
          </a>
        ))}
      </div>
      <div className="divider" />
      <div className="channels-list">
        {listChannel.slice(18, listChannel.length).map((channel) => (
          <a
            key={channel.link}
            href={channel.link}
            style={{
              width: `${channel.amp_width}px`,
              height: `${channel.amp_height ?? '20'}px`,
            }}
            className="channel-link"
          >
            <amp-img
              key={channel.link}
              src={channel.image.src}
              alt={channel?.image.alt}
              className="contain"
              layout="fill"
            ></amp-img>
          </a>
        ))}
      </div>
    </div>
  );
};
