import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';

type Props = {
	id: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: MouseEventHandler;
	disabled?: boolean;
	className?: string;
	children?: ReactNode;
	onMouseEnter?: MouseEventHandler;
	onMouseLeave?: MouseEventHandler;
	style?: CSSProperties;
};

const SecondaryButtonComponent = ({
	id,
	type,
	style,
	disabled,
	className,
	onClick,
	onMouseEnter,
	onMouseLeave,
	children,
}: Props) => {
	return (
		<button
			id={id}
			disabled={disabled}
			aria-label={id}
			style={style}
			type={type}
			className={`flex gap-3 rounded border-slate-700 border place-items-center color-slate-700 ${
				className ?? ''
			}`}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
		</button>
	);
};

export default SecondaryButtonComponent;
