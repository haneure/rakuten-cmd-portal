# @rakuten-cmd/design-system

Design system for Rakuten Cloud Management Portal.

## Installation

\`\`\`bash
npm install @rakuten-cmd/design-system
\`\`\`

## Development

\`\`\`bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build package
npm run build
\`\`\`

## Components

- **Button** - Interactive button with multiple variants, sizes, and states
- **Input** - Text input field with validation states and icons
- **Card** - Content container with optional click interactions
- **Modal** - Accessible dialog with portal rendering and focus management
- **Badge** - Status indicator with variants, sizes, dot indicators, and animations

## Usage

\`\`\`tsx
import { Button } from '@rakuten-cmd/design-system';

function App() {
  return <Button variant="primary">Click me</Button>;
}
\`\`\`