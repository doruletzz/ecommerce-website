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
		<div className={`relative ${className ?? ''}`}>
			{children}
			<div
				className={`absolute ${
					vertical === 'top' ? '-top-1.5' : 'top-1.5'
				} ${
					horizontal === 'right' ? '-right-1.5' : 'right-1.5'
				} bg-red-600 text-xs rounded-full w-4 h-4 text-center text-slate-200 pointer-events-none`}
			>
				{badgeContent}
			</div>
		</div>
	);
};

export default BadgeComponent;
