import { Box, Divider, Flex, Heading } from '@chakra-ui/layout';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { ImageLoaderProps, ModalProps } from '@/components';

const ModalSearch = dynamic<ModalProps>(() =>
  import('@/components/Modal').then((mod) => mod.Modal)
);
const Image = dynamic<ImageLoaderProps>(() =>
  import('@/components/Images/ImageLoader').then((mod) => mod.ImageLoader)
);
export type TWarningAdult = {
  adult_content?: boolean;
};
const Content = ({
  setVisible,
  push,
}: {
  setVisible: (e: boolean) => void;
  push: (e: string) => void;
}) => (
  <Box
    width="90%"
    maxW="598px"
    maxH="867px"
    bg="white"
    position="relative"
    margin="0 auto"
  >
    <Box position="relative" width="100%" height="140px">
      <Image
        src="/v3/assets/images/global/mature.png"
        alt="adult"
        loading="lazy"
        fill
      />
    </Box>
    <Box
      position="relative"
      width="110px"
      height="25.63px"
      margin="0 auto"
      marginTop="20px"
      marginBottom="40px"
    >
      <Image
        src="/v3/assets/images/global/logo.png"
        loading="lazy"
        alt="popbela"
        fill
      />
    </Box>
    <Box textAlign="center" marginBottom="30px">
      <Heading
        as="h4"
        fontWeight="600"
        fontSize="24px"
        fontFamily="limerick"
        color="#000"
      >
        Oooops! Konten Dewasa
      </Heading>
      <Heading
        as="h4"
        fontWeight="400"
        fontSize="18px"
        fontFamily="limerick"
        color="#000"
        marginY="10px"
      >
        Kamu Sudah Cukup Umur?
      </Heading>
    </Box>
    <Divider
      orientation="horizontal"
      height="1px"
      margin="0 auto"
      marginBottom="30px"
      width="220px"
      bg="#616161"
    />
    <Box display="flex" justifyContent="center" marginBottom="30px">
      <Flex flexDirection="row" gap="15px">
        <button
          onClick={() => push('/')}
          type="button"
          className={clsx(
            'z-[1] w-16 px-2 py-1',
            'bg-white text-xl text-[#484C4E]',
            'rounded-none border-[1px] border-solid border-[#000] capitalize outline-none'
          )}
        >
          Belum
        </button>
        <button
          onClick={() => setVisible(false)}
          type="button"
          className={clsx(
            'z-[1] w-16 px-2 py-1',
            'bg-primary text-xl text-white ',
            'rounded-none border-none capitalize outline-none'
          )}
        >
          Sudah
        </button>
      </Flex>
    </Box>
  </Box>
);
export default function Index({ adult_content = false }: TWarningAdult) {
  const [visible, setVisible] = useState<boolean>(false);
  const { push, query } = useRouter();
  const { slug } = query;
  useEffect(() => {
    setVisible(adult_content);
    return () => {
      setVisible(false);
    };
  }, [adult_content, slug]);
  return (
    <ModalSearch
      bgOverlay="blackAlpha.900"
      isOpen={visible}
      content={
        <Content setVisible={(e: boolean) => setVisible(e)} push={push} />
      }
    />
  );
}
