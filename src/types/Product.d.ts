import { Category } from './Category';
import { Slug } from './Slug';

interface Color {
	_key: string;
	name: string;
	value: string;
}

type Variant = {
	name: string;
	code: string;
	slug: Slug;
	images: string;
	color: Color;
	size: string;
	price: number;
	amount_left: number;
};

export type Product = {
	_id: string;
	brand?: string;
	category: Category;
	name: string;
	image: Array<string>;
	slug: Slug;
	price: number;
	discount?: number;
	details: string;
	variants: Variant[] | null;
};
