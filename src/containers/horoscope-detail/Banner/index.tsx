import type { ContainerProps } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { GridListHoroscopesProps } from '@/components';

export type BannerProps = {
  srcBg: string;
  srcBgMobile?: string;
  containerProps?: ContainerProps;
};

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const GridListHoroscopes = dynamic<GridListHoroscopesProps>(() =>
  import('@/components/GridListHoroscopes').then(
    (mod) => mod.GridListHoroscopes
  )
);

const Banner: React.FC<BannerProps> = ({
  srcBg,
  srcBgMobile,
  containerProps,
}) => {
  const router = useRouter();
  const [visibleChooseZodiac, setVisibleChooseZodiac] = useState(false);
  useEffect(() => {
    setVisibleChooseZodiac(false);
    return () => {
      setVisibleChooseZodiac(false);
    };
  }, [router.query]);
  return (
    <ContainerSection
      h="120px"
      w="full"
      borderRadius="15px"
      pos="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPos="center"
      bgImage={srcBgMobile ? [srcBgMobile, srcBgMobile, srcBg] : srcBg}
      data-testid="banner"
      {...containerProps}
    >
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setVisibleChooseZodiac((prev) => !prev)}
          >
            Choose another zodiac
            <Box
              as={FontAwesomeIcon}
              icon={faCaretUp}
              boxSize={'16px'}
              marginLeft="15px"
            />
          </button>
        </div>
        <div
          className={`ring-opacity-/5 absolute bottom-12 right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-slate-200 focus:outline-none ${
            visibleChooseZodiac ? 'block' : 'hidden'
          }`}
        >
          <GridListHoroscopes
            as="grid"
            iconProps={{ boxSize: '20px' }}
            nameProps={{ fontSize: '11pt' }}
            gridProps={{ p: '10px', gap: '20px' }}
          />
        </div>
      </div>
    </ContainerSection>
  );
};
export default Banner;
