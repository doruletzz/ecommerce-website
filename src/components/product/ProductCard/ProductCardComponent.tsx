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
		<div className='group relative flex aspect-card animate-slide-up-and-fade-in flex-col gap-9 duration-100 ease-in-out-expo active:scale-[99%] '>
			<div
				className={`h-full pb-16 transition-all  duration-[1300ms] ease-in-out-expo group-hover:pb-0 ${
					isQuickBuyHovered ? 'group-hover:pb-16' : ''
				}`}
			>
				<ProductImageSlider product={product} />
			</div>
			<div
				className={`absolute bottom-0 flex h-16 w-full justify-between gap-2 pt-1 ${
					isQuickBuyHovered
						? 'group-hover:flex'
						: 'group-hover:hidden'
				} animate-slide-up-and-fade-in text-left`}
			>
				<div className='shrink'>
					<h6 className='text-lg font-bold leading-tight tracking-tight'>
						{product.name}
					</h6>
					<p className='text-sm'>{product.category?.name}</p>
				</div>
				<div>
					<h5 className='whitespace-nowrap font-display text-2xl font-extrabold text-orange-900'>
						${product.price}
					</h5>

					{product.discount && (
						<p className='text-right line-through'>
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
				className={`pointer-events-none bottom-4 top-4 hidden flex-col justify-between group-hover:absolute group-hover:flex ${
					isQuickBuyHovered ? 'pb-16' : ''
				} left-4 animate-slide-up-and-fade-in transition-all duration-1000 ease-in-out-expo`}
			>
				{sizes && (
					<div
						id='sizes'
						className='flex flex-col place-items-start gap-4'
					>
						{sizes?.map((size, index) => (
							<Button
								id={`size-${index}`}
								variant='secondary'
								key={index}
								onClick={() => setSelectedSize(size)}
								className={`pointer-events-auto bg-slate-200 font-display hover:scale-105 ${
									size === selectedSize
										? 'bg-slate-50 p-1'
										: 'p-1'
								}`}
							>
								{size}
							</Button>
						))}
					</div>
				)}
				{colors && (
					<div id='colors' className='flex items-center gap-4'>
						{colors?.map((color, index) => (
							<Button
								variant='secondary'
								id={`color-${index}`}
								onClick={() => setSelectedColor(color)}
								key={index}
								style={{ backgroundColor: color.value }}
								className={`pointer-events-auto relative aspect-square w-4 hover:scale-105  ${
									color.name === selectedColor?.name
										? 'rounded-full border border-slate-700'
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
				} absolute right-1/2 top-4 translate-x-1/2 rounded bg-orange-600 px-4 py-2 text-sm transition-[right_transform_width] duration-[1300ms] ease-in-out-expo hover:scale-105 hover:bg-orange-500 group-hover:right-4 group-hover:flex group-hover:translate-x-0 group-hover:px-2`}
			>
				{product.discount && (
					<p
						className={` animate-slide-up-and-fade-in ${
							isQuickBuyHovered
								? 'pl-2 group-hover:block'
								: 'group-hover:hidden'
						} block `}
					>
						{product.discount}% OFF
					</p>
				)}
				<div
					id='cart'
					className='hidden w-7 animate-slide-up-and-fade-in group-hover:block'
				>
					<FontAwesomeIcon icon={faCartShopping} />
				</div>
			</Button>
		</div>
	);
};

export default ProductCardComponent;
