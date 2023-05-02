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

const FieldComponent = <T extends string>({
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
		<div id='field' className=''>
			<div className='flex group w-fit items-center group border-slate-700 border rounded'>
				{startAdornment}
				<div className='relative'>
					{label && (
						<label
							className={`absolute ${
								value ? 'top-0.5 text-xs' : 'top-3 text-md'
							} ${
								error ? 'text-red-900' : 'text-slate-900'
							} h-4 left-2 group-focus-within:top-0.5 group-focus-within:text-xs text-md pointer-events-none transition-all duration-700 ease-in-out-expo`}
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
						className={`outline-none p-2 ${
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

export default FieldComponent;
