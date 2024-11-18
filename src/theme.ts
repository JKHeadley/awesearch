import { extendTheme, ThemeConfig } from '@chakra-ui/react';

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
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        primary: {
          bg: 'blue.500',
          color: 'white',
          _hover: { bg: 'blue.600' },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: 'md',
          boxShadow: 'lg',
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            _focus: {
              borderColor: 'blue.500',
            },
          },
        },
      },
    },
    Drawer: { enabled: false },
    Popover: { enabled: false },
    Tooltip: { enabled: false },
  },
});

export default theme;