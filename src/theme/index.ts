import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { modalTheme } from './modal'
import { buttonTheme } from './button'
import { inputTheme } from './input'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  cssVarPrefix: 'awe',
  disableTransitionOnChange: true,
}

const theme = extendTheme({
  config,
  components: {
    Modal: modalTheme,
    Button: buttonTheme,
    Input: inputTheme,
    // Disable unused components
    Drawer: { enabled: false },
    Popover: { enabled: false },
    Tooltip: { enabled: false },
  },
})

export default theme 