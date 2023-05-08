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

	const [isQuickBuyHovered, setIsQuickBuyHovered] = useState<boolean>(false);

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
	}, [product, product.variants]);

	return (
		<div className='flex group flex-col gap-9 relative aspect-card animate-slide-up-and-fade-in'>
			<div
				className={`pb-16 group-hover:pb-0 h-full  transition-all duration-[1300ms] ease-in-out-expo  ${
					isQuickBuyHovered ? 'group-hover:pb-16' : ''
				}`}
			>
				<ProductImageSlider product={product} />
			</div>
			<div
				className={`h-16 pt-1 gap-2 w-full flex absolute bottom-0 justify-between ${
					isQuickBuyHovered
						? 'group-hover:flex'
						: 'group-hover:hidden'
				} animate-slide-up-and-fade-in text-left`}
			>
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
			<div
				className={`hidden pointer-events-none group-hover:flex group-hover:absolute top-4 bottom-4 flex-col justify-between ${
					isQuickBuyHovered ? 'pb-16' : ''
				} left-4 animate-slide-up-and-fade-in transition-all duration-1000 ease-in-out-expo`}
			>
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
								className={`font-display bg-slate-200 pointer-events-auto hover:scale-105 ${
									size === selectedSize
										? 'p-1 bg-slate-50'
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
								className={`aspect-square w-4 relative pointer-events-auto hover:scale-105  ${
									color.name === selectedColor?.name
										? 'border border-slate-700 rounded-full'
										: ''
								}`}
							/>
						))}
					</div>
				)}
			</div>
			<Button
				onMouseEnter={() => setIsQuickBuyHovered(true)}
				onMouseLeave={() => setIsQuickBuyHovered(false)}
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
				} group-hover:flex absolute top-4 right-1/2 py-2 px-4 font-display font-bold text-sm hover:scale-105 bg-orange-600 hover:bg-orange-500 rounded group-hover:px-2 group-hover:right-4 group-hover:translate-x-0 transition-[right_transform_width] duration-[1300ms] ease-in-out-expo translate-x-1/2`}
			>
				{product.discount && (
					<p
						className={` animate-slide-up-and-fade-in ${
							isQuickBuyHovered
								? 'group-hover:block pl-2'
								: 'group-hover:hidden'
						} block `}
					>
						{product.discount}% OFF
					</p>
				)}
				<div
					id='cart'
					className='group-hover:block w-7 hidden animate-slide-up-and-fade-in'
				>
					<FontAwesomeIcon icon={faCartShopping} />
				</div>
			</Button>
		</div>
	);
};

export default ProductCardComponent;
