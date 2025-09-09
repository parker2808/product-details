// Global test setup file
import { vi } from 'vitest'

// Mock global objects if needed
global.window = window
global.document = document

// Setup console methods if needed
vi.mock('console', () => ({
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn()
}))
