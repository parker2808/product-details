import type { Option } from '@/modules/product/types/entities/option.type'

export type ProductDetailForm = {
  productId: string
  size: Option
  colour: Option
  drawerFront: Option
  slabtop: Option
  handles: Option
  quantity: number
}
