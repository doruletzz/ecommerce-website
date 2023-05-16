import { Product, Variant } from '@/types/Product';
import Link from 'next/link';
import React, { MouseEventHandler } from 'react';
import { ProductImageSlider } from '../product';
import { Button } from '../input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

type Props = {
	variant?: Variant | null;
	product: Product;
	quantity: number;
	onProductClick?: MouseEventHandler;
};

const CartItemComponent = ({
	product,
	variant,
	quantity,
	onProductClick,
}: Props) => {
	return (
		<div className='grid grid-cols-[12rem_1fr_1fr] grid-rows-[1fr_2rem] gap-4'>
			<div className='group relative row-span-2 aspect-card'>
				<ProductImageSlider product={product} noLink />
			</div>
			<div className='col-span-2'>
				<Link
					href={'/product/' + product.slug.current}
					onClick={onProductClick}
				>
					<h4 className='font-bold text-lg'>{product.name}</h4>
				</Link>
				<div className='text-slate-700 text-sm'>
					{variant && variant.color && (
						<p className=''>{`Color: ${variant.color.name}`}</p>
					)}
					{variant && variant.size && (
						<p>{`Size: ${variant.size}`}</p>
					)}
				</div>
				<p className='text-md font-display text-orange-700 font-bold'>
					${((variant?.price ?? product.price) * quantity).toFixed(2)}
				</p>
			</div>
			<div className='flex gap-2'>
				<Button id='trash' className='text-slate-700' variant='text'>
					<FontAwesomeIcon icon={faTrash} />
				</Button>
				<Button id='trash' className='text-slate-700' variant='text'>
					<FontAwesomeIcon icon={faPencil} />
				</Button>
			</div>
			<div className='flex items-center gap-1 ml-auto text-slate-900'>
				<p>Quantity:</p>
				<Button variant='text' id='minus' className='text-slate-700'>
					<FontAwesomeIcon icon={faMinus} />
				</Button>
				{quantity}
				<Button variant='text' id='plus' className='text-slate-700'>
					<FontAwesomeIcon icon={faPlus} />
				</Button>
			</div>
		</div>
	);
};

export default CartItemComponent;
