# GridSelection Component with CLI Tool

A customizable grid selection component built with Symbols.js framework. Features interactive grid selection where clicking a cell selects all cells to the left and above, creating a rectangular selection area.

![Grid Selection Demo](https://via.placeholder.com/800x600/667eea/white?text=Grid+Selection+Demo)

## Features

- 🎯 **Interactive Grid Selection**: Click any cell to select all cells to the left and above
- 📏 **Customizable Dimensions**: Create grids with any X×Y dimensions
- 📊 **Real-time Statistics**: Shows selection coordinates and total selected cells
- 🎨 **Modern UI**: Beautiful gradient background and responsive design
- 🛠️ **CLI Tool**: Easy project initialization and component generation

## Quick Start

### Using the CLI Tool

1. **Initialize a new project**:
```bash
node cli.js init my-grid-project
cd my-grid-project
npm install
npm start
```

2. **Generate custom grid**:
```bash
# Default 16×8 grid
node cli.js create

# Custom dimensions
node cli.js create -x 12 -y 6
node cli.js create --columns 20 --rows 10
```

### Manual Setup

1. Clone the repository:
```bash
git clone https://github.com/RuslanLabza/symbol-demo.git
cd symbol-demo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

## CLI Commands

```bash
# Show help
node cli.js --help

# Initialize new project
node cli.js init <project-name>

# Generate grid component
node cli.js create [options]

Options:
  -x, --columns <number>    Number of columns (default: 16)
  -y, --rows <number>       Number of rows (default: 8)
  -h, --help               Show help message
```

## How It Works

1. **Grid Layout**: Creates a responsive grid with specified dimensions
2. **Selection Logic**: Clicking cell at coordinates (x,y) selects all cells from (0,0) to (x,y)
3. **Visual Feedback**: Selected cells are highlighted in blue with hover effects
4. **Statistics**: Footer shows current selection coordinates and total selected cells

## Technology Stack

- **[Symbols.js](https://symbols.app/)**: Modern JavaScript UI framework
- **[Parcel](https://parceljs.org/)**: Zero-configuration build tool
- **DOMQL**: Declarative DOM manipulation
- **StandardJS**: Code style and linting

## Project Structure

```
├── src/
│   ├── components.js     # GridSelection component
│   ├── designSystem.js   # Themes and styling
│   ├── index.js          # Main app entry
│   └── pages.js          # Page routing
├── cli.js                # CLI tool
├── index.html            # HTML entry point
└── package.json          # Dependencies and scripts
```

## Customization

### Grid Dimensions
Use the CLI tool or modify the component state:
```javascript
state: {
  selectedX: -1,
  selectedY: -1,
  columns: 16,  // Change this
  rows: 8       // Change this
}
```

### Styling
Modify colors and styles in `src/designSystem.js` and component props.

### Selection Logic
The selection logic is in the cell click handler:
```javascript
on: {
  click: (event, element, state) => {
    state.update({
      selectedX: colIndex,
      selectedY: rowIndex
    })
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
