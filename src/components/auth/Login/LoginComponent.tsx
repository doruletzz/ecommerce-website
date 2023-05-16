import { Alert, Button, Field, Spinner } from '@/components/input';
import { useDebounce } from '@/hooks/useDebounce';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
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
	const debouncedEmail = useDebounce(email, 400);
	const debouncedPassword = useDebounce(password, 400);
	const [passwordError, setPasswordError] = useState('');
	const [error, setError] = useState('');
	const [isFetching, setIsFetching] = useState(false);

	const validateEmail = (email: string): string | undefined => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

		if (!emailRegex.test(email)) return 'Invalid email address';
	};

	const validatePassword = (password: string): string | undefined => {
		const passwordRegex =
			/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

		if (!passwordRegex.test(password))
			return 'Invalid password, password must contain atleast an uppercase letter, a lowercase letter, a number and a special character (!@#$%^&*)';
	};

	const handleSignInWithGoogle = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google',
		});

		if (error) setError(error.message);
	};

	useEffect(() => {
		if (!!debouncedEmail && debouncedEmail === email) {
			setEmailError(validateEmail(debouncedEmail) ?? '');
		}
	}, [debouncedEmail]);

	useEffect(() => {
		if (!!debouncedPassword && debouncedPassword === debouncedPassword) {
			setPasswordError(validatePassword(debouncedPassword) ?? '');
		}
	}, [debouncedPassword]);

	const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const hasError = validateEmail(email) || validatePassword(password);

		if (!hasError) {
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
			<form className=' bg-slate-200 rounded p-12 flex flex-col gap-2 border border-slate-700'>
				<h3 className='text-4xl font-display font-bold'>Sign In</h3>
				<br />
				{error && (
					<div className='mb-2'>
						<Alert>{error}</Alert>
					</div>
				)}
				<Field
					className='bg-slate-200 autofill:!shadow-[inset_0_0_0px_1000px_rgb(226,232,240)]'
					required
					id='email'
					label='Email'
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
					error={email && emailError}
				/>
				<Field
					className='bg-slate-200 autofill:!shadow-[inset_0_0_0px_1000px_rgb(226,232,240)]'
					required
					id='password'
					label='Password'
					value={password}
					type={showPassword ? 'text' : 'password'}
					onChange={(e) =>
						setPassword((e.target as HTMLInputElement).value ?? '')
					}
					onBlur={(e) =>
						setPasswordError(
							validatePassword(
								(e.target as HTMLInputElement).value
							) ?? ''
						)
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
					error={password && passwordError}
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
					disabled={!!emailError || !!passwordError}
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
					onClick={handleSignInWithGoogle}
				>
					Sign in with Google
				</Button>
			</form>
			<p className='mx-auto'>
				{"Don't have an account? "}
				<Link className='underline' href='/register'>
					Join us!
				</Link>
			</p>
		</div>
	);
};

export default LoginComponent;
