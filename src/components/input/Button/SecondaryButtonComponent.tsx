import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';

type Props = {
	id: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: MouseEventHandler;
	className?: string;
	children?: ReactNode;
	style?: CSSProperties;
};

const SecondaryButtonComponent = ({
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
			className={`flex gap-3 rounded hover:border-slate-700 hover:border place-items-center color-slate-700 ${
				className ?? ''
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default SecondaryButtonComponent;
