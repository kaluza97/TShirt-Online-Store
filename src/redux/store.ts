import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/redux/slices/Products/Products.slice';
import cartReducer from '@/redux/slices/Cart/Cart.slice';
import productByIdReducer from '@/redux/slices/Product/Product.slice';
import ordersReducer from '@/redux/slices/Orders/Orders.slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productById: productByIdReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
