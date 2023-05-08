import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {
	className?: string;
};

const SpinnerComponent = ({ className }: Props) => {
	return (
		<div className={className}>
			<FontAwesomeIcon
				className='animate-spin-expo'
				icon={faCircleNotch}
			/>
		</div>
	);
};

export default SpinnerComponent;
