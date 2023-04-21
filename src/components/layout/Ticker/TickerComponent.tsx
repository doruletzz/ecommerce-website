import React, { ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
	children: ReactNode;
};

const TickerComponent = ({ children }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const elementRef = useRef<HTMLDivElement>(null);

	const [toRepeatCount, setToRepeatCount] = useState(0);
	const [totalWidth, setTotalWidth] = useState(0);

	useEffect(() => {
		if (containerRef.current && elementRef.current) {
			const toRepeatCount = Math.max(
				0,
				Math.floor(
					(2 * containerRef.current?.clientWidth) /
						elementRef.current?.clientWidth
				)
			);
			setToRepeatCount(toRepeatCount);
			setTotalWidth(toRepeatCount * elementRef.current?.clientWidth);
		}
	}, [containerRef.current, elementRef.current]);

	useEffect(() => {
		if (containerRef.current && totalWidth) {
			containerRef.current.style.setProperty(
				'--infinite-scroll-total-width',
				`-${totalWidth / 2}px`
			);
		}
	}, [containerRef.current, totalWidth]);

	return (
		<div ref={containerRef} className='animate-inifinte-scroll flex'>
			<div className='whitespace-nowrap p-1' ref={elementRef}>
				{children}
			</div>
			{toRepeatCount > 0 &&
				[...Array(toRepeatCount)].map((_, index) => (
					<div key={index} className='whitespace-nowrap p-1'>
						{children}
					</div>
				))}
		</div>
	);
};

export default TickerComponent;
