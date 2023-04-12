import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import cartReducer from '../cart/slice';

export const store = configureStore({
	reducer: { cart: cartReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
