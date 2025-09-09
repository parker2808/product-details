# Particula Frontend Project Structure

## Module-Based Architecture

The project follows a modular architecture where each feature is organized in its own self-contained module.

```
modules/                           # Feature modules directory
└── [module-name]/                # Each module represents a distinct feature
    │
    ├── components/               # Vue components specific to this module
    │   └── [ComponentName]/      # Component folder (PascalCase)
    │       ├── [ComponentName].vue         # Main component file (PascalCase)
    │       └── [ComponentName].spec.ts     # Component tests (optional)
    │
    ├── composables/              # Vue composables (composition API functions)
    │   └── [name].composable.ts            # e.g., user-data.composable.ts
    │
    ├── stores/                   # State management
    │   └── [name].store.ts       # Pinia or Vuex store modules
    │
    ├── queries/                  # API query functions
    │   └── [resource]-[action].query.ts    # e.g., get-user-list.query.ts
    │
    ├── mutations/                # API mutation functions
    │   └── [resource]-[action].mutation.ts # e.g., update-user-profile.mutation.ts
    │
    ├── services/                 # API service layer
    │   └── [resource].service.ts           # e.g., user.service.ts
    │
    ├── enums/                    # TypeScript enumerations
    │   └── [name].enum.ts        # e.g., user-role.enum.ts
    │
    ├── constants/                # Constant values and configurations
    │   └── [name].constant.ts    # e.g., api.constant.ts
    │
    ├── types/                    # TypeScript type definitions
    │   ├── entities/             # Data model types
    │   │   └── [entity].type.ts  # e.g., user.type.ts
    │   │
    │   ├── forms/                # Form-related type definitions
    │   │   └── [form].type.ts    # e.g., login-form.type.ts
    │   │
    │   └── requests/             # API request/response types
    │       └── [request].type.ts # e.g., user-update-request.type.ts
    │
    ├── styles/                   # Module-specific styles
    │   └── [name].style.scss     # SCSS style files
    │
    ├── utils/                    # Utility functions
    │   └── [name].util.ts        # Pure functions for data manipulation
    │
    ├── helpers/                  # Providers and mappers
    │   └── [name].helper.ts      # Helper functions for formatting, mapping, etc.
    │
    ├── mockups/                  # Mock data for development and testing
    │   └── [resource].mockup.ts  # e.g., users.mockup.ts
    │
    └── views/                    # Page-level Vue components
        └── [PageName].vue        # e.g., UserDashboard.vue (PascalCase)
```

## Naming Conventions

-   **Files & Directories**:

    -   Vue Components: PascalCase for both component folders and files (e.g., `UserProfile/UserProfile.vue`)
    -   All other files: kebab-case with descriptive suffixes (e.g., `user-profile.service.ts`)
    -   Module directories: kebab-case (e.g., `user-management/`)

-   **Type Suffixes**:
    -   `.vue` - Vue components
    -   `.composable.ts` - Vue composables
    -   `.store.ts` - State stores
    -   `.query.ts` - API query functions
    -   `.mutation.ts` - API mutation functions
    -   `.service.ts` - API services
    -   `.enum.ts` - Enumerations
    -   `.constant.ts` - Constants
    -   `.type.ts` - TypeScript types
    -   `.style.scss` - SCSS styles
    -   `.util.ts` - Utility functions
    -   `.helper.ts` - Helper functions
    -   `.mockup.ts` - Mock data

## Examples of Correct File Naming

-   Component: `UserProfile/UserProfile.vue` (PascalCase)
-   View: `UserDashboard.vue` (PascalCase)
-   Service: `user.service.ts` (kebab-case)
-   Query: `get-user-list.query.ts` (kebab-case)
-   Mutation: `update-user-profile.mutation.ts` (kebab-case)
-   Type: `user-update-request.type.ts` (kebab-case)
-   Composable: `user-data.composable.ts` (kebab-case)

## Detailed Description

### Components

UI components specific to the module. Each component should:

-   Be placed in its own directory with the same name as the component
-   Follow single-responsibility principle
-   Contain component-specific tests when needed

### Composables

Reusable composition functions (Vue 3 Composition API) that:

-   Extract and reuse component logic
-   Follow a descriptive naming convention
-   Handle specific reactive behavior

### Stores

State management stores that:

-   Manage module-specific application state
-   Use Pinia (preferred) or Vuex
-   Define actions, getters, and mutations

### Queries & Mutations

API interaction functions that:

-   Use a declarative approach for data fetching
-   Implement Vue Query (TanStack Query) patterns
-   Separate read operations (queries) from write operations (mutations)

### Services

Service layer that:

-   Abstracts API calls
-   Formats requests and handles responses
-   Provides a clean interface for data operations

### Types

TypeScript definitions organized by purpose:

-   **entities**: Core data models
-   **forms**: Form input/output structures
-   **requests**: API request/response formats

### Utils & Helpers

-   **Utils**: Pure, stateless functions for data manipulation
-   **Helpers**: More complex helper functions, often with side effects

### Views

Page-level components that:

-   Compose multiple smaller components
-   Handle page-level state and effects
-   Connect to routes and navigation

## Creating a New Module

You can quickly create a new module with the complete folder structure using shell commands:

Replace `MODULE_NAME` with your desired module name (use kebab-case):

```bash
MODULE_NAME="your-module-name" && mkdir -p "src/modules/$MODULE_NAME"/{components,composables,stores,queries,mutations,services,enums,constants,styles,utils,helpers,mockups,views,types/{entities,forms,requests}}
```

**Example:**

```bash
MODULE_NAME="product" && mkdir -p "src/modules/$MODULE_NAME"/{components,composables,stores,queries,mutations,services,enums,constants,styles,utils,helpers,mockups,views,types/{entities,forms,requests}}
```
