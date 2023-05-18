import { Severity } from '@/types/AlertSeverity';
import React, { ReactNode } from 'react';
import AlertIconComponent from './AlertIconComponent';

type Props = {
	severity?: Severity;
	icon?: ReactNode | boolean;
	children: ReactNode;
};

const AlertComponent = ({
	severity = 'error',
	icon = true,
	children,
}: Props) => {
	const variants = {
		error: 'bg-red-300 text-red-800 border-red-800',
		success: 'bg-green-300 text-green-800 border-green-800',
		info: 'bg-blue-300 text-blue-800 border-blue-800',
		warning: 'bg-yellow-300 text-yellow-800 border-yellow-800',
	};

	return (
		<div
			className={`flex items-center gap-2 rounded border px-3 py-1 text-sm ${variants[severity]}`}
		>
			{icon && icon === true ? (
				<AlertIconComponent severity={severity} />
			) : (
				icon
			)}
			{children}
		</div>
	);
};

export default AlertComponent;
