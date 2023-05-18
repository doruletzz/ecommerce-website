import React from 'react';

type Props = {
	isSmall?: boolean;
	delay?: number;
};

const LogoComponent = ({ isSmall, delay = 0 }: Props) => {
	return (
		<img
			style={{ animationDelay: `${delay}ms` }}
			src='/keycaps-logo.svg'
			className={`transition-all duration-700 ease-in-out-expo ${
				isSmall ? 'h-4' : 'h-6'
			} animate-slide-right-and-fade-in opacity-0 `}
		/>
	);
};

export default LogoComponent;
