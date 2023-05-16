import { Severity } from '@/types/AlertSeverity';
import {
	faCircleCheck,
	faCircleExclamation,
	faCircleInfo,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {
	severity: Severity;
};

const AlertIconComponent = ({ severity }: Props) => {
	if (severity === 'error') return <FontAwesomeIcon icon={faCircleXmark} />;
	if (severity === 'warning')
		return <FontAwesomeIcon icon={faCircleExclamation} />;
	if (severity === 'info') return <FontAwesomeIcon icon={faCircleInfo} />;

	return <FontAwesomeIcon icon={faCircleCheck} />;
};

export default AlertIconComponent;
