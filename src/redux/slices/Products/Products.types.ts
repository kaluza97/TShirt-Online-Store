import { ProductType } from '@/components/Products/Products.types';
import { FieldPath, WhereFilterOp } from 'firebase/firestore';

export interface ProductsState {
  data: Array<ProductType>;
  loading: boolean;
  error: boolean;
}

type CategoryValue = string | number | null;

export type CategoryQuery = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: CategoryValue | Array<CategoryValue>;
};

export type FetchProductsArgs = {
  categoryQuery: Array<CategoryQuery>;
  itemsLimit: number;
};
