import type { ProductDetailForm } from '@/modules/product/types/forms/product-detail-form.type'

/**
 * Calculate the total price for a product by summing all option prices and multiplying by quantity
 * @param product - The product form data containing selected options and quantity
 * @returns The total price (base options total × quantity)
 */
export const getProductPrice = (product: ProductDetailForm): number => {
  if (!product) return 0

  // Sum all option prices
  const optionsTotal =
    product.size.price +
    product.colour.price +
    product.drawerFront.price +
    product.slabtop.price +
    product.handles.price

  // Multiply by quantity to get final total
  return optionsTotal * product.quantity
}
