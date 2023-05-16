import { Color, Product } from '@/types/Product';
import React, { useEffect, useState } from 'react';
import SideBarComponent from './SideBarComponent';
import { ProductCard } from '..';
import { Filter, Sort } from '@/types/Filter';

type Props = {
	products: Product[];
	filter: Filter;
};

const ProductStoreComponent = ({ filter, products }: Props) => {
	const [selectedFilter, setSelectedFilter] = useState<Filter>();

	useEffect(() => {
		setSelectedFilter({});
	}, [filter]);

	useEffect(() => {
		console.log(selectedFilter);
	}, [selectedFilter]);

	const filterByBrand = (products: Product[]): Product[] =>
		selectedFilter && selectedFilter.brands?.length
			? products.filter((product) =>
					selectedFilter?.brands?.includes(product.brand || '')
			  )
			: products;

	const fitlerBySize = (products: Product[]): Product[] =>
		selectedFilter && selectedFilter.sizes?.length
			? products.filter((product) =>
					product.variants?.find((variant) =>
						selectedFilter?.sizes?.filter(
							(size) => size.value === variant.size || ''
						)
					)
			  )
			: products;

	const filterByColor = (products: Product[]): Product[] =>
		selectedFilter && selectedFilter.colors?.length
			? products.filter((product) =>
					product.variants?.find((variant) =>
						selectedFilter?.colors?.filter(
							(color) =>
								color.value.name === variant.color.name || ''
						)
					)
			  )
			: products;

	const filterProducts = (products: Product[]) => {
		let filteredProducts = filterByBrand(products);
		filteredProducts = filterByColor(filteredProducts);
		filteredProducts = fitlerBySize(filteredProducts);

		return filteredProducts;
	};

	const sortFn = (sortType?: Sort) => {
		if (sortType === 'ascending')
			return (p1: Product, p2: Product) => p1.price - p2.price;
		if (sortType === 'descending')
			return (p1: Product, p2: Product) => p2.price - p1.price;

		return (p1: Product, p2: Product) => -1;
	};

	return (
		<>
			<SideBarComponent
				filter={filter}
				selected={selectedFilter}
				setSelected={setSelectedFilter}
			/>
			<div
				id='products'
				className='grid grid-cols-5 gap-4 flex-1 transition-all duration-700'
			>
				{filterProducts(products)
					.sort(
						sortFn(
							selectedFilter?.sort
								? selectedFilter?.sort[0]
								: undefined
						)
					)
					.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
			</div>
		</>
	);
};

export default ProductStoreComponent;
