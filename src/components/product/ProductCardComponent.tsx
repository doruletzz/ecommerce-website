import Link from 'next/link';
import React from 'react';

import { urlFor } from '../../lib/client';
import { Product } from '@/types/Product';
import Image from 'next/image';
import { Button } from '../input';

type Props = {
	product: Product;
	className?: string;
};

const Product = ({ product, className }: Props) => {
	return (
		<Link
			className={`group ${className ?? ''}`}
			href={`/product/${product.slug.current}`}
		>
			<div className='flex flex-col border relative transition-all duration-700 aspect-card'>
				<Image
					src={urlFor(product.image && product.image[0]).url()}
					loader={() =>
						urlFor(product.image && product.image[0]).url()
					}
					width={120}
					height={120}
					alt={product.name}
					className='w-full flex-1 object-cover transition-all duration-1000'
				/>
				<div className='p-4 h-32 group-hover:hidden'>
					<h6 className='text-md font-bold'>{product.name}</h6>
					<p>$ {product.price}</p>
				</div>
				<div className='p-4 h-32 hidden group-hover:block '>
					{product.colors && (
						<div className='flex gap-6 mx-auto justify-center'>
							{product.colors.map((color) => (
								<div
									key={color._key}
									style={{ backgroundColor: color.value }}
									className='w-6 h-6 border rounded-md'
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};

export default Product;
