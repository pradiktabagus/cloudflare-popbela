import { Box, Center, Flex, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';

import { ShareDetail } from '@/components/Share';
import type { IDataFinalResult } from '@/types/responses/pages/detail-article';
import { hostNameOrigin } from '@/utils/hostnameOrigin';

import type { ImageLoaderProps } from '../../../Images';
import style from './result.module.scss';

const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('../../../Images').then((mod) => mod.ImageLoader)
);

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);

export type TResultModal = {
  closeModal: () => void;
  data?: IDataFinalResult;
  title: string;
  article_url: string;
  excerpt: string;
};
const Index = ({
  closeModal,
  data,
  title,
  article_url,
  excerpt,
}: TResultModal) => {
  return (
    <div className="relative mx-auto my-0 max-h-[calc(100vh_-_60px)] w-full max-w-[calc(100vw_-_60px)] rounded bg-white p-4 text-black">
      <button
        onClick={closeModal}
        type="button"
        className="absolute -right-4 -top-4 h-7 w-7 rounded-full bg-primary font-bahijMitra text-white focus-visible:border-primary"
      >
        X
      </button>
      <div className="max-h-[calc(100vh_-_100px)] overflow-auto">
        <h3
          data-testid="title-quiz"
          className="mb-7 mt-4 block text-center font-limerick text-3xl font-semibold"
        >
          Hasil kuismu
        </h3>
        <div className="relative h-[280px] w-full" data-testid="image-result">
          <ImageLoader
            fill
            src={data?.image ?? ''}
            loading="lazy"
            alt="result"
            className="object-contain"
          />
        </div>
        <div
          data-testid="result-content"
          className={style['quiz-result']}
          dangerouslySetInnerHTML={{
            __html: data?.description ?? '<></>',
          }}
        />
        <div className="my-5">
          <Center data-testid="share-article">
            <Wrap flexDirection="column">
              <WrapItem
                display="flex"
                alignItems="center"
                width={{ base: '100%', lg: 'auto' }}
                justifyContent="center"
              >
                <Flex alignItems="baseline" gap="5px" flexDirection="row">
                  <Box width="18px" height="18px">
                    <FontAwesomeIcon icon={faShareAlt} fontSize="18px" />
                  </Box>
                  <Text fontSize="22px" fontWeight="700" color="title">
                    Share Artikel
                  </Text>
                </Flex>
              </WrapItem>
              <WrapItem
                width={{ base: '100%', lg: 'auto' }}
                justifyContent="center"
              >
                <ShareDetail
                  variant="quiz"
                  article={{
                    title,
                    url: hostNameOrigin() + article_url,
                    excerpt: excerpt ?? '',
                  }}
                />
              </WrapItem>
            </Wrap>
          </Center>
        </div>
        <div className="flex">
          <button
            data-testid="btn-play-quiz"
            className="mx-auto my-0 rounded-md bg-primary px-4 py-2 font-bahijMitra text-xl uppercase text-white"
            type="button"
            onClick={closeModal}
          >
            Play quiz again
          </button>
        </div>
      </div>
    </div>
  );
};
export default Index;
