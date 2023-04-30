import { useAppSelector } from '@/features/app/hooks';
import React from 'react';
import CartItem from './CartItemComponent';
import Link from 'next/link';

type Props = {
	isModal?: boolean;
};

const Cart = ({ isModal = false }: Props) => {
	const { items, totalQuantity } = useAppSelector((state) => state.cart);

	return (
		<div className='h-full flex flex-col overflow-hidden gap-4'>
			<div>
				<h6>Cart</h6>
			</div>
			<div id='products' className='overflow-auto flex-0'>
				{items?.map((item, index) => (
					<CartItem
						key={index}
						variant={item.variant}
						product={item.product}
						quantity={item.quantity}
					/>
				))}
			</div>
			<div id='total'></div>
			<Link id='checkout' href='/checkout'>
				Proceed to checkout {totalQuantity ? `(${totalQuantity})` : ''}
			</Link>
			{isModal && <div id='checkout'>View Cart</div>}
		</div>
	);
};

export default Cart;
