import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBarComponent';
import { Product } from '@/types/Product';
import { client } from '@/lib/sanityClient';

const SearchBoxComponent = () => {
	const [value, setValue] = useState('');
	const [products, setProducts] = useState<Array<Product>>([]);

	useEffect(() => {
		const fetchProducts = async (value: string) => {
			const productQuery = `*[_type == "product" && (name match "${value}*" || details match "${value}*")]`;
			const products = await client.fetch<Array<Product>>(productQuery);
			setProducts(products);
		};

		if (value) fetchProducts(value);
		else setProducts([]);
	}, [value]);

	return (
		<div>
			<h6>Searching...</h6>
			<SearchBar value={value} setValue={setValue} />
			{products?.map((product) => (
				<div key={product._id}>{product.name}</div>
			))}
		</div>
	);
};

export default SearchBoxComponent;
