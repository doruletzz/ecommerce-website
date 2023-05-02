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
		1: 'basis-[calc(100%)]',
		2: 'basis-[calc(50%-3rem/2*1)]',
		3: 'basis-[calc(33.33%-3rem/3*2)]',
		4: 'basis-[calc(25%-3rem/4*3)]',
		6: 'basis-[calc(16.66%-3rem/6*5)]',
		12: 'basis-[calc(8.33%-3rem/12*11)]',
	};

	const slideLeft = () => {
		const gap = 48;
		let slider = sliderRef.current;
		if (slider)
			slider.scrollLeft =
				slider.scrollLeft -
				slider.clientWidth / (Number(pageSize) ?? 1) +
				gap;
	};

	const slideRight = () => {
		const gap = 48;
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
			className='grid grid-cols-[16px_minmax(0,_4fr)_16px] gap-4 items-center justify-between'
		>
			{title && (
				<h2 className='text-4xl tracking-tighter text-blue-800 font-bold col-span-2 font-display'>
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
				className={`flex w-full gap-12 scroll-smooth overflow-y-hidden overflow-x-auto transition-all snap-x relative ${
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
