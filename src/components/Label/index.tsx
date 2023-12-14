import { Box, Wrap, WrapItem } from '@chakra-ui/layout';

import { CustomLink } from '@/components/Link';
import type { LabelProps, LabelsProps } from '@/types/label';

export function Label({
  title,
  path,
  bgColor = 'primary',
  _hover,
  color = 'white',
  ...boxProps
}: LabelProps) {
  const renderBox = () => (
    <Box
      bgColor={bgColor}
      color={color}
      borderRadius=".25em"
      fontWeight="400"
      padding={{ base: '4.5px 7px', md: '7px' }}
      display="inline-block"
      fontSize={{ base: '16.5px', md: '18px' }}
      lineHeight="1"
      title={title}
      data-testid="label-item"
      _hover={_hover || { bgColor: 'primaryDark' }}
      {...boxProps}
    >
      {title}
    </Box>
  );

  return path ? (
    <CustomLink href={path}>{renderBox()}</CustomLink>
  ) : (
    renderBox()
  );
}

export function Labels({
  paths,
  labelBgColor,
  labelProps,
  spacing,
  color,
  _hover,
  ...wrapperProps
}: LabelsProps) {
  return (
    <Wrap spacing={spacing} {...wrapperProps} data-testid="label-container">
      {paths.map((path) => (
        <WrapItem key={path.title + path.path}>
          <Label
            bgColor={labelBgColor}
            color={color}
            _hover={_hover}
            {...path}
            {...labelProps}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
}
