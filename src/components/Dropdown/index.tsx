import type { PopoverContentProps } from '@chakra-ui/popover';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import type { PlacementWithLogical } from '@chakra-ui/popper';

export type DropdownProps = {
  trigger: React.ReactNode;
  content?: React.ReactNode;
  placement?: PlacementWithLogical;
  contentProps?: PopoverContentProps;
};

export const Dropdown = ({
  trigger,
  content,
  placement,
  contentProps,
}: DropdownProps) => {
  return (
    <Popover placement={placement}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        borderRadius="6px"
        boxShadow="0 6px 12px rgb(0 0 0 / 18%)"
        border="none"
        {...contentProps}
        data-testid="dropdown-content"
        _focusVisible={{
          boxShadow: '0 6px 12px rgb(0 0 0 / 18%)',
          outline: 'none',
        }}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};
