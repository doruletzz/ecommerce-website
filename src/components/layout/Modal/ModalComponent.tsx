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
		<div className='fixed inset-0 grid h-full w-full place-items-center'>
			{backdrop && (
				<div
					onClick={onBackdropClick}
					className='fixed inset-0 h-screen w-screen cursor-pointer overscroll-none bg-black opacity-60 transition-opacity duration-700 md:opacity-40'
				/>
			)}
			<div
				id='modal'
				className='absolute bottom-0 left-0 right-0 animate-slide-up-and-fade-in rounded border border-slate-900 bg-slate-100 p-4 md:bottom-1/2 md:left-1/2 md:w-256 md:-translate-x-1/2 md:translate-y-1/2 md:animate-none'
			>
				<div className=' animate-slide-up-and-fade-in '>{children}</div>
			</div>
		</div>
	);
};

export default ModalComponent;
