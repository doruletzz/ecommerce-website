import React, { MouseEventHandler, ReactNode } from 'react';

type Props = {
	type?: 'button' | 'submit' | 'reset';
	onClick: MouseEventHandler;
	className?: string;
	children: ReactNode;
};

const ButtonComponent = ({ type, className, children }: Props) => {
	return (
		<button type={type} className={className}>
			{children}
		</button>
	);
};

export default ButtonComponent;
