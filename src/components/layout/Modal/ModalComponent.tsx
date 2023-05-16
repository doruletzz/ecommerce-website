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
		<div className='fixed w-full h-full inset-0 grid place-items-center'>
			{backdrop && (
				<div
					onClick={onBackdropClick}
					className='fixed bg-black w-screen h-screen opacity-40 inset-0 cursor-pointer transition-opacity duration-700 overscroll-none'
				/>
			)}
			<div
				id='modal'
				className='fixed p-4 bg-slate-100 border border-slate-900 rounded min-h-128 animate-slide-up-and-fade-in'
			>
				{children}
			</div>
		</div>
	);
};

export default ModalComponent;
