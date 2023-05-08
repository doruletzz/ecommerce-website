import { Button, Field, Spinner } from '@/components/input';
import { setError } from '@/features/cart/slice';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { error } from 'console';
import Link from 'next/link';
import React, { MouseEvent, useEffect, useState } from 'react';

const RegisterComponent = () => {
	const supabaseClient = useSupabaseClient();

	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const [emailError, setEmailError] = useState('');
	const [lastNameError, setFirstNameError] = useState('');
	const [firstNameError, setLastNameError] = useState('');
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState('');

	const validateEmail = (email: string): string | undefined => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
			return 'Invalid Email Address';
	};

	const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const emailError = validateEmail(email);
		setEmailError(email);

		if (!emailError)
			supabaseClient.auth
				.signUp({
					email: email,
					password: password,
				})
				.then((res) => {
					if (res.error) setError(res.error?.message);
				})
				.catch((err) => console.error(err));
	};

	return (
		<div className='max-w-xl mx-auto flex flex-col gap-2 mt-16'>
			<form className=' bg-slate-200 rounded p-12 flex flex-col justify-center gap-2 border border-slate-700'>
				<h3 className='text-4xl font-display font-bold'>Sign up</h3>
				<br />
				{isFetching && <Spinner />}
				<div>{error}</div>
				<Field
					required
					id='firstName'
					label='First Name'
					value={firstName}
					onChange={(e) =>
						setFirstName((e.target as HTMLInputElement).value ?? '')
					}
					onBlur={(e) =>
						setFirstNameError(
							validateEmail(
								(e.target as HTMLInputElement).value
							) ?? ''
						)
					}
					error={emailError}
				/>
				<Field
					required
					id='lastName'
					label='Last Name'
					value={lastName}
					onChange={(e) =>
						setLastName((e.target as HTMLInputElement).value ?? '')
					}
					onBlur={(e) =>
						setLastNameError(
							validateEmail(
								(e.target as HTMLInputElement).value
							) ?? ''
						)
					}
					error={emailError}
				/>
				<Field
					required
					id='email'
					label='Email Address'
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
					label='Password'
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
				<Button
					className='p-2'
					onClick={handleRegister}
					variant='primary'
					id='sign in'
					disabled={!!emailError}
				>
					{isFetching && <Spinner />} Sign up
				</Button>
			</form>
			<p className='mx-auto'>
				Already have an account?{' '}
				<Link className='underline' href='/login'>
					Sign in now!
				</Link>
			</p>
		</div>
	);
};

export default RegisterComponent;
