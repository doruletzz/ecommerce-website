import Link from 'next/link';
import React, { useState } from 'react';

import { Product as ProductCardComponent } from '@/types/Product';
import ProductImageSliderComponent from './ProductImageSliderComponent';

type Props = {
	product: ProductCardComponent;
	className?: string;
};

const ProductCardComponent = ({ product }: Props) => {
	return (
		<div className='flex group flex-col gap-6 relative aspect-card animate-slide-up'>
			<ProductImageSliderComponent product={product} />
			<div className='h-16 w-full flex absolute bottom-0 justify-between group-hover:hidden animate-slide-up'>
				<div className='shrink'>
					<h6 className='text-md font-bold'>{product.name}</h6>
					<p className='text-sm'>{product.category}</p>
				</div>
				<h5 className='text-xl font-extrabold whitespace-nowrap text-orange-900'>
					${product.price}
				</h5>
			</div>
			<div className='hidden group-hover:block group-hover:absolute bottom-5 left-4 animate-slide-up'>
				{product.colors && (
					<div className='flex gap-4 items-center'>
						{product.colors.map((color) => (
							<div
								key={color._key}
								style={{ backgroundColor: color.value }}
								className='w-4 h-4 border rounded-md'
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductCardComponent;
