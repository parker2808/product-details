import { describe, it, expect } from 'vitest'
import { getOptionsByName } from '@/modules/product/utils/product-option.util'
import { PRODUCT_OPTION } from '@/modules/product/enums/product-option.enum'
import type { ProductDetail } from '@/modules/product/types/entities/product-detail.type'

describe('Product Option Utilities', () => {
  describe('getOptionsByName', () => {
    const mockProductDetails: ProductDetail = {
      product: {
        uid: 'test-product-uid',
        name: 'Test Product',
        slug: 'test-product',
        description: 'Test product description'
      },
      optionTypes: [
        {
          optionTypeId: 1,
          displayName: 'Size',
          options: [
            {
              uid: 'size-1',
              skuCode: 'S1',
              displayName: 'Small',
              price: 10000
            },
            {
              uid: 'size-2',
              skuCode: 'M1',
              displayName: 'Medium',
              price: 15000
            }
          ]
        },
        {
          optionTypeId: 2,
          displayName: 'Colour',
          options: [
            {
              uid: 'color-1',
              skuCode: 'RED',
              displayName: 'Red',
              price: 0
            },
            {
              uid: 'color-2',
              skuCode: 'BLU',
              displayName: 'Blue',
              price: 500
            }
          ]
        },
        {
          optionTypeId: 3,
          displayName: 'Handles',
          options: [
            {
              uid: 'handle-1',
              skuCode: 'H1',
              displayName: 'Chrome Handle',
              price: 2000
            }
          ]
        }
      ]
    }

    it('should return options for existing Size option type', () => {
      const result = getOptionsByName(mockProductDetails, PRODUCT_OPTION.SIZE)
      expect(result).toHaveLength(2)
      expect(result[0].displayName).toBe('Small')
      expect(result[1].displayName).toBe('Medium')
    })

    it('should return options for existing Colour option type', () => {
      const result = getOptionsByName(mockProductDetails, PRODUCT_OPTION.COLOUR)
      expect(result).toHaveLength(2)
      expect(result[0].displayName).toBe('Red')
      expect(result[1].displayName).toBe('Blue')
    })

    it('should return options for existing Handles option type', () => {
      const result = getOptionsByName(mockProductDetails, PRODUCT_OPTION.HANDLES)
      expect(result).toHaveLength(1)
      expect(result[0].displayName).toBe('Chrome Handle')
      expect(result[0].price).toBe(2000)
    })

    it('should return empty array for non-existing option type', () => {
      const result = getOptionsByName(mockProductDetails, PRODUCT_OPTION.DRAWER_FRONT)
      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('should handle product details with empty option types', () => {
      const emptyProductDetails: ProductDetail = {
        product: {
          uid: 'empty-product',
          name: 'Empty Product',
          slug: 'empty-product',
          description: 'Product with no options'
        },
        optionTypes: []
      }

      const result = getOptionsByName(emptyProductDetails, PRODUCT_OPTION.SIZE)
      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })
  })
})
