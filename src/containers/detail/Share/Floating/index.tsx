import type { BoxProps } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import type { LayoutProps } from '@chakra-ui/styled-system';
import {
  faFacebook,
  faLine,
  faLinkedin,
  faTelegramPlane,
  faWhatsapp,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';

import type { DeviceViewProps } from '@/types';
import type { LinkProps } from '@/types/customLink';
import clsxm from '@/utils/clsxm';

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

type Article = {
  title: string;
  excerpt: string;
  url: string;
};

export type TShareSocial = DeviceViewProps & {
  article: Article;
  iconSize?: LayoutProps['boxSize'];
  linkClassname?: string;
} & BoxProps;

const DEFAULT_LINK_STYLE =
  'flex h-[36px] w-full flex-1 md:flex-none md:h-[54px] w-[60px] items-center justify-center text-white';

const FloatingShare = ({
  article: { title, url, excerpt },
  iconSize = ['19px', '19px', '30px'],
  linkClassname,
  isDesktop,
  ...boxProps
}: TShareSocial) => {
  const getUTM = (platform: string) =>
    `utm_source=${platform}&amp;utm_medium=sharer&amp;utm_campaign=social`;

  return (
    <Box
      position="fixed"
      right={0}
      top={isDesktop ? '50%' : 'unset'}
      transform={isDesktop ? 'translateY(-50%)' : 'none'}
      bottom={0}
      h={isDesktop ? 'min-content' : '36px'}
      w={isDesktop ? '60px' : 'full'}
      display="flex"
      flexDirection={isDesktop ? 'column' : 'row'}
      justifyContent="center"
      data-testid="share-social"
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="share-social"
      zIndex={9}
      {...boxProps}
    >
      <CustomLink
        className={clsxm(
          'facebook',
          DEFAULT_LINK_STYLE,
          'md:rounded-tl-[20px]',
          'bg-[#3b5998] hover:bg-[#8b9dc3]',
          linkClassname
        )}
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}?${getUTM(
          'facebook'
        )}`}
      >
        <Box as={FontAwesomeIcon} icon={faFacebook} boxSize={iconSize} />
      </CustomLink>
      {isDesktop && (
        <CustomLink
          className={clsxm(
            'linkdin',
            DEFAULT_LINK_STYLE,
            'bg-[#0077b5] hover:bg-[#02a0f5]',
            linkClassname
          )}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}?title=${title}&source=popbela&${getUTM(
            'linkedin'
          )}`}
        >
          <Box as={FontAwesomeIcon} icon={faLinkedin} boxSize={iconSize} />
        </CustomLink>
      )}
      <CustomLink
        className={clsxm(
          'twitter',
          DEFAULT_LINK_STYLE,
          'bg-[#000000] hover:bg-[#1f1f1f]',
          linkClassname
        )}
        href={`https://twitter.com/intent/tweet?url=${url}?text=${title}&via=popbela_com&related=popbela_com&${getUTM(
          'twitter'
        )}`}
      >
        <Box as={FontAwesomeIcon} icon={faXTwitter} boxSize={iconSize} />
      </CustomLink>
      <CustomLink
        className={clsxm(
          'whatsapp',
          DEFAULT_LINK_STYLE,
          'bg-[#25d366] hover:bg-[#2cf576]',
          linkClassname
        )}
        href={
          isDesktop
            ? `https://web.whatsapp.com/send?text=${url}?${getUTM('whatsapp')}`
            : `whatsapp://send?text=${url}?${getUTM('whatsapp')}`
        }
      >
        <Box as={FontAwesomeIcon} icon={faWhatsapp} boxSize={iconSize} />
      </CustomLink>
      <CustomLink
        className={clsxm(
          'telegram',
          DEFAULT_LINK_STYLE,
          'bg-[#33aade] hover:bg-[#39c2fd]',
          linkClassname
        )}
        href={`https://t.me/share/url?url=${url}?text=${encodeURI(
          `${title}\r\n\r\n${excerpt}${oneLinkText}`
        )}&${getUTM('telegram')}`}
      >
        <Box as={FontAwesomeIcon} icon={faTelegramPlane} boxSize={iconSize} />
      </CustomLink>
      <CustomLink
        className={clsxm(
          'line',
          DEFAULT_LINK_STYLE,
          'md:rounded-bl-[20px]',
          'bg-[#03c302] hover:bg-[#05f005]',
          linkClassname
        )}
        href={`https://social-plugins.line.me/lineit/share?url=${url}?${getUTM(
          'line'
        )}`}
      >
        <Box as={FontAwesomeIcon} icon={faLine} boxSize={iconSize} />
      </CustomLink>
    </Box>
  );
};

export default FloatingShare;
