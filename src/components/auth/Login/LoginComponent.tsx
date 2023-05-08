import { Button, Field, Spinner } from '@/components/input';
import {
	faCircleNotch,
	faEye,
	faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
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
	const [isFetching, setIsFetching] = useState(false);

	const validateEmail = (email: string): string | undefined => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
			return 'Invalid Email Address';
	};

	const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const error = validateEmail(email);

		if (!error) {
			setIsFetching(true);
			supabaseClient.auth
				.signInWithPassword({
					email: email,
					password: password,
				})
				.then((res) => {
					if (res.error) setError(res.error.message);
					else router.push('/');
				})
				.catch((err) => console.error(err))
				.finally(() => setIsFetching(false));
		} else setEmailError(error);
	};

	return (
		<div className='max-w-xl mx-auto flex flex-col gap-2 mt-16'>
			<form className=' bg-slate-200 rounded p-12 flex flex-col justify-center gap-2 border border-slate-700'>
				<h3 className='text-4xl font-display font-bold'>Sign In</h3>
				<br />
				{isFetching && <Spinner />}
				<div>{error}</div>
				<Field
					required
					id='email'
					label='email'
					value={email}
					onChange={(e) =>
						setEmail((e.target as HTMLInputElement).value ?? '')
					}
					onBlur={(e) =>
						setEmailError(
							validateEmail(
								(e.target as HTMLInputElement).value
							) ?? ''
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
								className='px-1'
								icon={showPassword ? faEye : faEyeSlash}
							/>
						</Button>
					}
				/>
				<div className='flex justify-between items-center'>
					<Field
						id='remember me'
						label='Remember me'
						type='checkbox'
						value={email}
						onChange={(e) =>
							setEmail((e.target as HTMLInputElement).value ?? '')
						}
					/>
					<Link
						className='underline'
						id='forgot password'
						href='reset'
					>
						Forgot password?
					</Link>
				</div>
				<Button
					className='p-2'
					onClick={handleLogin}
					variant='primary'
					id='sign in'
					disabled={!!emailError}
				>
					{isFetching && <Spinner />} Sign in
				</Button>
				<div className='w-full flex items-center gap-4'>
					<div className='w-full bg-slate-700 h-[1px] rounded' />
					<p className='w-4'>or</p>
					<div className='w-full bg-slate-700 h-[1px] rounded' />
				</div>
				<Button
					className='p-2'
					variant='secondary'
					id='sign in with google'
				>
					Sign in with Google
				</Button>
			</form>
			<p className='mx-auto'>
				Don't have an account?{' '}
				<Link className='underline' href='/register'>
					Join Us Now!
				</Link>
			</p>
		</div>
	);
};

export default LoginComponent;
