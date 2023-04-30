import { client } from '@/lib/sanityClient';
import { CartItem } from '@/types/CartItem';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY ?? '', {
	apiVersion: '2022-11-15',
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		try {
			const items: Array<CartItem> = req.body;

			const line_items = await Promise.all(
				items.map(async (cartItem) => {
					const getPrice = async () => {
						const query = cartItem.variant?.price
							? `*[_type == "variant" && code == "${cartItem.variant.code}"][0]{price}`
							: `*[_type == "product"][0]{price}`;

						const { price } = await client.fetch<{ price: number }>(
							query
						);

						return price;
					};

					const price = getPrice();
					console.log(await price, cartItem.variant);

					return {
						quantity: cartItem.quantity,
						price_data: {
							unit_amount:
								(await price) * cartItem.quantity * 100,
							currency: 'usd',
							product_data: {
								name: cartItem.product.name,
								description: cartItem.product.details,
							},
						},
					} as Stripe.Checkout.SessionCreateParams.LineItem;
				})
			);

			const params: Stripe.Checkout.SessionCreateParams = {
				submit_type: 'pay',
				mode: 'payment',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_options: [
					{ shipping_rate: 'shr_1N2JFbJJYUH6hWAPUn8nzf0d' },
				],
				line_items: line_items,
				success_url: `${req.headers.origin}/?success=true`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
			};
			const session = await stripe.checkout.sessions.create(params);
			res.status(200).json(session);
			// res.redirect(303, session.url);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
