# GridSelection CLI

A tiny CLI to bootstrap a Symbols starter and set GridSelection defaults.

## Usage

```bash
# Show help
node cli.js --help

# Clone the template into a new folder
node cli.js init my-grid-app
cd my-grid-app
npm install
npm start

# Set grid size (defaults to 16x8 when omitted)
node cli.js create              # -> 16x8
node cli.js create -x 20 -y 10  # -> 20x10
node cli.js create --columns 11 --rows 8
```

- `init` clones the Symbols starter template.
- `create` updates `GridSelection` defaults in `src/components.js` (`state.columns/rows`).

That’s it. Start the dev server and click cells to select a rectangle from the top‑left to the clicked cell.
