import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import {
	Color,
	Product,
	Product as ProductCardComponent,
	Variant,
} from '@/types/Product';
import { ProductImageSlider } from '..';
import { Button } from '@/components/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@/features/app/hooks';
import { addCartItem } from '@/features/cart/slice';

type Props = {
	product: ProductCardComponent;
	className?: string;
};

const ProductCardComponent = ({ product }: Props) => {
	const dispatch = useAppDispatch();

	const [colors, setColors] = useState<Color[]>();
	const [sizes, setSizes] = useState<string[]>();

	const [selectedColor, setSelectedColor] = useState<Color>();
	const [selectedSize, setSelectedSize] = useState<string>();

	const getVariant = (color?: Color, size?: string): Variant | null => {
		let variants = product.variants;

		if (!variants) return null;

		if (color)
			variants = variants.filter(
				(variant) => variant.color._key === color._key
			);

		if (size)
			variants = variants.filter((variant) => variant.size === size);

		return variants[0];
	};

	const handleQuickBuy = (product: Product, variant?: Variant | null) => {
		dispatch(addCartItem({ product, variant, quantity: 1 }));
	};

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
			<ProductImageSlider
				product={product}
				className='pb-16 group-hover:pb-0 '
			/>
			<div className='h-16 pt-1 gap-2 w-full flex absolute bottom-0 justify-between group-hover:hidden animate-slide-up text-left'>
				<div className='shrink'>
					<h6 className='text-lg leading-tight tracking-tight font-bold font-display'>
						{product.name}
					</h6>
					<p className='text-sm'>{product.category?.name}</p>
				</div>
				<div>
					<h5 className='text-2xl font-extrabold whitespace-nowrap text-orange-900 font-display'>
						${product.price}
					</h5>

					{product.discount && (
						<p className='line-through text-right'>
							$
							{(
								(product.price / (100 - product.discount)) *
								100
							).toFixed(2)}
						</p>
					)}
				</div>
			</div>
			<div className='hidden group-hover:flex group-hover:absolute top-4 bottom-4 flex-col justify-between left-4 animate-slide-up'>
				{sizes && (
					<div
						id='sizes'
						className='flex flex-col gap-4 place-items-start'
					>
						{sizes?.map((size, index) => (
							<Button
								id={`size-${index}`}
								variant='secondary'
								key={index}
								onClick={() => setSelectedSize(size)}
								className={`font-display ${
									size === selectedSize
										? 'p-1 border border-slate-700'
										: 'p-1'
								}`}
							>
								{size}
							</Button>
						))}
					</div>
				)}
				{colors && (
					<div id='colors' className='flex gap-4 items-center'>
						{colors?.map((color, index) => (
							<Button
								variant='secondary'
								id={`color-${index}`}
								onClick={() => setSelectedColor(color)}
								key={index}
								style={{ backgroundColor: color.value }}
								className={`w-4 h-4 ${
									color.name === selectedColor?.name
										? 'p-1 border border-slate-700'
										: 'p-1'
								}`}
							/>
						))}
					</div>
				)}
			</div>
			<Button
				onClick={() =>
					handleQuickBuy(
						product,
						getVariant(selectedColor, selectedSize)
					)
				}
				variant='secondary'
				id='quickbuy'
				className={`${
					product.discount ? 'block' : 'hidden'
				} group-hover:block absolute top-4 right-1/2 py-2 px-4 font-display font-bold text-sm bg-orange-600 rounded group-hover:px-2 group-hover:right-4 group-hover:translate-x-0 transition-[right_transform] duration-[1300ms] ease-in-out-expo translate-x-1/2 `}
			>
				{product.discount && (
					<p className='group-hover:hidden block animate-slide-up'>
						{product.discount}% OFF
					</p>
				)}
				<div
					id='cart'
					className='group-hover:block w-7 hidden animate-slide-up'
				>
					<FontAwesomeIcon icon={faCartShopping} />
				</div>
			</Button>
		</div>
	);
};

export default ProductCardComponent;
