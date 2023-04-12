import React, { ChangeEventHandler, ReactNode } from 'react';
import { Input } from '../..';

type Props<T> = {
	id: string;
	type?: string;
	label?: string;
	value: T;
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
	onChange?: ChangeEventHandler;
};

const FieldComponent = <T extends string>({
	id,
	type,
	value,
	startAdornment,
	endAdornment,
	onChange,
}: Props<T>) => {
	return (
		<div>
			{startAdornment}
			<Input id={id} value={value} type={type} onChange={onChange} />
			{endAdornment}
		</div>
	);
};

export default FieldComponent;
