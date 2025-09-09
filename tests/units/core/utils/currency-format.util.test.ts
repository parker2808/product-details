import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatPrice,
  formatPriceRange
} from '@/modules/core/utils/currency-format.util'

describe('Currency Format Utilities', () => {
  describe('formatCurrency', () => {
    it('should format normal price in cents to currency with default parameters', () => {
      const result = formatCurrency(200000)
      expect(result).toBe('$2,000')
    })

    it('should format price with custom currency symbol', () => {
      const result = formatCurrency(150000, '€')
      expect(result).toBe('€1,500')
    })

    it('should format price with different locale (German)', () => {
      const result = formatCurrency(123456, '$', 'de-DE')
      expect(result).toBe('$1.234,56')
    })

    it('should handle edge cases with invalid/null values', () => {
      expect(formatCurrency(null as any)).toBe('$0')
      expect(formatCurrency(undefined as any)).toBe('$0')
      expect(formatCurrency(NaN)).toBe('$0')
    })

    it('should format large numbers with proper thousand separators', () => {
      const result = formatCurrency(123456789, '$', 'en-US')
      expect(result).toBe('$1,234,567.89')
    })
  })

  describe('formatPrice', () => {
    it('should format normal price in cents without currency symbol', () => {
      const result = formatPrice(200000)
      expect(result).toBe('2,000')
    })

    it('should format price with decimal places when needed', () => {
      const result = formatPrice(250050)
      expect(result).toBe('2,500.5')
    })

    it('should format price with different locale (French)', () => {
      const result = formatPrice(123456, 'fr-FR')
      // French locale uses non-breaking space (U+202F) for thousands separator
      expect(result).toBe('1\u202f234,56')
    })

    it('should handle edge cases with invalid/null values', () => {
      expect(formatPrice(null as any)).toBe('0')
      expect(formatPrice(undefined as any)).toBe('0')
      expect(formatPrice(NaN)).toBe('0')
    })

    it('should format zero and small amounts correctly', () => {
      expect(formatPrice(0)).toBe('0')
      expect(formatPrice(1)).toBe('0.01')
      expect(formatPrice(99)).toBe('0.99')
    })
  })

  describe('formatPriceRange', () => {
    it('should format a normal price range with default parameters', () => {
      const result = formatPriceRange(100000, 300000)
      expect(result).toBe('$1,000 - $3,000')
    })

    it('should format price range with custom currency symbol', () => {
      const result = formatPriceRange(150000, 250000, '£')
      expect(result).toBe('£1,500 - £2,500')
    })

    it('should format price range with different locale', () => {
      const result = formatPriceRange(123400, 567800, '€', 'de-DE')
      expect(result).toBe('€1.234 - €5.678')
    })

    it('should handle identical min and max prices', () => {
      const result = formatPriceRange(200000, 200000)
      expect(result).toBe('$2,000 - $2,000')
    })

    it('should format large price ranges correctly', () => {
      const result = formatPriceRange(99999999, 150000000, '$', 'en-US')
      expect(result).toBe('$999,999.99 - $1,500,000')
    })
  })
})
