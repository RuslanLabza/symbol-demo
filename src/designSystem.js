'use strict'

import { DEFAULT_ICONS } from '@symbo.ls/default-icons'

/**
 * Colors
 * @tutorial https://docs.symbols.app/color
 */
const COLOR = {
  transparent: 'transparent',
  black: 'black',
  white: 'white',
  orange: '#E98232'
}

/**
 * Gradients
 * @tutorial https://docs.symbols.app/color
 */
const GRADIENT = {}

/**
 * Themes
 * @tutorial https://docs.symbols.app/theme
 */
const THEME = {
  document: {
    '@dark': {
      color: 'white',
      background: 'black'
    },
    '@light': {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'black'
    },
    '@midnight': {
      background: '#112233',
      color: 'white'
    }
  }
}

/**
 * Fonts
 * @tutorial https://docs.symbols.app/font
 */
const FONT = {
  base: {
    fontFamily: "Europa, 'Europa Regular', 'Europa-Regular', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, sans-serif"
  }
}

/**
 * Font families
 * @tutorial https://docs.symbols.app/font
 */
const FONT_FAMILY = {
  Europa: "Europa, 'Europa Regular', 'Europa-Regular', sans-serif"
}

/**
 * Typography
 * @tutorial https://docs.symbols.app/typography
 * @tutorial https://docs.symbols.app/sequence
 */
const TYPOGRAPHY = {
  base: 16,
  ratio: 1.2
}

/**
 * Spacing
 * @tutorial https://docs.symbols.app/spacing
 * @tutorial https://docs.symbols.app/sequence
 */
const SPACING = {}

const options = {
  verbose: false,
  useReset: true,
  useDocumentTheme: true,
  useFontImport: true,
  useVariable: true,
  useSvgSprite: true,
  useIconSprite: true
}

export default {
  ...options,
  COLOR,
  GRADIENT,
  THEME,
  ICONS: DEFAULT_ICONS,
  TYPOGRAPHY,
  SPACING,
  FONT,
  FONT_FAMILY
}
