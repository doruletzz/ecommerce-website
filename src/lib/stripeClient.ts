import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

console.log(process.env.NEXT_STRIPE_PUBLIC_PUBLISHABLE_KEY);

const stripeClient = () => {
	if (!stripePromise && process.env.NEXT_STRIPE_PUBLIC_PUBLISHABLE_KEY) {
		stripePromise = loadStripe(
			process.env.NEXT_STRIPE_PUBLIC_PUBLISHABLE_KEY
		);
	}

	return stripePromise;
};

export default stripeClient;
