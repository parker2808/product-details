import type { OptionType } from '@/modules/product/types/entities/option.type'

/**
 * Represents a product entity
 */
export type ProductInfo = {
  /** Unique identifier for the product */
  uid: string
  /** Display name of the product */
  name: string
  /** URL-friendly slug for the product */
  slug: string
  /** Detailed description of the product */
  description: string
}

/**
 * Represents complete product details including all options
 */
export type ProductDetail = {
  /** The main product information */
  product: ProductInfo
  /** Available option types and their variants */
  optionTypes: OptionType[]
}
