import { Box } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

import type { HeadingVariantProps } from '@/components';
import type { DeviceViewProps } from '@/types';
import type { ArticleProps } from '@/types/article';

import type {
  HeaderArticleZodiacData,
  TExcerptZodiac,
} from '../HeaderArticleZodiac';

const Article = dynamic<ArticleProps>(() =>
  import('@/components/Article').then((cmp) => cmp.Article)
);
const ExcerptZodiac = dynamic<TExcerptZodiac>(
  () => import('../HeaderArticleZodiac')
);
const HeadingVariant = dynamic<HeadingVariantProps>(() =>
  import('@/components/Typography/Heading/HeadingVariant').then(
    (mod) => mod.HeadingVariant
  )
);
export type TSectionZodiacMingguIni = HeaderArticleZodiacData & {
  description?: string;
} & DeviceViewProps;
const SectionZodiacMingguIni = ({
  name,
  iconSrc,
  rangeTime,
  excerpt,
  description,
  isDesktop,
}: TSectionZodiacMingguIni) => {
  return (
    <Box
      as="section"
      width="inherit"
      position="relative"
      data-testid="section-zodiac-minggu-ini"
    >
      <HeadingVariant
        data-testid="title-section-now-on-popbela"
        variant="section"
        fontSize={isDesktop ? '36px' : '24px'}
        marginBottom={isDesktop ? '20px' : '15px'}
        display="flex"
        overflow="hidden"
        alignItems="baseline"
        textAlign={isDesktop ? 'left' : 'center'}
        _before={{
          content: isDesktop ? 'none' : '""',
          position: 'relative',
          flexGrow: 1,
          background: '#bbb',
          lineHeight: 0,
          height: '1px',
          right: '.5rem',
          width: 'auto',
          display: 'inline-block',
        }}
        _after={{
          content: '""',
          position: 'relative',
          left: '.5rem',
          flexGrow: 1,
          background: '#bbb',
          lineHeight: 0,
          height: '1px',
          width: 'auto',
          display: 'inline-block',
        }}
      >
        Zodiac Minggu Ini
      </HeadingVariant>
      <article>
        <ExcerptZodiac
          isDesktop={isDesktop}
          marginBottom="30px"
          data={{
            name,
            iconSrc,
            rangeTime,
            excerpt,
          }}
        />
        <Article
          variant="horoscope"
          data={{
            description,
          }}
        />
      </article>
    </Box>
  );
};
export default SectionZodiacMingguIni;
