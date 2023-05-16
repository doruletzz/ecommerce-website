import { Alert, Button, Field, Spinner } from '@/components/input';
import { setError } from '@/features/cart/slice';
import { useDebounce } from '@/hooks/useDebounce';
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
	const [passwordError, setPasswordError] = useState('');
	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState('');

	const debouncedEmail = useDebounce(email, 400);
	const debouncedPassword = useDebounce(password, 400);
	const debouncedFirstName = useDebounce(firstName, 400);
	const debouncedLastName = useDebounce(lastName, 400);

	const validateFirstName = (name: string): string | undefined => {
		if (!/^[a-z ,.'-]+$/i.test(name)) return 'Invalid First Name';
	};

	const validateLastName = (name: string): string | undefined => {
		if (!/^[a-z ,.'-]+$/i.test(name)) return 'Invalid Last Name';
	};

	const validateEmail = (email: string): string | undefined => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
			return 'Invalid Email Address';
	};

	const validatePassword = (password: string): string | undefined => {
		const passwordRegex =
			/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

		if (!passwordRegex.test(password))
			return 'Invalid password, password must contain atleast an uppercase letter, a lowercase letter, a number and a special character (!@#$%^&*)';
	};

	useEffect(() => {
		if (!!debouncedEmail && debouncedEmail === email) {
			setEmailError(validateEmail(debouncedEmail) ?? '');
		}
	}, [debouncedEmail]);

	useEffect(() => {
		if (!!debouncedPassword && debouncedPassword === password) {
			setPasswordError(validatePassword(debouncedPassword) ?? '');
		}
	}, [debouncedPassword]);

	useEffect(() => {
		if (!!debouncedFirstName && debouncedFirstName === firstName) {
			setFirstNameError(validateFirstName(debouncedFirstName) ?? '');
		}
	}, [debouncedFirstName]);

	useEffect(() => {
		if (!!debouncedLastName && debouncedLastName === lastName) {
			setLastNameError(validateLastName(debouncedLastName) ?? '');
		}
	}, [debouncedLastName]);

	const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

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
				{error && <Alert>{error}</Alert>}
				<Field
					id='firstName'
					label='First Name'
					className='bg-slate-200 autofill:!shadow-[inset_0_0_0px_1000px_rgb(226,232,240)]'
					value={firstName}
					onChange={(e) =>
						setFirstName((e.target as HTMLInputElement).value ?? '')
					}
					onBlur={(e) =>
						setFirstNameError(
							validateFirstName(
								(e.target as HTMLInputElement).value
							) ?? ''
						)
					}
					error={firstName && firstNameError}
				/>
				<Field
					id='lastName'
					label='Last Name'
					className='bg-slate-200 autofill:!shadow-[inset_0_0_0px_1000px_rgb(226,232,240)]'
					value={lastName}
					onChange={(e) =>
						setLastName((e.target as HTMLInputElement).value ?? '')
					}
					onBlur={(e) =>
						setLastNameError(
							validateLastName(
								(e.target as HTMLInputElement).value
							) ?? ''
						)
					}
					error={lastName && lastNameError}
				/>
				<Field
					required
					id='email'
					label='Email Address'
					className='bg-slate-200 autofill:!shadow-[inset_0_0_0px_1000px_rgb(226,232,240)]'
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
					required
					id='password'
					label='Password'
					value={password}
					className='bg-slate-200 autofill:!shadow-[inset_0_0_0px_1000px_rgb(226,232,240)]'
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
					error={password && passwordError}
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
					disabled={
						!!emailError ||
						!!passwordError ||
						!!firstNameError ||
						!!lastNameError
					}
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
