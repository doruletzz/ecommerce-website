import { Banner } from '@/types/Banner';
import { Product } from '@/types/Product';

import { client } from '../lib/sanityClient';
import { GetServerSideProps } from 'next';
import { Carousel, HeroBanner } from '@/components/layout';
import { ProductCard } from '@/components/product';
import { Collection } from '@/types/Collection';

type Props = {
	bestSellingCollection: Collection;
	banner: Banner;
};

const HomePage = ({ bestSellingCollection, banner }: Props) => {
	return (
		<>
			<div className='mx-32'>
				<HeroBanner
					banner={banner}
					product={bestSellingCollection?.products[0]}
				/>
				<Carousel
					pageSize='4'
					title={bestSellingCollection.name}
					items={bestSellingCollection.products.map((product) => (
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

	const bestSellingProductsQuery =
		'*[_type == "collection" && slug.current == "best-selling"]{name, products[]->{_id, name, image, slug, price, discount, colors, category->{name}, variants[]->{code, color, size}}}[0]';

	const bestSelling = await client.fetch<Collection>(
		bestSellingProductsQuery
	);

	const bannerQuery = '*[_type == "banner"][0]';
	const banner = await client.fetch<Banner>(bannerQuery);

	return {
		props: {
			bestSellingCollection: bestSelling,
			banner: banner,
		},
	};
};

export default HomePage;
