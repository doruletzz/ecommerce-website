import { Product, Variant } from '@/types/Product';
import Link from 'next/link';
import React from 'react';
import { ProductImageSlider } from '../product';
import { Button } from '../input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

type Props = {
	variant: Variant;
	product: Product;
	quantity: number;
};

const CartItemComponent = ({ product, variant, quantity }: Props) => {
	return (
		<div>
			<div className='w-96 h-[480px]'>
				<ProductImageSlider product={product} className='pb-0' />
			</div>
			<Link href={'/product/' + product.slug.current}>
				<h4>{product.name}</h4>
			</Link>
			<p>{(variant.price ?? product.price) * quantity}$</p>
			<p>{`Color: ${variant.color.name}`}</p>
			<p>{`Size: ${variant.size}`}</p>
			<div>
				<p>Quantity</p>
				<Button id='minus'>
					<FontAwesomeIcon icon={faMinus} />
				</Button>
				{quantity}
				<Button id='plus'>
					<FontAwesomeIcon icon={faPlus} />
				</Button>
			</div>
		</div>
	);
};

export default CartItemComponent;
