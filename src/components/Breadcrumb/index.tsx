import type { BreadcrumbProps as ChakraBreadcrumbProps } from '@chakra-ui/breadcrumb';
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/breadcrumb';
import { Box, Text } from '@chakra-ui/layout';
import Link from 'next/link';

import { IconFaAngleRight } from '../Icon/FaAngleRight';

const IconSeparator = () => (
  <Box verticalAlign="middle">
    <Box color="#ccc">
      <IconFaAngleRight height={16} width={16} />
    </Box>
  </Box>
);

type CommonPath = {
  title: string;
  hasLink?: boolean;
};

type PathLink = {
  link: string;
  isCurrentPage?: never;
};

type PathCurrent = {
  isCurrentPage: boolean;
  link?: never;
};

export type BreadcrumbProps = {
  paths: Array<CommonPath & (PathLink | PathCurrent)>;
  activeColor?: string;
} & ChakraBreadcrumbProps;

export const Breadcrumb = ({
  paths,
  activeColor = 'primary',
  ...breadcrumbProps
}: BreadcrumbProps) => {
  return (
    <ChakraBreadcrumb
      data-testid="breadcrumb"
      spacing="5px"
      separator={<IconSeparator />}
      fontSize="15px"
      fontFamily="limerick"
      fontWeight="700"
      {...breadcrumbProps}
    >
      {paths.map((path, index) => {
        const isCurrentPage = path.isCurrentPage || index === paths.length - 1;
        return (
          <BreadcrumbItem
            key={path.title + (path.link ?? '')}
            color={isCurrentPage ? activeColor : '#373737'}
            cursor="default"
            _hover={{
              color: isCurrentPage ? '' : activeColor,
            }}
          >
            {!isCurrentPage || path.hasLink ? (
              <BreadcrumbLink href={path.link} as={Link} cursor="default">
                {path.title}
              </BreadcrumbLink>
            ) : (
              <Text>{path.title}</Text>
            )}
          </BreadcrumbItem>
        );
      })}
    </ChakraBreadcrumb>
  );
};

type Category = {
  name: string;
  categoryUrl: string;
};

type Article = {
  title: string;
  category: Category;
  subCategory: Category;
};

type ArticleBreadcrumbProps = {
  article: Article;
};

export const ArticleBreadcrumb = ({ article }: ArticleBreadcrumbProps) => {
  return (
    <Breadcrumb
      paths={[
        { title: 'Home', link: '/' },
        { title: article.category.name, link: article.category.categoryUrl },
        {
          title: article.subCategory.name,
          link: article.subCategory.categoryUrl,
        },
        { title: article.title, isCurrentPage: true },
      ]}
    />
  );
};
