import { describe, expect, it } from 'vitest'
import { getProductPrice } from '@/modules/product/utils/product-price.util'
import type { ProductDetailForm } from '@/modules/product/types/forms/product-detail-form.type'

describe('Product Price Utilities', () => {
  describe('getProductPrice', () => {
    const mockProductForm: ProductDetailForm = {
      productId: 'test-product-id',
      size: {
        uid: 'size-1',
        skuCode: 'L1',
        displayName: 'Large',
        price: 50000 // $500
      },
      colour: {
        uid: 'color-1',
        skuCode: 'BLU',
        displayName: 'Blue',
        price: 1000 // $10
      },
      drawerFront: {
        uid: 'drawer-1',
        skuCode: 'WD1',
        displayName: 'Wood',
        price: 15000 // $150
      },
      slabtop: {
        uid: 'slab-1',
        skuCode: 'ST1',
        displayName: 'Marble',
        price: 25000 // $250
      },
      handles: {
        uid: 'handle-1',
        skuCode: 'CH1',
        displayName: 'Chrome',
        price: 5000 // $50
      },
      quantity: 2
    }

    it('should calculate total price correctly for multiple quantities', () => {
      const result = getProductPrice(mockProductForm)
      // (50000 + 1000 + 15000 + 25000 + 5000) * 2 = 96000 * 2 = 192000
      expect(result).toBe(192000)
    })

    it('should calculate total price correctly for single quantity', () => {
      const singleQuantityForm: ProductDetailForm = {
        ...mockProductForm,
        quantity: 1
      }
      const result = getProductPrice(singleQuantityForm)
      // 50000 + 1000 + 15000 + 25000 + 5000 = 96000
      expect(result).toBe(96000)
    })

    it('should handle zero prices correctly', () => {
      const zeroPriceForm: ProductDetailForm = {
        productId: 'zero-price-product',
        size: { uid: 'size-1', skuCode: 'S1', displayName: 'Small', price: 0 },
        colour: { uid: 'color-1', skuCode: 'RED', displayName: 'Red', price: 0 },
        drawerFront: { uid: 'drawer-1', skuCode: 'WD1', displayName: 'Wood', price: 0 },
        slabtop: { uid: 'slab-1', skuCode: 'ST1', displayName: 'Stone', price: 0 },
        handles: { uid: 'handle-1', skuCode: 'H1', displayName: 'Handle', price: 0 },
        quantity: 3
      }

      const result = getProductPrice(zeroPriceForm)
      expect(result).toBe(0)
    })

    it('should handle large quantities correctly', () => {
      const largeQuantityForm: ProductDetailForm = {
        ...mockProductForm,
        quantity: 10
      }
      const result = getProductPrice(largeQuantityForm)
      // 96000 * 10 = 960000
      expect(result).toBe(960000)
    })

    it('should return 0 for null/undefined product', () => {
      expect(getProductPrice(null as any)).toBe(0)
      expect(getProductPrice(undefined as any)).toBe(0)
    })
  })
})
