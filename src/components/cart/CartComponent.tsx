import { useAppSelector } from '@/features/app/hooks';
import React, { MouseEventHandler } from 'react';
import CartItem from './CartItemComponent';
import Link from 'next/link';
import { Button } from '../input';
import EmptyCartComponent from './EmptyCartComponent';
import { Br } from '../layout';

type Props = {
	isModal?: boolean;
	onClose?: MouseEventHandler;
};

const Cart = ({ isModal = false, onClose }: Props) => {
	const { items, totalQuantity } = useAppSelector((state) => state.cart);

	if (totalQuantity === 0) return <EmptyCartComponent />;

	return (
		<div className='h-full flex flex-col overflow-hidden gap-4 items-baseline w-256 p-4'>
			<h6 className='text-sm text-slate-600 font-bold font-display'>
				Your Cart
			</h6>
			<div className='w-full h-[1px] bg-slate-700' />

			<div
				id='products'
				className={`overflow-auto flex-0 max-h-128 w-full flex flex-col gap-2`}
			>
				{items?.map((item, index) => (
					<CartItem
						key={index}
						variant={item.variant}
						product={item.product}
						quantity={item.quantity}
						onProductClick={onClose}
					/>
				))}
			</div>
			<Br />
			<div id='total'>$359.99</div>
			<Br />
			<Link id='checkout' href='/checkout' className='w-full'>
				<Button id='checkout' className='w-full h-8' onClick={onClose}>
					Proceed to checkout{' '}
					{totalQuantity ? `(${totalQuantity})` : ''}
				</Button>
			</Link>

			{isModal && (
				<Link id='checkout' href='/cart' className='w-full'>
					<Button
						id='checkout'
						variant='secondary'
						className='w-full h-8'
						onClick={onClose}
					>
						View Cart
					</Button>
				</Link>
			)}
		</div>
	);
};

export default Cart;
