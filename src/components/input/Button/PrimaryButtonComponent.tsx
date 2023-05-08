import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';

type Props = {
	id: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: MouseEventHandler;
	className?: string;
	children?: ReactNode;
	disabled?: boolean;
	style?: CSSProperties;
};

const PrimaryButtonComponent = ({
	id,
	type,
	style,
	className,
	disabled,
	onClick,
	children,
}: Props) => {
	return (
		<button
			id={id}
			disabled={disabled}
			aria-label={id}
			style={style}
			type={type}
			className={`rounded text-center justify-center bg-slate-700 flex items-center gap-3 text-zinc-100 font-display text font-extrabold hover:bg-slate-800 hover:gap-6 transition-all duration-400 ease-in-out-expo ${
				className ?? ''
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default PrimaryButtonComponent;
