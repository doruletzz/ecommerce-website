import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Color, Product as ProductCardComponent } from '@/types/Product';
import { ProductImageSlider } from '..';
import { Button } from '@/components/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons';

type Props = {
	product: ProductCardComponent;
	className?: string;
};

const ProductCardComponent = ({ product }: Props) => {
	const [colors, setColors] = useState<Color[]>();
	const [sizes, setSizes] = useState<string[]>();

	useEffect(() => {
		if (product && product.variants) {
			const uniqueColors = product.variants
				.map((variant) => variant.color)
				.filter(
					(value, index, self) =>
						self.map((color) => color.name).indexOf(value.name) ===
						index
				);

			const uniqueSizes = product.variants
				.map((variant) => variant.size)
				.filter((value, index, self) => self.indexOf(value) === index);

			setColors(uniqueColors);
			setSizes(uniqueSizes);
		}
	}, [product.variants]);

	return (
		<div className='flex group flex-col gap-9 relative aspect-card animate-slide-up'>
			<ProductImageSlider product={product} />
			<div className='h-16 pt-1 w-full flex absolute bottom-0 justify-between group-hover:hidden animate-slide-up'>
				<div className='shrink'>
					<h6 className='text-md font-bold'>{product.name}</h6>
					<p className='text-sm'>{product.category?.name}</p>
				</div>
				<h5 className='text-xl font-extrabold whitespace-nowrap text-orange-900'>
					${product.price}
				</h5>
			</div>
			<div className='hidden group-hover:block group-hover:absolute bottom-5 left-4 animate-slide-up'>
				{colors && (
					<div id='colors' className='flex gap-4 items-center'>
						{colors?.map((color, index) => (
							<div
								key={index}
								style={{ backgroundColor: color.value }}
								className='w-4 h-4 border rounded-md'
							/>
						))}
					</div>
				)}
				{sizes && (
					<div id='sizes' className='flex gap-4 items-center'>
						{sizes?.map((size, index) => (
							<div
								key={index}
								className='w-4 h-4 border rounded-md'
							>
								{size}
							</div>
						))}
					</div>
				)}
			</div>
			<div
				id='quickbuy'
				className='hidden group-hover:block group-hover:absolute bottom-5 right-4 animate-slide-up'
			>
				<Button id='cart'>
					<FontAwesomeIcon icon={faCartShopping} />
				</Button>
			</div>
		</div>
	);
};

export default ProductCardComponent;
