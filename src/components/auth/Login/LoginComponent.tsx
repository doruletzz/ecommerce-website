import { Button, Field } from '@/components/input';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { MouseEvent, useEffect, useState } from 'react';

const LoginComponent = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const [error, setError] = useState('');

	useEffect(() => {
		console.log(showPassword);
	}, [showPassword]);

	const validateEmail = (email: string): string | undefined => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
			return 'Invalid Email Address';
	};

	const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const emailError = validateEmail(email);
		setError(email);
	};

	return (
		<form>
			<h3>SIGN IN</h3>
			{error && <p>{error}</p>}
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
				error={error}
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
			<Button id='forgot password'>Forgot password</Button>
			<Button id='sign in'>Sign in</Button>
			<Button id='sign in with google'>Sign in with Google</Button>
		</form>
	);
};

export default LoginComponent;
