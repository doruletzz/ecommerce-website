import React, { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	badgeContent?: ReactNode;
	vertical?: 'top' | 'bottom';
	className?: string;
	horizontal?: 'left' | 'right';
};

const BadgeComponent = ({
	children,
	badgeContent,
	className,
	vertical = 'top',
	horizontal = 'right',
}: Props) => {
	return (
		<div className={`relative grid place-items-center ${className ?? ''}`}>
			{children}
			<div
				className={`absolute ${
					vertical === 'top' ? '-top-2.5' : 'top-2.5'
				} ${
					horizontal === 'right' ? '-right-2.5' : 'right-2.5'
				} bg-slate-400 text-xs border border-slate-700 rounded-full min-w-[16px] h-4 font-display text-center text-slate-900 pointer-events-none animate-slide-up-and-fade-in leading-3 px-1`}
			>
				{badgeContent}
			</div>
		</div>
	);
};

export default BadgeComponent;
