'use strict'

import { Flex, Link } from 'smbls'

export const Header = {
  extend: Flex,
  props: {
    minWidth: '100%',
    padding: 'Z B',
    align: 'center space-between'
  },

  Flex: {
    props: { gap: 'C' },
    childExtend: {
      extend: Link,
      props: ({ props }) => ({
        textDecoration: window.location.pathname === props.href ? 'underline' : 'none'
      })
    },
    Text_logo: { href: '/', text: 'Hello!' },
    Text_about: { href: '/about', text: 'About' }
  },

  ThemeSwitcher: {}
}

export const ThemeSwitcher = {
  extend: Flex,
  props: { gap: 'A2' },
  childExtend: {
    props: (element, state) => ({
      active: state.globalTheme === element.key,
      cursor: 'pointer',
      '.active': {
        fontWeight: '900'
      }
    }),
    on: {
      click: (event, element, state) => {
        state.update({ globalTheme: element.key })
      }
    }
  },
  dark: { text: 'Dark' },
  light: { text: 'Light' },
  midnight: { text: 'Midnight' }
}

const CellBase = {
  extend: 'div',
  props: {
    width: '26px',
    height: '26px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.15s ease, transform 0.05s ease',
    border: '1px solid #E0E7FF'
  }
}

export const GridSelection = {
  extend: Flex,
  props: {
    flow: 'column',
    gap: 'B',
    padding: 'A1 B',
    background: '#F0F0F0',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
    width: 'fit-content',
    maxWidth: '90vw',
    maxHeight: '90vh'
  },

  state: {
    selectedX: -1,
    selectedY: -1,
    columns: 11,
    rows: 8
  },

  H2: {
    text: 'Grid Selection',
    props: {
      fontFamily: 'Europa',
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: '0',
      color: '#333'
    }
  },

  GridContainer: {
    extend: Flex,
    props: (element, state) => ({
      flow: 'column',
      gap: '4px',
      background: '#FFFFFF',
      padding: '10px',
      borderRadius: '8px',
      overflow: 'auto',
      children: Array.from({ length: state.rows }, (_, rowIndex) => ({
        [`Row_${rowIndex}`]: {
          extend: Flex,
          props: {
            gap: '4px',
            children: Array.from({ length: state.columns }, (_, colIndex) => ({
              [`Cell_${colIndex}`]: {
                extend: CellBase,
                props: (el, st) => ({
                  background: (colIndex <= st.selectedX && rowIndex <= st.selectedY) ? '#3D7BD9' : '#E8F1FF',
                  ':hover': {
                    background: (colIndex <= st.selectedX && rowIndex <= st.selectedY) ? '#2F69C6' : '#DCE9FF'
                  }
                }),
                on: {
                  click: (event, element, st) => {
                    st.update({ selectedX: colIndex, selectedY: rowIndex })
                  }
                }
              }
            }))
          }
        }
      }))
    })
  },

  Footer: {
    extend: Flex,
    props: {
      align: 'center space-between',
      minWidth: '100%',
      padding: '0 0 0 0',
      fontSize: '14px',
      color: '#666'
    },

    SelectionCoords: {
      extend: Flex,
      props: { gap: '4px', color: '#888' },
      Label: { text: 'Selection coordinates:' },
      Value: {
        props: (element, state) => ({
          text: state.selectedX >= 0 ? `${state.selectedX + 1},${state.selectedY + 1}` : 'None',
          color: '#000',
          fontWeight: '700'
        })
      }
    },

    TotalSelected: {
      extend: Flex,
      props: { gap: '4px', color: '#888' },
      Label: { text: 'Total cells selected:' },
      Value: {
        props: (element, state) => ({
          text: `${state.selectedX >= 0 ? (state.selectedX + 1) * (state.selectedY + 1) : 0}`,
          color: '#000',
          fontWeight: '700'
        })
      }
    }
  }
}

export const Footer = {
  props: {
    padding: 'Z B',
    order: 9
  }
}
