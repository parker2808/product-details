# Product Details - Nuxt 3 Product Configurator

A modern, interactive product configurator built with Nuxt 3, featuring
customizable bathroom vanities with real-time pricing and options selection.

## 🌐 Live Demo

**[View Live Demo](https://parker-product-sample.netlify.app/product)**

## 🚀 Features

- **Product Configuration**: Interactive product customization with multiple
  option types (Size, Color, Drawer Front, Slab Top, Handles)
- **Real-time Pricing**: Dynamic price calculation based on selected options
- **Image Gallery**: Responsive image slider for product visualization
- **Modern UI**: Clean, responsive design built with Tailwind CSS
- **Toast Notifications**: User feedback system for actions
- **Modal System**: Flexible modal management for enhanced UX
- **TypeScript**: Full type safety throughout the application
- **Modular Architecture**: Well-organized codebase with separate modules
- **Comprehensive Testing**: Unit tests with Vitest covering all utility
  functions

## 🛠 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Icons**: Vue Inline SVG
- **Animations**: Animate.css
- **Image Optimization**: Nuxt Image
- **Testing**: [Vitest](https://vitest.dev/) with Happy DOM
- **Development**: ESLint, Prettier

## 📁 Project Structure

```
src/
├── modules/
│   ├── core/                      # Core functionality
│   │   ├── components/            # Reusable UI components
│   │   │   ├── drawer/           # Drawer components
│   │   │   ├── image/            # Image components
│   │   │   ├── modal/            # Modal system
│   │   │   ├── sliders/          # Image sliders
│   │   │   └── toast/            # Toast notifications
│   │   ├── composables/          # Vue composables
│   │   ├── stores/               # Pinia stores
│   │   ├── types/                # TypeScript types
│   │   └── utils/                # Utility functions
│   └── product/                   # Product-specific functionality
│       ├── components/           # Product components
│       │   ├── ProductHeader.vue
│       │   ├── ProductModal.vue
│       │   ├── ProductOptions.vue
│       │   └── ProductQuantity.vue
│       ├── mockups/              # Mock data
│       ├── types/                # Product types
│       ├── utils/                # Product utilities
│       └── views/                # Product views
├── assets/                       # Static assets
│   ├── icons/                   # SVG icons
│   ├── images/                  # Images
│   └── style/                   # Stylesheets
└── plugins/                     # Nuxt plugins
```

## 🚀 Installation

### Prerequisites

- Node.js (version 18 or higher)
- Yarn package manager

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd product-details
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start development server**

   ```bash
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

## 📜 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn generate` - Generate static site
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn test` - Run tests in watch mode
- `yarn test:run` - Run tests once
- `yarn test:ui` - Run tests with UI interface
- `yarn test:coverage` - Run tests with coverage report

## 🎯 Key Components

### ProductDetails

Main product view that orchestrates the product configuration experience.

### ProductOptions

Interactive component for selecting product variants (size, color, materials,
etc.) with real-time price updates.

### ProductQuantity

Quantity selector with add-to-cart functionality and pricing display.

### ImageSliders

Responsive image gallery for product visualization.

### Modal System

Flexible modal management using composables for enhanced user experience.

### Toast Notifications

User feedback system for actions and confirmations.

## 🧪 Testing

The project includes comprehensive unit tests built with
[Vitest](https://vitest.dev/) for all utility functions.

### Test Coverage

- **35 unit tests** covering all utility functions
- **Core Utils**: Currency formatting, image path handling
- **Product Utils**: Option selection, price calculation
- **Edge Cases**: Null/undefined values, locale formatting, error conditions

### Test Structure

```
tests/
└── units/
    ├── core/
    │   └── utils/
    │       ├── currency-format.util.test.ts
    │       └── image.utils.test.ts
    └── product/
        └── utils/
            ├── product-option.util.test.ts
            └── product-price.util.test.ts
```

### Running Tests

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run

# Run tests with UI interface
yarn test:ui

# Run tests with coverage report
yarn test:coverage
```

### Test Features

- **TypeScript Support**: Full type safety in tests
- **Happy DOM**: Fast DOM environment for testing
- **Real-world Scenarios**: Tests cover actual usage patterns
- **Mock Data**: Comprehensive mock objects for complex scenarios
- **Edge Case Testing**: Handles null, undefined, and error states

## 🔧 Configuration

The project uses several configuration files:

- `nuxt.config.ts` - Nuxt configuration with modules and build settings
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration with path aliases
- `eslint.config.mjs` - ESLint configuration for code quality

## 📱 Features in Detail

### Product Configuration

- Multiple option types (Size, Color, Drawer Front, Slab Top, Handles)
- Real-time price calculation
- Form validation and state management
- Responsive design for all devices

### Image Management

- Optimized image loading with Nuxt Image
- Interactive image slider
- Responsive image display

### State Management

- Pinia stores for global state
- Vue composables for reusable logic
- TypeScript interfaces for type safety

## 🎨 Styling

The project uses Tailwind CSS with:

- Mobile-first responsive design
- Custom SCSS for additional styling
- Animate.css for smooth animations
- Clean, modern aesthetic

## 🚦 Development

The project is configured for optimal development experience:

- Hot reload in development
- TypeScript support with strict type checking
- ESLint and Prettier for code quality
- Modular architecture for maintainability
- SPA mode for better interactivity

## 📄 License

This project is private and not intended for public distribution.
