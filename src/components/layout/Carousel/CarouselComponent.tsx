import { Button } from '@/components/input';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useRef } from 'react';

type Props<T> = {
	items: Array<T>;
	title?: string;
	pageSize: '1' | '2' | '3' | '4' | '6' | '12';
};

const CarouselComponent = <T extends ReactNode>({
	items,
	pageSize = '3',
	title,
}: Props<T>) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const itemRef = useRef(null);

	const basisVariants = {
		1: 'basis-1/3',
		2: 'basis-1/2',
		3: 'basis-1/3',
		4: 'basis-1/4',
		6: 'basis-1/6',
		12: 'basis-1/12',
	};

	const slideLeft = () => {
		const gap = 24;
		let slider = sliderRef.current;
		if (slider)
			slider.scrollLeft =
				slider.scrollLeft -
				slider.clientWidth / (Number(pageSize) ?? 1) +
				gap;
	};

	const slideRight = () => {
		const gap = 24;
		let slider = sliderRef.current;
		if (slider)
			slider.scrollLeft =
				slider.scrollLeft +
				slider.clientWidth / (Number(pageSize) ?? 1) +
				gap;
	};

	return (
		<div
			id='carousel'
			className='grid grid-cols-[16px_minmax(0,_4fr)_16px] gap-2 items-center justify-between'
		>
			{title && (
				<h2 className='text-4xl text-blue-800 font-bold col-span-2'>
					{title}
				</h2>
			)}
			<Button
				id='slide-left'
				className={`${title ? 'col-start-3' : 'col-start-1'} w-full`}
				onClick={() => slideLeft()}
				variant='secondary'
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Button>
			<div
				ref={sliderRef}
				id='slider'
				className={`flex w-full scroll-smooth overflow-auto transition-all snap-x ${
					title ? 'col-span-4' : 'col-span-2'
				}`}
			>
				{items?.map((item: T, index: number) => (
					<li
						key={index}
						className={`snap-start flex-grow-0 flex-shrink-0 ${basisVariants[
							pageSize ?? '1'
						].toString()} flex-nowrap list-none`}
					>
						{item}
					</li>
				))}
			</div>

			<Button
				variant='secondary'
				id='slide-right'
				className='row-start-1 col-start-4 w-full'
				onClick={() => slideRight()}
			>
				<FontAwesomeIcon icon={faArrowRight} />
			</Button>
		</div>
	);
};

export default CarouselComponent;
