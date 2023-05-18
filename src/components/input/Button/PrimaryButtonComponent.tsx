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
			className={`duration-400 flex items-center justify-center gap-3 rounded bg-slate-700 text-center font-bold text-zinc-100 transition-all ease-in-out-expo hover:gap-4 hover:bg-slate-800 active:scale-[102%] ${
				className ?? ''
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default PrimaryButtonComponent;
