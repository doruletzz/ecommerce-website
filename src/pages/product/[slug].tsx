import { client, useNextImage } from '@/lib/sanityClient';
import { Banner } from '@/types/Banner';
import { Product } from '@/types/Product';
import {
	faCartShopping,
	faDollarSign,
	faMinus,
	faPlus,
	faRankingStar,
	faStar,
	faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps } from 'next';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/features/app/hooks';
import { addCartItem, removeCartItem } from '@/features/cart/slice';
import Image, { ImageProps } from 'next/image';
import { Button } from '@/components/input';
import { ParsedUrlQuery } from 'querystring';
import imageLoader from '@/utils/imageLoader';
import { Carousel } from '@/components/layout';
import { Rating } from '@/components/product';

type Props = {
	productDetails: Product;
};

type NextImageProps = ImageProps & {
	image: string;
};

const NextImage = (props: NextImageProps) => {
	const imageProps = useNextImage(props.image);

	return (
		<Image
			{...props}
			loader={imageProps.loader}
			width={imageProps.width}
			height={imageProps.height}
			src={imageProps.src}
		/>
	);
};

const ProductDetailsPage = ({ productDetails }: Props) => {
	const { _id, image, name, details, price, variants } = productDetails;

	const [quantity, setQuantity] = useState(1);

	const dispatch = useAppDispatch();

	const [imgIndex, setImgIndex] = useState(0);
	const [prevImgIndex, setPrevImgIndex] = useState(0);

	const handleImageClick = (
		e: MouseEvent<HTMLImageElement>,
		index: number
	) => {
		setPrevImgIndex(index);
	};

	const handleImageMouseEnter = (
		e: MouseEvent<HTMLImageElement>,
		index: number
	) => {
		setPrevImgIndex(imgIndex);
		setImgIndex(index);
	};

	const handleImageMouseLeave = (e: MouseEvent<HTMLImageElement>) => {
		setImgIndex(prevImgIndex);
	};

	return (
		<div className='grid grid-cols-2'>
			<div className='flex flex-col'>
				<NextImage
					src={image[imgIndex]}
					image={image[imgIndex]}
					alt='shop-main-image'
					priority
				/>
				<Carousel
					pageSize='6'
					items={image?.map((img, index) => (
						<NextImage
							src={img}
							image={img}
							className='cursor-pointer'
							alt={`shop-secondary-image-${index}`}
							key={index}
							onMouseEnter={(e) =>
								handleImageMouseEnter(e, index)
							}
							onMouseLeave={(e) => handleImageMouseLeave(e)}
							onClick={(e) => handleImageClick(e, index)}
						/>
					))}
				/>
			</div>
			<div>
				<h1>{name}</h1>
				<div>
					<Rating
						rating={4}
						onRate={(rating) => console.log(rating)}
					/>
					<p>(20)</p>
					<p>Details:</p>
					<p>{details}</p>
					<p>{price}</p>
					<div>
						<h3>Quantity:</h3>
						<div>
							<Button
								variant='secondary'
								id='remove item'
								onClick={() =>
									setQuantity((prev) => Math.max(prev - 1, 1))
								}
							>
								<FontAwesomeIcon icon={faMinus} />
							</Button>
							{quantity}
							<Button
								variant='secondary'
								id='add item'
								onClick={() => setQuantity((prev) => prev + 1)}
							>
								<FontAwesomeIcon icon={faPlus} />
							</Button>
						</div>
					</div>
					<Button
						id='add to cart'
						onClick={() =>
							dispatch(
								addCartItem({
									variant: productDetails.variants[0],
									product: productDetails,
									quantity: quantity,
								})
							)
						}
					>
						<FontAwesomeIcon icon={faCartShopping} /> Add To Cart
					</Button>
					<Button variant='secondary' id='buy now'>
						<FontAwesomeIcon icon={faDollarSign} /> Buy Now
					</Button>
					<div>
						{variants?.map((variant) => (
							<div
								key={variant?.color?._key}
								style={{
									backgroundColor: variant?.color?.value,
								}}
							>
								{variant?.color?.name}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

interface StaticPropsParams extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { slug } = context.params as StaticPropsParams;

	const productDetailsQuery = `*[_type == "product" && slug.current == '${slug}'][0]{
		_id, name, image, slug, price, details, colors, category->{name}, variants[]->{color, size}
	}`;

	const productDetails = await client.fetch<Product>(productDetailsQuery);

	return {
		props: {
			productDetails,
		},
	};
};

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
		slug {
			current
		}
	}`;
	const products = await client.fetch<Product[]>(query);
	return {
		paths: products.map((product) => ({
			params: { slug: product.slug.current },
		})),
		fallback: 'blocking',
	};
};

export default ProductDetailsPage;
