import { Banner } from '@/types/Banner';
import { Product } from '@/types/Product';

import { client } from '../lib/sanityClient';
import { GetServerSideProps } from 'next';
import { Carousel, HeroBanner } from '@/components/layout';
import { ProductCard } from '@/components/product';

type Props = {
	products: Array<Product>;
	banner: Banner;
};

const HomePage = ({ products, banner }: Props) => {
	return (
		<>
			<div className='mx-32'>
				<HeroBanner banner={banner} product={products[0]} />
				<Carousel
					pageSize='4'
					title='Best Selling Products'
					items={products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				/>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	const productsQuery =
		'*[_type == "product"]{_id, name, image, slug, price, discount, colors, category->{name}, variants[]->{code, color, size}}';
	const products = await client.fetch<Product[]>(productsQuery);

	console.log(products);

	const bannersQuery = '*[_type == "banner"]';
	const banners = await client.fetch<Banner[]>(bannersQuery);

	return {
		props: {
			products,
			banner: banners[0],
		},
	};
};

export default HomePage;
