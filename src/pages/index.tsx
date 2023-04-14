import { Banner } from '@/types/Banner';
import { Product } from '@/types/Product';

import { client } from '../lib/client';
import { GetServerSideProps } from 'next';
import { Carousel, FooterBanner, HeroBanner } from '@/components/layout';
import { ProductCard } from '@/components/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeft,
	faArrowRight,
	faMinus,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/input';

type Props = {
	products: Array<Product>;
	banner: Banner;
};

const Home = ({ products, banner }: Props) => {
	return (
		<>
			<HeroBanner banner={banner} />
			<Carousel
				title='Most Popular'
				items={products.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			/>
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
