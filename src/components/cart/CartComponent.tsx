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
		<div className='min-w-256 flex h-full flex-col items-baseline gap-4 overflow-hidden p-4'>
			<h6 className='font-display text-sm font-bold text-slate-600'>
				Your Cart
			</h6>
			<div className='h-[1px] w-full bg-slate-700' />

			<div
				id='products'
				className={`flex-0 flex max-h-128 w-full flex-col gap-2 overflow-auto`}
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
				<Button id='checkout' className='h-8 w-full' onClick={onClose}>
					Proceed to checkout{' '}
					{totalQuantity ? `(${totalQuantity})` : ''}
				</Button>
			</Link>

			{isModal && (
				<Link id='checkout' href='/cart' className='w-full'>
					<Button
						id='checkout'
						variant='secondary'
						className='h-8 w-full'
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
