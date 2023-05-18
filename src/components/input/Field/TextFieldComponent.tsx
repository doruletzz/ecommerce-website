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
				className={`flex items-center gap-1 rounded border border-slate-700 bg-slate-100 px-2 ${
					className ?? ''
				}`}
			>
				{startAdornment}
				<div className='group relative w-full'>
					{label && (
						<label
							className={`absolute ${
								value ? 'top-0.5 text-xs' : 'text-md top-3'
							} ${
								error ? 'text-red-900' : 'text-slate-900'
							} text-md pointer-events-none h-4 transition-all duration-500 ease-in-out-expo group-focus-within:top-0.5 group-focus-within:text-xs`}
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
						className={`w-full bg-slate-100 py-2 outline-none autofill:bg-slate-100 autofill:shadow-[inset_0_0_0px_1000px_rgb(241,245,249)] ${
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
