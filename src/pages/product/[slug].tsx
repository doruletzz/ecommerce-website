import { client, useNextImage } from '@/lib/client';
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
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps } from 'next';
import React, { MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/features/app/hooks';
import { addCartItem, removeCartItem } from '@/features/cart/slice';
import Image, { ImageProps } from 'next/image';
import { Button } from '@/components/input';
import { ParsedUrlQuery } from 'querystring';
import imageLoader from '@/utils/imageLoader';

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

const ProductDetails = ({ productDetails }: Props) => {
	const { _id, image, name, details, price, colors } = productDetails;

	const dispatch = useAppDispatch();
	const { items } = useAppSelector((state) => state.cart);

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
		<div>
			<NextImage
				src={image[imgIndex]}
				image={image[imgIndex]}
				alt='shop-main-image'
				priority
			/>
			<div className='grid grid-cols-6'>
				{image?.map((img, index) => (
					<NextImage
						src={img}
						image={img}
						className='cursor-pointer'
						alt={`shop-secondary-image-${index}`}
						key={index}
						onMouseEnter={(e) => handleImageMouseEnter(e, index)}
						onMouseLeave={(e) => handleImageMouseLeave(e)}
						onClick={(e) => handleImageClick(e, index)}
					/>
				))}
			</div>
			<div>
				<h1>{name}</h1>
				<div>
					<div>
						<FontAwesomeIcon icon={faStar} />
						<FontAwesomeIcon icon={faStar} />
						<FontAwesomeIcon icon={faStar} />
						<FontAwesomeIcon icon={faStarOutline} />
						<FontAwesomeIcon icon={faStarOutline} />
					</div>
					<p>(20)</p>
					<p>Details:</p>
					<p>{details}</p>
					<p>{price}</p>
					<div>
						<h3>Quantity:</h3>
						<div>
							<Button
								id='remove item'
								onClick={() =>
									dispatch(
										removeCartItem({
											product: productDetails,
											quantity: 1,
										})
									)
								}
							>
								<FontAwesomeIcon icon={faMinus} />
							</Button>
							{items?.find((item) => item.product?._id === _id)
								?.quantity ?? 0}
							<Button
								id='add item'
								onClick={() =>
									dispatch(
										addCartItem({
											product: productDetails,
											quantity: 1,
										})
									)
								}
							>
								<FontAwesomeIcon icon={faPlus} />
							</Button>
						</div>
					</div>
					<Button id='add to cart'>
						<FontAwesomeIcon icon={faCartShopping} /> Add To Cart
					</Button>
					<Button id='buy now'>
						<FontAwesomeIcon icon={faDollarSign} /> Buy Now
					</Button>
					<div>
						{colors?.map((color) => (
							<div
								key={color._key}
								style={{ backgroundColor: color.value }}
							>
								{color.name}
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

	const productDetailsQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
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

export default ProductDetails;
