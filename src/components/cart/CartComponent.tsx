import { useAppSelector } from '@/features/app/hooks';
import React from 'react';
import CartItem from './CartItemComponent';

type Props = {};

const Cart = () => {
	const { items, totalQuantity } = useAppSelector((state) => state.cart);

	return (
		<div>
			<h6>Cart</h6>
			<div id='products'>
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
			<div id='checkout'>
				Proceed to checkout {totalQuantity ? `(${totalQuantity})` : ''}
			</div>
		</div>
	);
};

export default Cart;
