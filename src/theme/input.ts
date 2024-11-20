import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
  },
})

const variants = {
  filled: definePartsStyle({
    field: {
      _focus: {
        borderColor: 'blue.500',
      },
    },
  }),
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
}) 