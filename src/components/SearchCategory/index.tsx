import type { BoxProps } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';

import { CustomLink } from '@/components/Link';
import type { Category } from '@/types/category';

export type SearchCategoryProps = BoxProps & {
  listcategory: Category[];
};
type ItemCategoryProps = {
  children: React.ReactNode;
  path: string;
};

const ItemCategory = ({ children, path }: ItemCategoryProps) => {
  return (
    <div data-testid="item-category">
      <CustomLink
        href={path}
        className="block p-[5px] text-base uppercase text-title"
      >
        {children}
      </CustomLink>
    </div>
  );
};
export const SearchCategory = (props: SearchCategoryProps) => {
  const { width = 'full', listcategory, ...boxProps } = props;
  return (
    <Box
      data-testid="search-category"
      width={width}
      height="auto"
      position="relative"
      {...boxProps}
    >
      <Box
        textAlign="center"
        fontSize="18px"
        color="secondary"
        paddingBottom="20px"
      >
        You can find related articles here
      </Box>
      <Box width="full">
        <ul
          data-testid="list-category"
          className="flex flex-wrap justify-center text-center"
        >
          {listcategory?.map((item: Category, index: number) => (
            <ItemCategory key={index} path={item.category_url}>
              {item.name}
            </ItemCategory>
          ))}
        </ul>
      </Box>
    </Box>
  );
};
