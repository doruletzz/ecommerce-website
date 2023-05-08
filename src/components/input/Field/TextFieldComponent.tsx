import React, { ChangeEventHandler, ReactNode } from 'react';
import { Input } from '../';

type Props<T> = {
	id: string;
	type?: string;
	label?: string;
	value: T;
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
	onChange?: ChangeEventHandler;
	onBlur?: ChangeEventHandler;
	error?: string;
	required?: boolean;
};

const TextFieldComponent = <T extends string | number>({
	id,
	type,
	value,
	label,
	error,
	startAdornment,
	onBlur,
	endAdornment,
	required,
	onChange,
}: Props<T>) => {
	return (
		<div id='text-field'>
			<div className='flex items-center border-slate-700 border rounded gap-1 px-2'>
				{startAdornment}
				<div className='relative w-full group'>
					{label && (
						<label
							className={`absolute ${
								value ? 'top-0.5 text-xs' : 'top-3 text-md'
							} ${
								error ? 'text-red-900' : 'text-slate-900'
							} h-4 group-focus-within:top-0.5 group-focus-within:text-xs text-md pointer-events-none transition-all duration-500 ease-in-out-expo`}
						>
							{`${label}${required ? '*' : ''}`}
						</label>
					)}
					<Input
						id={id}
						value={value}
						type={type}
						onChange={onChange}
						onBlur={onBlur}
						className={`outline-none py-2 bg-transparent w-full ${
							label ? 'pt-4' : 'pt-2'
						}`}
					/>
				</div>
				{endAdornment}
			</div>
			{error && <p className='text-red-900'>{error}</p>}
		</div>
	);
};

export default TextFieldComponent;
