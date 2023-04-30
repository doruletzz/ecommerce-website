import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import TextButtonComponent from './TextButtonComponent';
import SecondaryButtonComponent from './SecondaryButtonComponent';
import PrimaryButtonComponent from './PrimaryButtonComponent';

type Props = {
	id: string;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'primary' | 'secondary' | 'text';
	onClick?: MouseEventHandler;
	className?: string;
	children?: ReactNode;
	style?: CSSProperties;
};

const ButtonComponent = (props: Props) => {
	const { variant = 'primary' } = props;

	if (variant === 'text') return <TextButtonComponent {...props} />;

	if (variant === 'secondary') return <SecondaryButtonComponent {...props} />;

	return <PrimaryButtonComponent {...props} />;
};

export default ButtonComponent;
