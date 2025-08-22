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

export const GridSelection = {
  extend: Flex,
  props: {
    flow: 'column',
    gap: 'B',
    padding: 'C',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
    width: 'fit-content',
    maxWidth: '90vw',
    maxHeight: '90vh'
  },

  state: {
    selectedX: -1,
    selectedY: -1,
    columns: 8,
    rows: 4
  },

  H2: {
    text: 'Grid Selection',
    props: {
      margin: '0 0 B 0',
      fontSize: '24px',
      fontWeight: '600',
      color: '#333'
    }
  },

  GridContainer: {
    extend: Flex,
    props: {
      flow: 'column',
      gap: '2px',
      background: '#f0f0f0',
      padding: '8px',
      borderRadius: '8px',
      overflow: 'auto'
    },

    props: (element, state) => ({
      children: Array.from({ length: state.rows }, (_, rowIndex) => ({
        [`Row_${rowIndex}`]: {
          extend: Flex,
          props: {
            gap: '2px'
          },
          props: () => ({
            children: Array.from({ length: state.columns }, (_, colIndex) => ({
              [`Cell_${colIndex}`]: {
                extend: 'div',
                props: {
                  width: '32px',
                  height: '32px',
                  background: (state.selectedX >= colIndex && state.selectedY >= rowIndex) ? '#4A90E2' : '#e8e8e8',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    background: (state.selectedX >= colIndex && state.selectedY >= rowIndex) ? '#357ABD' : '#d0d0d0'
                  }
                },
                on: {
                  click: (event, element, state) => {
                    state.update({
                      selectedX: colIndex,
                      selectedY: rowIndex
                    })
                  }
                }
              }
            }))
          })
        }
      }))
    })
  },

  Footer: {
    extend: Flex,
    props: {
      justify: 'space-between',
      align: 'center',
      marginTop: 'B',
      padding: 'A2 0',
      borderTop: '1px solid #eee',
      fontSize: '14px',
      color: '#666'
    },

    SelectionCoords: {
      props: (element, state) => ({
        text: `Selection coordinates: ${state.selectedX >= 0 ? `${state.selectedX},${state.selectedY}` : 'None'}`
      })
    },

    TotalSelected: {
      props: (element, state) => ({
        text: `Total cells selected: ${state.selectedX >= 0 ? (state.selectedX + 1) * (state.selectedY + 1) : 0}`
      })
    }
  }
}

export const Footer = {
  props: {
    padding: 'Z B',
    order: 9
  }
}
