import { extendTheme } from '@chakra-ui/theme-utils';

const theme = extendTheme({
  fonts: {
    bahijMitra: 'BahijMitra, sans-serif',
    futuraBook: 'FuturaBook, sans-serif',
    futuraTemeed: 'FuturaTemeed, sans-serif',
    limerick: 'Limerick, sans-serif',
    limerickMedium: 'LimerickMedium, sans-serif',
  },
  colors: {
    primary: '#d72772',
    primaryDark: '#a81654',
    secondary: '#484C4E',
    title: '#333',
    horoscopeDetail: '#616161',
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
    sm2: '525px',
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        fontFamily: 'bahijmitra',
        bg: '#fff',
      },
      '@media screen and (min-width: 1024px)': {
        body: {
          bg: '#f9f9f9',
        },
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
