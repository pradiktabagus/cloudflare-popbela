import type { ButtonProps } from '@chakra-ui/button';
import { Button } from '@chakra-ui/button';

const contentBeforeAfter = {
  position: 'absolute',
  top: 0,
  content: '""',
  bgImage: 'url(/v3/assets/images/global/icon-loadmore.png)',
  bgRepeat: 'no-repeat',
  bgSize: { base: 37, lg: 40 },
  margin: '-5px 0',
  display: 'inline-block',
  height: { base: '37px', lg: '40px' },
  width: { base: '37px', lg: '40px' },
};

const hoverFocusStyle = { bgColor: 'primary', color: 'white' };

function ButtonLoadMore({
  onClick,
  isLoading,
  className,
  ...props
}: Pick<ButtonProps, 'onClick' | 'className' | 'isLoading'>) {
  return (
    <Button
      size="sm"
      variant="outline"
      bgColor="white"
      color="#333"
      fontWeight="700"
      fontSize={{ base: '12px', lg: '14px' }}
      borderRadius="none"
      fontFamily="limerick"
      p="6px 14px"
      my="3px"
      _hover={hoverFocusStyle}
      _focus={hoverFocusStyle}
      _before={{
        ...contentBeforeAfter,
        left: '-27px',
        transform: 'rotate(-15deg)',
      }}
      _after={{
        ...contentBeforeAfter,
        right: '-27px',
        transform: 'rotate(15deg)',
      }}
      onClick={onClick}
      className={className}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'loading...' : 'LOAD MORE'}
    </Button>
  );
}
export { ButtonLoadMore };
