import { Button } from '@/components/input';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useRef } from 'react';

type Props<T> = {
	items: Array<T>;
	title: string;
	pageSize: number;
};

const CarouselComponent = <T extends ReactNode>({
	items,
	pageSize = 3,
	title,
}: Props<T>) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const itemRef = useRef(null);

	const slideLeft = () => {
		let slider = sliderRef.current;
		if (slider)
			slider.scrollLeft =
				slider.scrollLeft - slider.clientWidth / pageSize;
	};

	const slideRight = () => {
		let slider = sliderRef.current;
		if (slider)
			slider.scrollLeft =
				slider.scrollLeft + slider.clientWidth / pageSize;
	};

	return (
		<div id='carousel'>
			<div className='flex flex-row gap-6 items-center justify-between'>
				<h2 className='text-4xl text-blue-800 font-bold'>
					Best Selling Products
				</h2>
				<div>
					<Button id='slide-left' onClick={() => slideLeft()}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					<Button id='slide-right' onClick={() => slideRight()}>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
			</div>
			<div
				ref={sliderRef}
				id='slider'
				className='flex w-full gap-4 scroll-smooth overflow-auto transition-all snap-x'
			>
				{items?.map((item: T, index: number) => (
					<li
						key={index}
						className={`snap-start flex-grow-0 flex-shrink-0 basis-1/3 flex-nowrap list-none`}
					>
						{item}
					</li>
				))}
			</div>
		</div>
	);
};

export default CarouselComponent;
