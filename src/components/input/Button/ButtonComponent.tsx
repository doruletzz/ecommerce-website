import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';

type Props = {
	id: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: MouseEventHandler;
	className?: string;
	children?: ReactNode;
	style?: CSSProperties;
};

const ButtonComponent = ({
	id,
	type,
	style,
	className,
	onClick,
	children,
}: Props) => {
	return (
		<button
			id={id}
			aria-label={id}
			style={style}
			type={type}
			className={className}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default ButtonComponent;
