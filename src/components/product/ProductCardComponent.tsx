import Link from 'next/link';
import React, { useState } from 'react';

import { urlFor } from '../../lib/client';
import { Product as ProductCardComponent } from '@/types/Product';
import Image from 'next/image';
import { Button } from '../input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
	product: ProductCardComponent;
	className?: string;
};

const ProductCardComponent = ({ product, className }: Props) => {
	const [imgIndex, setImgIndex] = useState(0);

	return (
		<div className='flex flex-col gap-6 relative transition-all duration-700 aspect-card'>
			<div className='group w-full flex-1 object-cover relative'>
				<div className='hidden pointer-events-none group-hover:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full justify-between'>
					<Button
						id='go-arrow'
						className={`p-6 pointer-events-auto text-slate-300 hover:text-slate-100 text-opacity-${
							imgIndex === 0 ? '50' : '100'
						}`}
						onClick={() =>
							setImgIndex((prev) => Math.max(0, prev - 1))
						}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					<Button
						id='go-arrow'
						className={`p-6 pointer-events-auto text-slate-300 hover:text-slate-100 text-opacity-${
							imgIndex === product.image.length - 1 ? '50' : '100'
						}`}
						onClick={() =>
							setImgIndex((prev) =>
								Math.min(product.image.length - 1, prev + 1)
							)
						}
					>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
				<ul className='hidden absolute bottom-6 group-hover:flex gap-4 left-1/2 transform -translate-x-1/2'>
					{product.image?.map((_, i) => (
						<li
							key={i}
							className={`w-1 h-1 rounded-full bg-slate-${
								i === imgIndex ? '700' : '400'
							}`}
						/>
					))}
				</ul>
				<Link
					className={`group ${className ?? ''}`}
					href={`/product/${product.slug.current}`}
				>
					<Image
						src={urlFor(
							product.image && product.image[imgIndex]
						).url()}
						loader={() =>
							urlFor(
								product.image && product.image[imgIndex]
							).url()
						}
						width={120}
						height={120}
						alt={product.name}
						className='w-full h-full object-cover'
					/>
				</Link>
			</div>
			<div className='h-16 flex justify-between group-hover:hidden'>
				<div>
					<Link
						className='text-md font-bold'
						href={`/product/${product.slug.current}`}
					>
						<h6>{product.name}</h6>
					</Link>
					<h6 className='text-sm'>{product.category}</h6>
				</div>
				<p className='text-md'>$ {product.price}</p>
			</div>
			<div className='h-16 hidden group-hover:block '>
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
