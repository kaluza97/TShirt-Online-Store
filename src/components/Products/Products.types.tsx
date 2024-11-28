import { CategoryQuery } from '@/redux/slices/Products/Products.types';
import { z } from 'zod';

const sizeSchema = z.object({
  S: z.number(),
  M: z.number(),
  L: z.number(),
  XL: z.number(),
});

export const productSchema = z.object({
  category: z.string().optional(),
  id: z.number(),
  img: z.string(),
  name: z.string(),
  price: z.number(),
  specialPrice: z.number().optional(),
  totalQuantity: sizeSchema.optional(),
});

export const productsListSchema = z.array(productSchema);
export type ProductType = z.infer<typeof productSchema>;

export interface ProductItemsProps {
  id: number;
  img: string;
  name: string;
  price: number;
  specialPrice?: number;
  isFavorite: boolean | null | undefined;
}

export interface ProductDetailProps {
  id: number;
}

export interface ProductDetailFormProps {
  id: number;
}

export interface ProductsListProps {
  categoryQuery: Array<CategoryQuery>;
  isPaginate: boolean;
}

export interface displayPriceOrSpecialPriceProps {
  price: number;
  specialPrice?: number;
}
