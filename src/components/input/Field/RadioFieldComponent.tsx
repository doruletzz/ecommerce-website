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
	disabled?: boolean;
	required?: boolean;
};

const RadioFieldComponent = <T extends string | number>(props: Props<T>) => {
	const {
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
		disabled = false,
	} = props;

	return (
		<div id='checkbox-field' className='h-fit'>
			{startAdornment}
			<div className='w-full group flex flex-row-reverse items-center justify-end gap-2'>
				{label && (
					<label className={''} htmlFor={id}>
						{`${label}${required ? '*' : ''}`}
					</label>
				)}
				<Input
					id={id}
					value={value}
					type={type}
					onChange={onChange}
					onBlur={onBlur}
					disabled={disabled}
					className={`outline-none bg-transparent`}
				/>
			</div>
			{endAdornment}
			{error && <p className='text-red-900'>{error}</p>}
		</div>
	);
};

export default RadioFieldComponent;
