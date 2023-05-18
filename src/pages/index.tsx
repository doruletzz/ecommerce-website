import { Banner } from '@/types/Banner';
import { Product } from '@/types/Product';

import { client } from '../lib/sanityClient';
import { GetServerSideProps } from 'next';
import { Carousel, HeroBanner } from '@/components/layout';
import { ProductCard } from '@/components/product';
import { Collection } from '@/types/Collection';

type Props = {
	bestSellingCollection: Collection;
	trendingCollection: Collection;
	banner: Banner;
};

const HomePage = ({
	bestSellingCollection,
	trendingCollection,
	banner,
}: Props) => {
	return (
		<>
			<div className='relative flex flex-col gap-12 px-32'>
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
				<Carousel
					pageSize='3'
					title={trendingCollection.name}
					items={trendingCollection.products.map((product) => (
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

	const trendingProductsQuery =
		'*[_type == "collection" && slug.current == "trending"]{name, products[]->{_id, name, image, slug, price, discount, colors, category->{name}, variants[]->{code, color, size}}}[0]';
	const trending = await client.fetch<Collection>(trendingProductsQuery);

	const bannerQuery = '*[_type == "banner"][0]';
	const banner = await client.fetch<Banner>(bannerQuery);

	return {
		props: {
			trendingCollection: trending,
			bestSellingCollection: bestSelling,
			banner: banner,
		},
	};
};

export default HomePage;
