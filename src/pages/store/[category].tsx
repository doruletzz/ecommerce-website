import { Grid } from '@/components/layout';
import { ProductCard } from '@/components/product';
import { client } from '@/lib/client';
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
				<Grid>
					{products?.map(
						(product) =>
							product && (
								<ProductCard
									key={product?._id}
									product={product}
								/>
							)
					)}
				</Grid>
			)}
		</div>
	);
};

interface StaticPropsParams extends ParsedUrlQuery {
	category: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { category } = context.params as StaticPropsParams;
	console.log(category);
	const productsByCategoryQuery = `*[_type == "product" && category == '${category}']`;
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
	const query = `*[_type == "product"] {
		category
	}`;

	const products = await client.fetch<Product[]>(query);
	console.log(products);
	return {
		paths: products.map((product) => ({
			params: { category: product.category },
		})),
		fallback: true,
	};
};

export default Products;
