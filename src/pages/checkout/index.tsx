import { Button } from '@/components/input';
import { useAppSelector } from '@/features/app/hooks';
import stripeClient from '@/lib/stripeClient';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { GetServerSideProps } from 'next';
import React, { MouseEvent } from 'react';

const CheckoutPage = () => {
	const { items } = useAppSelector((state) => state.cart);
	const user = useUser();

	const handleCheckout = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const stripe = await stripeClient();

		const res = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(items),
		});

		if (res.status === 500) return;

		const data = await res.json();

		window.location.href = data.url;
	};

	return (
		<div>
			index
			<Button id='checkout' onClick={handleCheckout}>
				buy me
			</Button>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	return {
		props: {
			initialSession: session,
			user: session.user,
		},
	};
};

export default CheckoutPage;
