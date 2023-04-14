import React, { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const GridComponent = ({ children }: Props) => {
	return <div className='grid grid-cols-4'>{children}</div>;
};

export default GridComponent;
