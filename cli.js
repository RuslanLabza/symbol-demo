#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const REPO_URL = 'https://github.com/symbo-ls/starter-kit.git'

function showHelp () {
  console.log(`
GridSelection CLI Tool

Usage:
  node cli.js <command> [options]

Commands:
  init <project-name>        Clone the template repository
  create [options]           Generate GridSelection component

Options for create:
  -x, --columns <number>     Number of columns (default: 16)
  -y, --rows <number>        Number of rows (default: 8)
  -h, --help                 Show this help message

Examples:
  node cli.js init my-grid-app
  node cli.js create
  node cli.js create -x 12 -y 6
  node cli.js create --columns 20 --rows 10
`)
}

function initProject (projectName) {
  if (!projectName) {
    console.error('Error: Project name is required')
    console.log('Usage: node cli.js init <project-name>')
    process.exit(1)
  }

  try {
    console.log(`Cloning template repository into ${projectName}...`)
    execSync(`git clone ${REPO_URL} ${projectName}`, { stdio: 'inherit' })

    console.log(`\nProject ${projectName} created successfully!`)
    console.log(`\nNext steps:`)
    console.log(`  cd ${projectName}`)
    console.log(`  npm install`)
    console.log(`  npm start`)
    console.log(`\nTo generate a custom grid:`)
    console.log(`  node cli.js create -x 20 -y 10`)
  } catch (error) {
    console.error('Error cloning repository:', error.message)
    process.exit(1)
  }
}

function generateGridComponent (columns = 16, rows = 8) {
  const componentCode = `export const GridSelection = {
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
    columns: ${columns},
    rows: ${rows}
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
    props: (element, state) => ({
      flow: 'column',
      gap: '2px',
      background: '#f0f0f0',
      padding: '8px',
      borderRadius: '8px',
      overflow: 'auto',
      children: Array.from({ length: state.rows }, (_, rowIndex) => ({
        [\`Row_\${rowIndex}\`]: {
          extend: Flex,
          props: {
            gap: '2px',
            children: Array.from({ length: state.columns }, (_, colIndex) => ({
              [\`Cell_\${colIndex}\`]: {
                extend: 'div',
                props: {
                  width: '32px',
                  height: '32px',
                  background: (colIndex <= state.selectedX && rowIndex <= state.selectedY) ? '#4A90E2' : '#e8e8e8',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid #ddd'
                },
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
      marginTop: 'B',
      padding: 'A2 0',
      borderTop: '1px solid #eee',
      fontSize: '14px',
      color: '#666'
    },

    SelectionCoords: {
      props: (element, state) => ({
        text: \`Selection coordinates: \${state.selectedX >= 0 ? \`\${state.selectedX + 1},\${state.selectedY + 1}\` : 'None'}\`
      })
    },

    TotalSelected: {
      props: (element, state) => ({
        text: \`Total cells selected: \${state.selectedX >= 0 ? (state.selectedX + 1) * (state.selectedY + 1) : 0}\`
      })
    }
  }
}`

  // Read existing components file
  const componentsPath = path.join(process.cwd(), 'src', 'components.js')
  if (!fs.existsSync(componentsPath)) {
    console.error('Error: src/components.js not found. Make sure you are in a Symbols project directory.')
    process.exit(1)
  }

  let componentsContent = fs.readFileSync(componentsPath, 'utf8')

  // Replace or insert GridSelection export
  const gridSelectionRegex = /export const GridSelection = \{[\s\S]*?\n\}/
  if (gridSelectionRegex.test(componentsContent)) {
    componentsContent = componentsContent.replace(gridSelectionRegex, componentCode)
    console.log(`Updated GridSelection component with ${columns}x${rows} grid`)
  } else {
    const lastExportIndex = componentsContent.lastIndexOf('export const')
    if (lastExportIndex !== -1) {
      componentsContent = componentsContent.slice(0, lastExportIndex) + componentCode + '\n\n' + componentsContent.slice(lastExportIndex)
    } else {
      componentsContent += '\n\n' + componentCode
    }
    console.log(`Added GridSelection component with ${columns}x${rows} grid`)
  }

  fs.writeFileSync(componentsPath, componentsContent)

  // Ensure pages.js mounts GridSelection on '/'
  const pagesPath = path.join(process.cwd(), 'src', 'pages.js')
  if (fs.existsSync(pagesPath)) {
    let pagesContent = fs.readFileSync(pagesPath, 'utf8')
    if (!pagesContent.includes('GridSelection: {}')) {
      pagesContent = pagesContent.replace(/  '\/': \{[\s\S]*?\}/, "  '/': {\n    GridSelection: {}\n  }")
      fs.writeFileSync(pagesPath, pagesContent)
      console.log('Updated pages.js to include GridSelection component')
    }
  }

  console.log(`\nGrid component generated successfully!`)
  console.log(`Grid size: ${columns} columns × ${rows} rows`)
  console.log(`Total cells: ${columns * rows}`)
  console.log(`\nRun 'npm start' to see your grid in action.`)
}

function parseArgs (args) {
  const result = { columns: 16, rows: 8 }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '-x' || arg === '--columns') {
      const value = parseInt(args[i + 1])
      if (!isNaN(value) && value > 0) { result.columns = value; i++ } else {
        console.error('Error: Invalid columns value'); process.exit(1)
      }
    } else if (arg === '-y' || arg === '--rows') {
      const value = parseInt(args[i + 1])
      if (!isNaN(value) && value > 0) { result.rows = value; i++ } else {
        console.error('Error: Invalid rows value'); process.exit(1)
      }
    } else if (arg === '-h' || arg === '--help') {
      showHelp(); process.exit(0)
    }
  }
  return result
}

function main () {
  const args = process.argv.slice(2)
  if (args.length === 0) { showHelp(); return }
  const command = args[0]
  switch (command) {
    case 'init':
      initProject(args[1])
      break
    case 'create':
      const options = parseArgs(args.slice(1))
      generateGridComponent(options.columns, options.rows)
      break
    case 'help':
    case '--help':
    case '-h':
      showHelp()
      break
    default:
      console.error(`Unknown command: ${command}`)
      showHelp()
      process.exit(1)
  }
}

main()
