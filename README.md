# Organizational Tree Structure Generator

A React.js application for generating and visualizing hierarchical organizational structures with support for 3 Levels.

## 🌟 Features

- Interactive tree structure visualization
- Support for multiple organizational levels
- Customizable node styling and layout

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/deomarvin/tree-structure-generator
cd tree-structure-generator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗 Project Structure

```
src/
├── App.js
├── App.test.js
├── cg_data.json
├── components
│   └── Home
│       ├── Background.css
│       └── Structure.jsx
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js
```

## 📝 Usage

### Sample Data Structure

```json
{
  "name": ["John Doe", "Jane Smith"],
  "position": "TL",
  "child": [
    {
      "name": "Alice Johnson",
      "position": "Coach",
      "child": [
        {
          "name": "Bob Wilson",
          "cg": "CG YOUTH 101",
          "attendance_average": 8
        }
      ]
    }
  ]
}
```
