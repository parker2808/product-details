/**
 * Represents a type of product option (e.g., Size, Color, etc.)
 */
export type OptionType = {
  /** Unique identifier for the option type */
  optionTypeId: number
  /** Display name of the option type */
  displayName: string
  /** Available options for this type */
  options: Option[]
}

/**
 * Represents a product option (variant)
 */
export type Option = {
  /** Unique identifier for the option */
  uid: string
  /** SKU code for the option */
  skuCode: string
  /** Display name of the option */
  displayName: string
  /** Price in cents (or smallest currency unit) */
  price: number
}
