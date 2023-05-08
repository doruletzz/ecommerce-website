import { ProductCard } from '@/components/product';
import { client } from '@/lib/sanityClient';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

type Props = {
	products: Array<Product>;
};

const Products = ({ products }: Props) => {
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
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { category } = context.params as StaticPropsParams;
	const productsByCategoryQuery = `*[_type == "product" && category->slug.current == '${category}']{_id, name, discount, image, slug, price, colors, category->{name}, variants[]->{code, color, size}}`;
	const productsByCategory = await client.fetch<Product[]>(
		productsByCategoryQuery
	);

	return {
		props: {
			products: productsByCategory,
		},
	};
};

export const getStaticPaths = async () => {
	const query = `*[_type == "category"]`;
	const categories = await client.fetch<Category[]>(query);

	return {
		paths: categories.map((category) => ({
			params: { category: category.slug.current },
		})),
		fallback: true,
	};
};

export default Products;
