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

import { CustomLink } from '@/components/Link';

import type { ShareSocialProps } from '../Floating';

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
export type ShareDetailArticleProps = {
  article: {
    title: string;
    url: string;
    excerpt: string;
  };
  variant?: 'quiz' | string;
};
const oneLinkText =
  '\r\n\r\n' +
  'Yuk download IDN App untuk baca berita dengan loading lebih cepat dan kuota lebih hemat Android/iOS:' +
  '\r\n' +
  'https://idn.onelink.me/VKUf/6dfe48a3';
export const ShareDetail = ({
  article: { title, url, excerpt },
  variant,
}: ShareDetailArticleProps) => {
  const getUTM = (platform: string) =>
    `utm_source=${platform}&amp;utm_medium=sharer&amp;utm_campaign=social`;
  return (
    <Wrap data-testid="share-result">
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
      {variant !== 'quiz' && (
        <>
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
        </>
      )}
    </Wrap>
  );
};

export const ShareDetailAmp = ({
  article: { title, url },
}: ShareSocialProps) => {
  return (
    <div className="share-detail-amp">
      <ul className="share-detail-wrap">
        <li className="share-item">
          <amp-social-share
            width="50"
            height="40"
            type="facebook"
            data-param-app_id={process.env.facebook_app_id}
            data-param-href={`${url}?utm_source=facebook&amp;utm_medium=sharer&amp;utm_campaign=social`}
            data-param-quote={title}
          ></amp-social-share>
        </li>
        <li className="share-item">
          <amp-social-share
            width="50"
            height="40"
            type="twitter"
            data-param-href={`${url}?utm_source=twitter&amp;utm_medium=sharer&amp;utm_campaign=social`}
            data-param-text={title}
          ></amp-social-share>
        </li>
        <li className="share-item">
          <amp-social-share
            width="50"
            height="40"
            type="pinterest"
            data-param-href={`${url}?utm_source=pinterest&amp;utm_medium=sharer&amp;utm_campaign=social`}
            data-param-text={title}
          ></amp-social-share>
        </li>
        <li className="share-item">
          <amp-social-share
            width="50"
            height="40"
            type="linkedin"
            data-param-text={title}
            data-param-url={`https://www.linkedin.com/shareArticle?mini=true&url=${url}?title=${title}&source=popbela&utm_source=linkedin&amp;utm_medium=sharer&amp;utm_campaign=social`}
          ></amp-social-share>
        </li>
      </ul>
      <style jsx>{`
        .share-detail-amp {
          overflow: hidden;
        }
        .share-detail-wrap {
          --chakra-wrap-x-spacing: 4px;
          --chakra-wrap-y-spacing: 4px;
          --wrap-x-spacing: calc(var(--chakra-wrap-x-spacing) / 2);
          --wrap-y-spacing: calc(var(--chakra-wrap-y-spacing) / 2);
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex-wrap: wrap;
          -webkit-flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          list-style-type: none;
          padding: 0px;
          margin: calc(var(--wrap-y-spacing) * -1)
            calc(var(--wrap-x-spacing) * -1);
        }
        .share-detail-wrap > *:not(style) {
          margin: var(--wrap-y-spacing) var(--wrap-x-spacing);
        }
        .share-item {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: flex-start;
          -webkit-box-align: flex-start;
          -ms-flex-align: flex-start;
          align-items: flex-start;
        }
      `}</style>
    </div>
  );
};
