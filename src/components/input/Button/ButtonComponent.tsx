import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';

type Props = {
	type?: 'button' | 'submit' | 'reset';
	onClick?: MouseEventHandler;
	className?: string;
	children?: ReactNode;
	style?: CSSProperties;
};

const ButtonComponent = ({
	type,
	style,
	className,
	onClick,
	children,
}: Props) => {
	return (
		<button
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
