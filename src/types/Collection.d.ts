import { Product } from './Product';
import { Slug } from './Slug';

type Collection = {
	name: string;
	slug: Slug;
	products: Product[];
};
