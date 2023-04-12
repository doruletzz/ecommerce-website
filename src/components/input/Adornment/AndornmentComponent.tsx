import React, { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const AndornmentComponent = ({ children }: Props) => {
	return <div>{children}</div>;
};

export default AndornmentComponent;
