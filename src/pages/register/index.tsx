import { Register } from '@/components/auth';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import React from 'react';

const RegisterPage = () => {
	return <Register />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const supabase = createServerSupabaseClient(ctx);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	return {
		props: { session },
	};
};

export default RegisterPage;
