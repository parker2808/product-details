import type { ProductDetail } from '@/modules/product/types/entities/product-detail.type'
import type { Option } from '@/modules/product/types/entities/option.type'
import { PRODUCT_OPTION } from '@/modules/product/enums/product-option.enum'

export const getOptionsByName = (productDetails: ProductDetail, name: PRODUCT_OPTION): Option[] => {
  return (
    productDetails.optionTypes.find(optionType => optionType.displayName === name)?.options || []
  )
}
