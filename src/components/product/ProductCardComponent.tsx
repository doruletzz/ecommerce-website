import Link from 'next/link';
import React from 'react';

import { urlFor } from '../../lib/client';
import { Product } from '@/types/Product';
import Image from 'next/image';

type Props = {
	product: Product;
};

const Product = ({ product }: Props) => {
	return (
		<Link href={`/product/${product.slug.current}`}>
			<div className='product-card'>
				<Image
					src={urlFor(product.image && product.image[0]).url()}
					loader={() =>
						urlFor(product.image && product.image[0]).url()
					}
					width={240}
					height={240}
					alt={product.name}
					className='product-image'
				/>
				<p>{product.name}</p>
				<p>{product.price}</p>
			</div>
		</Link>
	);
};

export default Product;
