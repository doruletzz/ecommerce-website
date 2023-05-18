import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useState } from 'react';

type Props = {
	title: string;
	children: ReactNode;
};

const AccordionComponent = ({ title, children }: Props) => {
	const [isExpanded, setIsExpanded] = useState(true);
	return (
		<div>
			<div
				onClick={() => setIsExpanded((prev) => !prev)}
				className='flex cursor-pointer items-center justify-between'
			>
				<h4>{title}</h4>
				<FontAwesomeIcon
					icon={isExpanded ? faChevronUp : faChevronDown}
				/>
			</div>
			{isExpanded && <>{children}</>}
		</div>
	);
};

export default AccordionComponent;
