import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const baseStyle = definePartsStyle({
  dialog: {
    borderRadius: 'md',
    boxShadow: 'lg',
  },
})

export const modalTheme = defineMultiStyleConfig({ baseStyle }) 