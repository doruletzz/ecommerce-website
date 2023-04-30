import { Product, Variant } from './Product';

export type CartItem = {
	product: Product;
	variant?: Variant | null;
	quantity: number;
};
