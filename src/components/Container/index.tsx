import type { ContainerProps } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/layout';

export const ContainerSection = (props: ContainerProps) => {
  const { children, maxW = '1145px', px = '1rem', ...containerProps } = props;
  return (
    <Container maxW={maxW} px={px} {...containerProps}>
      {children}
    </Container>
  );
};
