import { extendTheme, ThemeConfig, theme as baseTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  cssVarPrefix: 'awe',
  disableTransitionOnChange: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
  components: {
    Drawer: { enabled: false },
    Popover: { enabled: false },
    Tooltip: { enabled: false },
  },
});

export default theme;