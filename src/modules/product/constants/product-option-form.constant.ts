import { PRODUCT_OPTION } from '@/modules/product/enums/product-option.enum'
import type { ProductDetailForm } from '@/modules/product/types/forms/product-detail-form.type'

export const productOptionKeyMapping: Record<PRODUCT_OPTION, keyof ProductDetailForm> = {
  [PRODUCT_OPTION.SIZE]: 'size',
  [PRODUCT_OPTION.COLOUR]: 'colour',
  [PRODUCT_OPTION.DRAWER_FRONT]: 'drawerFront',
  [PRODUCT_OPTION.SLABTOP]: 'slabtop',
  [PRODUCT_OPTION.HANDLES]: 'handles'
}
