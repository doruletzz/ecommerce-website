import React, { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react';
import { Input } from '../';
import CheckboxFieldComponent from './CheckboxFieldComponent';
import TextFieldComponent from './TextFieldComponent';
import RadioFieldComponent from './RadioFieldComponent';

type Props<T> = {
	id: string;
	type?: 'text' | 'checkbox' | 'password' | 'radio';
	label?: string;
	checked?: boolean;
	value: T;
	className?: string;
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
	onChange?: ChangeEventHandler;
	onClick?: MouseEventHandler;
	onBlur?: ChangeEventHandler;
	error?: string;
	disabled?: boolean;
	required?: boolean;
};

const FieldComponent = <T extends string | number>(props: Props<T>) => {
	const { type } = props;

	if (type === 'checkbox') return <CheckboxFieldComponent {...props} />;

	if (type === 'radio') return <RadioFieldComponent {...props} />;

	return <TextFieldComponent {...props} />;
};

export default FieldComponent;
