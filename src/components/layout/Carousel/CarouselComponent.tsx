import { Button } from '@/components/input';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';

type Props<T> = {
	items: Array<T>;
	title: string;
};

const CarouselComponent = <T extends ReactNode>({ items, title }: Props<T>) => {
	return (
		<div>
			<div className='flex flex-row gap-6 items-center justify-between'>
				<h2 className='text-4xl text-blue-800 font-bold'>
					Best Selling Products
				</h2>
				<div>
					<Button>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					<Button>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
			</div>
			<div className='flex w-full gap-3 overflow-auto snap-x p-4'>
				{items?.map((item: T, index: number) => (
					<>
						<li
							key={index}
							className='snap-start flex-grow-0 flex-shrink-0 basis-1/4 flex-nowrap list-none'
						>
							{item}
						</li>
					</>
				))}
			</div>
		</div>
	);
};

export default CarouselComponent;
