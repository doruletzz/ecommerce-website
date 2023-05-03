import { Button, Field } from '@/components/input';
import { setError } from '@/features/cart/slice';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { error } from 'console';
import React, { MouseEvent, useEffect, useState } from 'react';

const RegisterComponent = () => {
	const supabaseClient = useSupabaseClient();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const [emailError, setEmailError] = useState('');
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
		<form>
			<h3>SIGN UP</h3>
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
					setEmailError(
						validateEmail((e.target as HTMLInputElement).value) ??
							''
					)
				}
				error={emailError}
			/>
			<Field
				required
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
			<Button onClick={handleRegister} variant='secondary' id='sign in'>
				Sign up
			</Button>
			<Button variant='primary' id='sign in with google'>
				Sign in with Google
			</Button>
		</form>
	);
};

export default RegisterComponent;
