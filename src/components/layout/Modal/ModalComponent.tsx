import React, { MouseEventHandler, ReactNode } from 'react';

type Props = {
	children: ReactNode;
	backdrop?: boolean;
	onBackdropClick?: MouseEventHandler;
};

const ModalComponent = ({
	children,
	onBackdropClick,
	backdrop = true,
}: Props) => {
	return (
		<div className='fixed z-50 w-full h-full inset-0 grid place-items-center'>
			{backdrop && (
				<div
					onClick={onBackdropClick}
					className='absolute bg-black opacity-20 inset-0 cursor-pointer'
				/>
			)}
			<div
				id='modal'
				className='absolute p-4 bg-slate-400 rounded min-h-128'
			>
				{children}
			</div>
		</div>
	);
};

export default ModalComponent;
