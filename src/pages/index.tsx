import { Banner } from '@/types/Banner';
import { Product } from '@/types/Product';

import { client } from '../lib/client';
import { GetServerSideProps } from 'next';
import { FooterBanner, HeroBanner } from '@/components/layout';
import { ProductCard } from '@/components/product';

type Props = {
	products: Array<Product>;
	banner: Banner;
};

const Home = ({ products, banner }: Props) => {
	return (
		<>
			<HeroBanner banner={banner} />
			<div className='text-center flex flex-col p-6 gap-9'>
				<h2 className='text-4xl text-blue-800 font-bold'>
					Best Selling Products
				</h2>
				<p className='text'>Many types of keyboards</p>
			</div>
			<div>
				{products?.map((product: Product) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>
			<FooterBanner />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	const productsQuery = '*[_type == "product"]';
	const products = await client.fetch<Product[]>(productsQuery);

	const bannersQuery = '*[_type == "banner"]';
	const banners = await client.fetch<Banner[]>(bannersQuery);

	return {
		props: {
			products,
			banner: banners[0],
		},
	};
};

export default Home;
