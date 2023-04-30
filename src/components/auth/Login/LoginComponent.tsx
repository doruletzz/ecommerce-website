import { Button, Field } from '@/components/input';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { MouseEvent, useEffect, useState } from 'react';

const LoginComponent = () => {
	const supabaseClient = useSupabaseClient();
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const [emailError, setEmailError] = useState('');
	const [error, setError] = useState('');

	const validateEmail = (email: string): string | undefined => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
			return 'Invalid Email Address';
	};

	const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const emailError = validateEmail(email);
		setEmailError(email);

		if (!emailError)
			supabaseClient.auth
				.signInWithPassword({
					email: email,
					password: password,
				})
				.then((res) => {
					if (res.error) setError(res.error.message);
					else router.push('/');
				})
				.catch((err) => console.error(err));
	};

	return (
		<form>
			<h3>SIGN IN</h3>
			{error}
			<Field
				required
				id='email'
				label='email'
				value={email}
				onChange={(e) =>
					setEmail((e.target as HTMLInputElement).value ?? '')
				}
				onBlur={(e) =>
					setError(
						validateEmail((e.target as HTMLInputElement).value) ??
							''
					)
				}
				error={emailError}
			/>
			<Field
				id='password'
				label='password'
				value={password}
				type={showPassword ? 'text' : 'password'}
				onChange={(e) =>
					setPassword((e.target as HTMLInputElement).value ?? '')
				}
				endAdornment={
					<Button
						variant='text'
						id={`${showPassword ? 'show' : 'hide'} password`}
						type='button'
						onClick={() => setShowPassword((prev) => !prev)}
					>
						<FontAwesomeIcon
							icon={showPassword ? faEye : faEyeSlash}
						/>
					</Button>
				}
			/>
			<Field
				id='remember me'
				label='remember me'
				type='checkbox'
				value={email}
				onChange={(e) =>
					setEmail((e.target as HTMLInputElement).value ?? '')
				}
			/>
			<Button variant='text' id='forgot password'>
				Forgot password
			</Button>
			<Button onClick={handleLogin} variant='secondary' id='sign in'>
				Sign in
			</Button>
			<Button variant='primary' id='sign in with google'>
				Sign in with Google
			</Button>
		</form>
	);
};

export default LoginComponent;
