type Color = {
	_key: string;
	name: string;
	value: string;
};

type Slug = {
	_type: 'slug';
	current: string;
};

export type Product = {
	_id: number;
	name: string;
	image: Array<ReactNode>;
	slug: Slug;
	price: number;
	details: string;
	colors: Color[];
};
