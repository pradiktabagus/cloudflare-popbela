import { extendTheme } from '@chakra-ui/theme-utils';

export const theme = extendTheme({
  colors: {
    brand: {},
  },
  styles: {
    global: () => ({
      body: {
        bg: '#fff',
      },
    }),
  },
});
