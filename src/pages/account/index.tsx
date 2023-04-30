import { Profile } from '@/components/auth';
import { Button } from '@/components/input';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { MouseEvent, useState } from 'react';

const AccountPage = () => {
	const router = useRouter();
	const [error, setError] = useState<string>();
	const supabaseClient = useSupabaseClient();

	const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
		supabaseClient.auth
			.signOut()
			.then((res) => {
				if (res.error) setError(res.error.message);
				else router.push('/');
			})
			.catch((err) => console.error(err));
	};

	return (
		<div>
			{error}
			<Profile />
			<Button id='logout' onClick={handleLogout} variant='text'>
				Log Out
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

export default AccountPage;
