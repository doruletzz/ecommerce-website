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
				} pointer-events-none h-4 min-w-[16px] animate-slide-up-and-fade-in rounded-full border border-slate-700 bg-slate-400 px-1 text-center font-display text-xs leading-3 text-slate-900`}
			>
				{badgeContent}
			</div>
		</div>
	);
};

export default BadgeComponent;
