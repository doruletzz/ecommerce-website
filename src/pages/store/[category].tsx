import { ProductCard, ProductStore } from '@/components/product';
import { client } from '@/lib/sanityClient';
import { Category } from '@/types/Category';
import { Filter, FilterColor, FilterSize } from '@/types/Filter';
import { Color, Product, Variant } from '@/types/Product';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

type Props = {
	products: Array<Product>;
	filter: Filter;
	title: string;
};

const EmptyCollection = () => <div>No products found...</div>;

const Products = ({ products, filter, title }: Props) => {
	return (
		<div className='grid grid-cols-[18rem_1fr] gap-4'>
			<h4 className='col-start-2 text-2xl font-display font-bold text-slate-700'>
				{title}
			</h4>
			{products?.length > 0 ? (
				<ProductStore filter={filter} products={products} />
			) : (
				<EmptyCollection />
			)}
		</div>
	);
};

interface StaticPropsParams extends ParsedUrlQuery {
	category: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { category } = context.params as StaticPropsParams;
	const productsByCategoryQuery = `*[_type == "product" && category->slug.current == '${category}']{_id, name, brand, discount, image, slug, price, category->{name}, variants[]->{code, color, size}}`;
	const productsByCategory = await client.fetch<Product[]>(
		productsByCategoryQuery
	);

	const allProductsSizesAndColorsQuery = `*[_type == "product"]{variants[]->{color, size}}`;
	const allProductsSizesAndColors = await client.fetch<
		{
			variants: Variant[] | null;
		}[]
	>(allProductsSizesAndColorsQuery);

	const titleQuery = `*[_type == "category" && slug.current == '${category}'][0]{name}`;
	const { name: title } = await client.fetch<Category>(titleQuery);

	let sizes: FilterSize[] = [];
	let colors: FilterColor[] = [];
	let brands: string[] = [];

	allProductsSizesAndColors.forEach((product) =>
		product.variants?.forEach((variant) => {
			if (
				sizes.filter((size) => size.value === variant.size).length === 0
			)
				sizes.push({ value: variant.size, disabled: false });
			if (
				colors.filter(
					(color) => color.value.name === variant.color.name
				).length === 0
			)
				colors.push({ value: variant.color, disabled: false });
		})
	);

	productsByCategory.forEach((product) => {
		if (product.brand && !brands.includes(product.brand))
			brands.push(product.brand);

		product.variants?.forEach((variant) => {
			const sizeIndex = sizes.findIndex(
				(size) => size.value === variant.size
			);

			if (sizeIndex) sizes[sizeIndex].disabled = false;

			const colorIndex = colors.findIndex(
				(color) => color.value.name === variant.color.name
			);

			if (colorIndex) colors[colorIndex].disabled = false;
		});
	});

	const filter: Filter = {
		brands,
		colors,
		sizes,
	};

	return {
		props: {
			products: productsByCategory,
			filter,
			title,
		},
	};
};

export const getStaticPaths = async () => {
	const query = `*[_type == "category"]`;
	const categories = await client.fetch<Category[]>(query);

	console.log(categories);

	return {
		paths: categories.map((category) => ({
			params: { category: category.slug.current },
		})),
		fallback: true,
	};
};

export default Products;
