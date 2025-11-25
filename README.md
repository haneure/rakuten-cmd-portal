# Rakuten Cloud Management Portal

A modern, type-safe web application for managing Rakuten cloud infrastructure, built with React, TypeScript, and a custom design system.

## 📦 Project Structure

This is a monorepo containing multiple packages:

```
rakuten-cmd-portal/
├── packages/
│   ├── design-system/    # Reusable UI component library
│   ├── frontend/          # Main application
│   └── backend/           # API server
└── package.json           # Root workspace configuration
```

## 🎨 Design System

The design system package provides a comprehensive library of reusable React components with:

- **Components**: Button, Input, Card (more coming soon)
- **Storybook**: Interactive component documentation
- **Testing**: Jest + React Testing Library with 95%+ coverage
- **TypeScript**: Full type safety
- **CSS Custom Properties**: Consistent theming with design tokens
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation

### Features

- 🎯 **Production Ready**: Tested, documented, and type-safe components
- 📚 **Storybook Integration**: 50+ interactive stories for component exploration
- ✅ **High Test Coverage**: 171 tests with 97%+ code coverage
- 🎨 **Design Tokens**: 100+ CSS variables for consistent styling
- ♿ **Accessible**: Keyboard navigation, ARIA attributes, screen reader support
- 📱 **Responsive**: Mobile-first approach with flexible layouts

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- npm 7+ (for workspace support)

### Installation

```bash
# Install all dependencies for all workspaces
npm run bootstrap

# Or just install without building
npm install
```

### Development

```bash
# Run Storybook for design system development
npm run design-system:storybook

# Run Vite dev server (for testing component integration)
npm run design-system:dev

# Run tests
npm run design-system:test

# Run tests with coverage
npm run design-system:test:coverage

# Start frontend and backend together
npm run start:dev
```

## 📚 Design System Usage

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run design-system:storybook` | Open Storybook on http://localhost:6006 |
| `npm run design-system:dev` | Start Vite dev server |
| `npm run design-system:test` | Run all tests |
| `npm run design-system:test:watch` | Run tests in watch mode |
| `npm run design-system:test:coverage` | Run tests with coverage report |
| `npm run design-system:build` | Build component library |

### Components

#### Button Component
6 variants with loading states, icon support, and full keyboard accessibility.

```tsx
import { Button } from '@rakuten-cmd/design-system';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`, `link`  
**Sizes**: `sm`, `md`, `lg`  
**States**: `disabled`, `loading`

#### Input Component
6 input types with validation states, prefix/suffix icons, and comprehensive form support.

```tsx
import { Input } from '@rakuten-cmd/design-system';

<Input 
  type="email"
  variant="default"
  placeholder="Enter email"
  error="Invalid email"
/>
```

**Types**: `text`, `email`, `password`, `number`, `tel`, `url`, `search`  
**Variants**: `default`, `success`, `warning`, `error`  
**Features**: Validation states, prefix/suffix icons, loading spinner

#### Card Component
Flexible layout container with multiple variants and composition options.

```tsx
import { Card } from '@rakuten-cmd/design-system';

<Card 
  variant="elevated"
  padding="md"
  clickable
  onClick={handleClick}
  header={<h3>Title</h3>}
  footer={<button>Action</button>}
>
  Card content here
</Card>
```

**Variants**: `default`, `outlined`, `elevated`  
**Padding**: `none`, `sm`, `md`, `lg`  
**Features**: Header/footer slots, clickable, hoverable, keyboard navigation

### Design Tokens

The design system uses CSS custom properties for consistent theming:

```css
/* Colors */
--color-primary: #f43f5e;
--color-gray-50 to --color-gray-900

/* Spacing */
--spacing-xxs to --spacing-3xl

/* Typography */
--font-size-xs to --font-size-3xl
--font-weight-normal, --font-weight-medium, --font-weight-bold

/* Shadows */
--shadow-sm, --shadow-md, --shadow-lg
```

## 🧪 Testing

The project uses Jest and React Testing Library for comprehensive testing:

```bash
# Run all tests
npm test

# Run design system tests with coverage
npm run design-system:test:coverage

# Watch mode for development
cd packages/design-system
npm run test:watch
```

### Test Coverage

Current coverage for the design system:

- **Statements**: 97.33%
- **Branches**: 98.97%
- **Functions**: 78.94%
- **Lines**: 96.92%

## 🏗️ Building

```bash
# Build all packages
npm run build:all

# Build design system only
npm run design-system:build
```

## 📖 Documentation

- **Storybook**: Interactive component documentation at `http://localhost:6006`
- **Component Tests**: See `packages/design-system/src/components/*/` for test files
- **Coverage Reports**: Generated in `packages/design-system/coverage/lcov-report/index.html`

## 🛠️ Tech Stack

### Frontend
- React 18.2.0
- TypeScript 5.3.3
- Vite 5.0.8
- CSS Modules + Custom Properties

### Testing & Documentation
- Jest 29.7.0
- React Testing Library 14.1.2
- Storybook 8.4.7

### Code Quality
- ESLint
- Prettier
- TypeScript strict mode

## 📝 Project Status

### ✅ Completed
- Button component with 6 variants
- Input component with validation
- Card component with flexible composition
- CSS custom properties system (100+ design tokens)
- Comprehensive test suite (171 tests, 97%+ coverage)
- Storybook documentation (50+ stories)

### 🚧 Coming Soon
- Modal component
- Select/Dropdown component
- Checkbox & Radio components
- Form validation utilities
- Toast notifications
- And more...

## 👤 Author

Built as part of a Front-End Engineer application for Rakuten.

## 📄 License

Private - All rights reserved
