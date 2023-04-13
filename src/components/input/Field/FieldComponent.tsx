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
		<div>
			<div>
				{startAdornment}
				{label && `${label}${required ? '*' : ''}`}
				<Input
					id={id}
					value={value}
					type={type}
					onChange={onChange}
					onBlur={onBlur}
				/>
				{endAdornment}
			</div>
			{error && <p>{error}</p>}
		</div>
	);
};

export default FieldComponent;
