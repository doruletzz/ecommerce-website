import React, { ChangeEventHandler, ReactNode } from 'react';
import { Alert, Input } from '../';

type Props<T> = {
	className?: string;
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
	className,
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
		<div id='text-field' className='flex flex-col gap-2'>
			<div
				className={`flex items-center border-slate-700 border rounded gap-1 px-2 bg-slate-100 ${
					className ?? ''
				}`}
			>
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
						className={`outline-none py-2 bg-slate-100 autofill:bg-slate-100 autofill:shadow-[inset_0_0_0px_1000px_rgb(241,245,249)] w-full ${
							label ? 'pt-4' : 'pt-2'
						} ${className ?? ''}`}
					/>
				</div>
				{endAdornment}
			</div>
			{error && <Alert>{error}</Alert>}
		</div>
	);
};

export default TextFieldComponent;
