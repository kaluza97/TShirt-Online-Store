import {
  ProductType,
  productsListSchema,
} from '@/components/Products/Products.types';
import { firestore } from '@/firebase/firebaseConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  query,
  collection,
  getDocs,
  where,
  or,
  limit,
} from 'firebase/firestore';
import { FetchProductsArgs } from '@/redux/slices/Products/Products.types';

export const fetchProducts = createAsyncThunk<
  Array<ProductType>,
  FetchProductsArgs
>(
  'products/fetchProducts',
  async ({ categoryQuery, itemsLimit }: FetchProductsArgs) => {
    const queryConditions = categoryQuery.map((query) =>
      where(query.fieldPath, query.opStr, query.value)
    );

    const dataRef = query(
      collection(firestore, 'shirts'),
      or(...queryConditions),
      limit(itemsLimit)
    );

    const snapshot = await getDocs(dataRef);
    const data = snapshot.docs.map((doc) => doc.data());
    const validatedData = productsListSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error('Error in data retrieved from Firestore');
    }
    return validatedData.data;
  }
);
