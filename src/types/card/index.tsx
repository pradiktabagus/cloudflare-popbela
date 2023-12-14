import type { BoxProps, HeadingProps } from '@chakra-ui/layout';
import type React from 'react';

import type {
  AuthorArticle,
  CoverArticle,
  SubCategoryArticle,
} from '@/types/article';

import type { IProduct } from '../responses/components/promotion-tag';
import type { CategoryNowOnPopbela } from '../section/now-on-popbela';

type DataCard = {
  src?: string | any;
  blurSrc?: string | any;
  title?: string | any;
  category?: string | any;
  date?: string | any;
  author?: string | any;
  url?: string | any;
  text?: string | any;
};
export type CardProps = BoxProps & {
  background?: 'white' | 'black' | 'inherite' | string; // Background pada card
  heightimg?: string | number; // height image
  widthimg?: string | number; // width image
  paddingdesc?: string | number; // Padding yang terdapat pada container deskripsi
  titlecolor?: string; // Warna judul artikel
  data: DataCard; // Data yang akan di tampilkan pada card
  priorityImg?: boolean; // Priority rendering;
  loadingImg?: 'lazy' | 'eager'; // type renderin
};
export type CardNowOnPopbelaProps = Omit<CardProps, 'data'> & {
  data: CategoryNowOnPopbela;
};
export type ZodiacData = {
  rangetime: string;
  imgsrc: string;
  name: string;
  url: string;
};

export type CardPromotionProps = {
  title: string;
  partner: IProduct[];
};

export type DataCardLandscapeProps = {
  sub_category?: SubCategoryArticle;
  title?: string | any;
  author?: AuthorArticle;
  cover?: CoverArticle;
  release_date?: number | any;
  article_url?: string | any;
  article_url_amp?: string | any;
};

export type CardOptionProps = {
  headingType?: 'h2' | 'h3';
  leftTag?: React.ReactNode;
} & CardLandscapeProps;

export type CardLandscapeProps = Omit<CardProps, 'data'> & {
  data: DataCardLandscapeProps;
  type?: 'author' | 'popcreators' | 'cross-publisher';
  csc?: boolean;
  widthSponsored?: string | number;
  heightSponsored?: string | number;
  titleProps?: HeadingProps;
  isDesktop?: boolean;
  trackerCallbacks?: ((e: any) => void) | undefined;
  isLeftTag?: boolean;
  leftTagSrc?: string;
  newBlank?: boolean;
};
