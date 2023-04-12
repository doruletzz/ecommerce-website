import { Product } from '@/types/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
	product: Product;
	quantity: number;
};

type CartState = {
	items: Array<CartItem>;
	totalQuantity: number;
	error: string | null;
	isFetching: boolean;
};

const initialState: CartState = {
	items: [],
	totalQuantity: 0,
	error: null,
	isFetching: false,
};

export const projectsSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<Array<CartItem>>) => {
			state.items = action.payload;
			state.totalQuantity = action.payload.reduce(
				(prev, curr) => prev + curr.quantity,
				0
			);
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setIsFetching: (state, action: PayloadAction<boolean>) => {
			state.isFetching = action.payload;
		},
		addCartItem: (state, action: PayloadAction<CartItem>) => {
			let item = state.items.find(
				(item) => item.product._id === action.payload.product._id
			);
			if (item) item.quantity += action.payload.quantity;
			else state.items.push(action.payload);

			state.totalQuantity += action.payload.quantity;
		},
		removeCartItem: (state, action: PayloadAction<CartItem>) => {
			let itemIndex = state.items.findIndex(
				(item) => item.product._id === action.payload.product._id
			);
			if (itemIndex >= 0) {
				state.totalQuantity -= Math.min(
					state.items[itemIndex].quantity,
					action.payload.quantity
				);

				state.items[itemIndex].quantity -= action.payload.quantity;

				if (state.items[itemIndex].quantity <= 0)
					state.items.splice(itemIndex, 1);
			}
		},
	},
});

export const { actions, reducer } = projectsSlice;

export const {
	setIsFetching,
	setError,
	setItems,
	removeCartItem,
	addCartItem,
} = actions;

export default reducer;
