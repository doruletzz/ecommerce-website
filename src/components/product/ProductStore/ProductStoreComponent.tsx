import { Color, Product } from '@/types/Product';
import React, { useEffect, useState } from 'react';
import FilterComponent from './FilterComponent';
import { ProductCard } from '..';
import { Filter, Sort } from '@/types/Filter';
import { Collection } from '@/types/Collection';
import { Category } from '@/types/Category';
import { Button } from '@/components/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSliders } from '@fortawesome/free-solid-svg-icons';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { Modal } from '@/components/layout';

type Props = {
	products: Product[];
	collections: Collection[];
	filter: Filter;
	category: Category;
};

const ProductStoreComponent = ({
	filter,
	products,
	collections,
	category,
}: Props) => {
	const [width] = useWindowDimensions();
	const [selectedFilter, setSelectedFilter] = useState<Filter>();
	const [showFilter, setShowFilter] = useState(false);

	useEffect(() => {
		setSelectedFilter({});
	}, [filter]);

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
			<div
				id='products'
				className='grid flex-1 grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'
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
			{width <= 640 ? (
				showFilter && (
					<Modal onBackdropClick={() => setShowFilter(false)}>
						<h4 className='mb-4 font-display text-xl font-bold text-slate-600'>
							{category.name}
						</h4>
						<FilterComponent
							category={category}
							collections={collections}
							filter={filter}
							selected={selectedFilter}
							setSelected={setSelectedFilter}
						/>
					</Modal>
				)
			) : (
				<FilterComponent
					category={category}
					collections={collections}
					filter={filter}
					selected={selectedFilter}
					setSelected={setSelectedFilter}
				/>
			)}
			{width <= 640 && !showFilter && (
				<div className='fixed bottom-8 left-1/2 -translate-x-1/2'>
					<Button
						id='fab'
						className='animate-slide-up-and-fade-in px-4 py-2'
						onClick={() => setShowFilter(true)}
					>
						<FontAwesomeIcon icon={faSliders} />
						Filter
					</Button>
				</div>
			)}
		</>
	);
};

export default ProductStoreComponent;
