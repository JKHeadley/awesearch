import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
  fontWeight: 'semibold',
  borderRadius: 'md',
})

const sizes = {
  xl: defineStyle({
    h: '56px',
    fontSize: 'lg',
    px: '32px',
  }),
}

const variants = {
  primary: defineStyle({
    bg: 'blue.500',
    color: 'white',
    _hover: {
      bg: 'blue.600',
    },
  }),
}

export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
}) 