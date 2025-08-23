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
  const componentsPath = path.join(process.cwd(), 'src', 'components.js')
  if (!fs.existsSync(componentsPath)) {
    console.error('Error: src/components.js not found. Make sure you are in a Symbols project directory.')
    process.exit(1)
  }

  const original = fs.readFileSync(componentsPath, 'utf8')

  // Find GridSelection export and its state block
  const gridIdx = original.indexOf('export const GridSelection')
  if (gridIdx === -1) {
    console.error('Error: GridSelection export not found in src/components.js')
    process.exit(1)
  }

  const afterGrid = original.slice(gridIdx)
  const stateMatch = afterGrid.match(/state:\s*\{[\s\S]*?\}/)
  if (!stateMatch) {
    console.error('Error: Could not locate state block for GridSelection in src/components.js')
    process.exit(1)
  }

  const stateBlock = stateMatch[0]
  let updatedState = stateBlock
  updatedState = updatedState.replace(/(columns:\s*)\d+/, `$1${columns}`)
  updatedState = updatedState.replace(/(rows:\s*)\d+/, `$1${rows}`)

  if (updatedState === stateBlock) {
    console.warn('Warning: columns/rows values were not changed (already set?)')
  }

  const updated = original.slice(0, gridIdx) + afterGrid.replace(stateBlock, updatedState)
  fs.writeFileSync(componentsPath, updated)

  console.log('Updated GridSelection defaults:')
  console.log(`  columns = ${columns}`)
  console.log(`  rows    = ${rows}`)
  console.log("Restart 'npm start' if running to see changes.")
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
