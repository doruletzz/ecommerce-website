import { ProductCard } from '@/components/product';
import { client } from '@/lib/sanityClient';
import { Category } from '@/types/Category';
import { Collection } from '@/types/Collection';
import { Product } from '@/types/Product';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

type Props = {
	products: Product[];
};

const Collection = ({ products }: Props) => {
	return (
		<div>
			{products && (
				<div className='grid grid-cols-6 gap-4'>
					{products?.map(
						(product) =>
							product && (
								<ProductCard
									key={product?._id}
									product={product}
								/>
							)
					)}
				</div>
			)}
		</div>
	);
};

interface StaticPropsParams extends ParsedUrlQuery {
	category: string;
	collection: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { collection } = context.params as StaticPropsParams;
	const productsByCollectionQuery = `*[_type == "collection" && slug.current == '${collection}']{products[]->{_id, name, discount, image, slug, price, colors, category->{name}, variants[]->{code, color, size}}}[0]`;
	const { products: productsByCategory } = await client.fetch<{
		products: Product[];
	}>(productsByCollectionQuery);

	console.log(productsByCategory);

	return {
		props: {
			products: productsByCategory,
		},
	};
};

export const getStaticPaths = async () => {
	const categoriesQuery = `*[_type == "category"]`;
	const categories = await client.fetch<Category[]>(categoriesQuery);

	const toReturn = await Promise.all(
		categories.map(async (category) => {
			const collectionsQuery = `*[_type == "collection" && "${category._id}" in categories[]._ref]`;
			const collections = await client.fetch<Collection[]>(
				collectionsQuery
			);

			return collections.map((collection) => ({
				params: {
					category: category.slug.current,
					collection: collection.slug.current,
				},
			}));
		})
	);

	return {
		paths: toReturn.flat(2),
		fallback: false,
	};
};

export default Collection;
