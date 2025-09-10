// ESLint configuration following STRUCTURE.md conventions
// - Vue Components: PascalCase for component files and folders
// - Other files: kebab-case with descriptive suffixes (.service.ts, .store.ts, etc.)
// - Module directories: kebab-case (user-management/, product/, etc.)
// - Enforces module-based architecture with proper file organization

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Base rules for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    rules: {
      // Vue specific rules
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          registeredComponentsOnly: false
        }
      ],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/prefer-define-options': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style']
        }
      ],
      'vue/require-v-for-key': 'error',

      // TypeScript specific rules (basic ones that don't require type info)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true
        }
      ],

      // General code quality rules
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true
        },
        {
          enforceForRenamedProperties: false
        }
      ],

      // Import rules
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true
        }
      ]
    }
  },

  // Vue Components - must be PascalCase (following STRUCTURE.md)
  {
    files: ['src/modules/*/components/**/*.vue', 'src/modules/*/views/**/*.vue'],
    rules: {
      // Enforce PascalCase for Vue component files
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'error' // Enforce multi-word component names for better naming
    }
  },

  // Module Services - must follow kebab-case.service.ts pattern
  {
    files: ['src/modules/*/services/**/*.ts'],
    rules: {
      // Services should be named with .service.ts suffix and kebab-case
    }
  },

  // Module Stores - must follow kebab-case.store.ts pattern
  {
    files: ['src/modules/*/stores/**/*.ts'],
    rules: {
      // Stores should be named with .store.ts suffix and kebab-case
    }
  },

  // Module Types - must follow kebab-case.type.ts pattern
  {
    files: ['src/modules/*/types/**/*.ts'],
    rules: {
      // Types should be named with .type.ts suffix and kebab-case
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'] // Prefer type over interface
    }
  },

  // Module Utils - must follow kebab-case.util.ts pattern
  {
    files: ['src/modules/*/utils/**/*.ts'],
    rules: {
      // Utils should be pure functions, no side effects
      'no-console': 'error'
    }
  },

  // Module Helpers - must follow kebab-case.helper.ts pattern
  {
    files: ['src/modules/*/helpers/**/*.ts'],
    rules: {
      // Helpers can have side effects but should be well documented
    }
  },

  // Module Composables - must follow kebab-case.composable.ts pattern
  {
    files: ['src/modules/*/composables/**/*.ts'],
    rules: {
      // Composables should follow Vue Composition API patterns
    }
  },

  // Module Constants - must follow kebab-case.constant.ts pattern
  {
    files: ['src/modules/*/constants/**/*.ts'],
    rules: {
      // Constants should be UPPER_CASE
      'prefer-const': 'error'
    }
  },

  // Module Enums - must follow kebab-case.enum.ts pattern
  {
    files: ['src/modules/*/enums/**/*.ts'],
    rules: {
      // Enums should be PascalCase
    }
  },

  // Module Mockups - must follow kebab-case.mockup.ts pattern
  {
    files: ['src/modules/*/mockups/**/*.ts'],
    rules: {
      // Mockups can use any for testing purposes
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },

  // API Queries and Mutations - must follow kebab-case pattern
  {
    files: ['src/modules/*/queries/**/*.ts', 'src/modules/*/mutations/**/*.ts'],
    rules: {
      // API functions should follow specific naming patterns
      'prefer-const': 'error'
    }
  },

  // TypeScript files only (excluding Vue files to avoid parser conflicts)
  {
    files: ['src/**/*.ts', 'pages/**/*.ts', 'server/**/*.ts', 'types/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false
        }
      ]
    }
  },

  // Vue files - special handling
  {
    files: ['**/*.vue'],
    rules: {
      // Vue-specific overrides
      'no-undef': 'off', // TypeScript handles this for Vue SFC
      // Enforce component naming follows kebab-case in templates
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          registeredComponentsOnly: false
          // No need for ignores list since we're enforcing kebab-case everywhere
        }
      ]
    }
  },

  // Test files - relax some rules for testing
  {
    files: ['tests/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
    rules: {
      // Allow any types in tests for mocking
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow console in tests
      'no-console': 'off',
      // Allow unused vars in tests (for setup/teardown)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|^(setup|teardown)'
        }
      ]
    }
  },

  // Server API files
  {
    files: ['server/api/**/*.ts'],
    rules: {
      // Server API specific rules
      'no-console': 'off' // Allow console logging in server
    }
  },

  // Config files - disable strict rules
  {
    files: [
      '*.config.{js,ts,mjs}',
      'eslint.config.{js,ts,mjs}',
      'vitest.config.{js,ts,mjs}',
      'tailwind.config.{js,ts,mjs}'
    ],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-destructuring': 'off' // Allow object property access in configs
    }
  },

  // Pages directory - Nuxt page components
  {
    files: ['pages/**/*.vue'],
    rules: {
      // Pages can be single-word names (like index.vue)
      'vue/multi-word-component-names': 'off'
    }
  },

  // Layouts directory - Nuxt layout components
  {
    files: ['layouts/**/*.vue'],
    rules: {
      // Layouts can be single-word names (like default.vue)
      'vue/multi-word-component-names': 'off'
    }
  },

  // Plugins directory - Nuxt plugins
  {
    files: ['plugins/**/*.ts'],
    rules: {
      // Plugins may need different patterns
      'no-console': 'off'
    }
  }
)
