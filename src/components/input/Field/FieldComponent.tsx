import React, { ChangeEventHandler, ReactNode } from 'react';
import { Input } from '../';
import CheckboxFieldComponent from './CheckboxFieldComponent';
import TextFieldComponent from './TextFieldComponent';

type Props<T> = {
	id: string;
	type?: 'text' | 'checkbox' | 'password';
	label?: string;
	value: T;
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
	onChange?: ChangeEventHandler;
	onBlur?: ChangeEventHandler;
	error?: string;
	required?: boolean;
};

const FieldComponent = <T extends string | number>(props: Props<T>) => {
	const { type } = props;

	if (type === 'checkbox') return <CheckboxFieldComponent {...props} />;

	return <TextFieldComponent {...props} />;
};

export default FieldComponent;
