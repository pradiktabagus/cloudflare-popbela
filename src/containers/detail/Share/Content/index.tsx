import { Box, Wrap, WrapItem } from '@chakra-ui/layout';
import {
  faFacebookF,
  faLine,
  faTelegramPlane,
  faWhatsapp,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { isDesktop } from 'react-device-detect';

import type { LinkProps } from '@/types/customLink';

export type TShareDetailArticle = {
  article: {
    title: string;
    url: string;
    excerpt: string;
  };
};
const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const oneLinkText =
  '\r\n\r\n' +
  'Yuk download IDN App untuk baca berita dengan loading lebih cepat dan kuota lebih hemat Android/iOS:' +
  '\r\n' +
  'https://idn.onelink.me/VKUf/6dfe48a3';
const ContentShare = ({
  article: { title, url, excerpt },
}: TShareDetailArticle) => {
  const getUTM = (platform: string) =>
    `utm_source=${platform}&amp;utm_medium=sharer&amp;utm_campaign=social`;
  return (
    <Wrap>
      <WrapItem
        margin={0}
        width="54px"
        height="32px"
        position="relative"
        background="#3a559f"
        borderRadius="2px"
      >
        <CustomLink
          className="relative h-full w-full"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}?${getUTM(
            'facebook'
          )}`}
        >
          <Box
            data-testid="share-facebook"
            color="white"
            position="absolute"
            transform="translate(-50%, -50%)"
            top="50%"
            left="50%"
            as={FontAwesomeIcon}
            icon={faFacebookF}
            boxSize={'1.1rem'}
          ></Box>
        </CustomLink>
      </WrapItem>
      <WrapItem
        margin={0}
        width="54px"
        height="32px"
        position="relative"
        background="#000000"
        borderRadius="2px"
      >
        <CustomLink
          className="relative h-full w-full"
          href={`https://twitter.com/intent/tweet?url=${url}?text=${title}&via=popbela_com&related=popbela_com&${getUTM(
            'twitter'
          )}`}
        >
          <Box
            data-testid="share-x-twitter"
            color="white"
            position="absolute"
            transform="translate(-50%, -50%)"
            top="50%"
            left="50%"
            as={FontAwesomeIcon}
            icon={faXTwitter}
            boxSize={'1.1rem'}
          ></Box>
        </CustomLink>
      </WrapItem>
      <WrapItem
        display={{ base: 'inherit', lg: 'none' }}
        margin={0}
        width="54px"
        height="32px"
        position="relative"
        background="#86c747"
        borderRadius="2px"
      >
        <CustomLink
          className="relative h-full w-full"
          href={
            isDesktop
              ? `https://web.whatsapp.com/send?text=${url}?${getUTM(
                  'whatsapp'
                )}`
              : `whatsapp://send?text=${url}?${getUTM('whatsapp')}`
          }
        >
          <Box
            data-testid="share-whatsapp"
            color="white"
            position="absolute"
            transform="translate(-50%, -50%)"
            top="50%"
            left="50%"
            as={FontAwesomeIcon}
            icon={faWhatsapp}
            boxSize={'1.1rem'}
          ></Box>
        </CustomLink>
      </WrapItem>
      <WrapItem
        display={{ base: 'inherit', lg: 'none' }}
        margin={0}
        width="54px"
        height="32px"
        position="relative"
        background="#33aade"
        borderRadius="2px"
      >
        <CustomLink
          className="relative h-full w-full"
          href={`https://t.me/share/url?url=${url}?text=${encodeURI(
            `${title}\r\n\r\n${excerpt}${oneLinkText}`
          )}&${getUTM('telegram')}`}
        >
          <Box
            data-testid="share-telegram"
            color="white"
            position="absolute"
            transform="translate(-50%, -50%)"
            top="50%"
            left="50%"
            as={FontAwesomeIcon}
            icon={faTelegramPlane}
            boxSize={'1.1rem'}
          ></Box>
        </CustomLink>
      </WrapItem>
      <WrapItem
        display={{ base: 'inherit', lg: 'none' }}
        margin={0}
        width="54px"
        height="32px"
        position="relative"
        background="#54d057"
        borderRadius="2px"
      >
        <CustomLink
          className="relative h-full w-full"
          href={`https://social-plugins.line.me/lineit/share?url=${url}?${getUTM(
            'line'
          )}`}
        >
          <Box
            data-testid="share-line"
            color="white"
            position="absolute"
            transform="translate(-50%, -50%)"
            top="50%"
            left="50%"
            as={FontAwesomeIcon}
            icon={faLine}
            boxSize={'1.1rem'}
          ></Box>
        </CustomLink>
      </WrapItem>
    </Wrap>
  );
};

export default ContentShare;
