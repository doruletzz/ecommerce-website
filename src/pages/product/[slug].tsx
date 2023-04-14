import { client, urlFor } from '@/lib/client';
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
import Image from 'next/image';
import { Button } from '@/components/input';
import { ParsedUrlQuery } from 'querystring';

type Props = {
	productDetails: Product;
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
			<Image
				alt='shop-main-image'
				loader={() => urlFor(image && image[imgIndex]).url()}
				width={600}
				height={600}
				src={urlFor(image && image[imgIndex]).url()}
			/>
			<div className='grid grid-cols-2'>
				{image?.map((img, index) => (
					<Image
						className='cursor-pointer'
						alt={`shop-secondary-image-${index}`}
						key={index}
						width={200}
						height={200}
						src={urlFor(img).url()}
						loader={() => urlFor(img).url()}
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
							<button
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
							</button>
						</div>
					</div>
					<button>
						<FontAwesomeIcon icon={faCartShopping} /> Add To Cart
					</button>
					<button>
						<FontAwesomeIcon icon={faDollarSign} /> Buy Now
					</button>
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

	console.log(productDetails);

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
