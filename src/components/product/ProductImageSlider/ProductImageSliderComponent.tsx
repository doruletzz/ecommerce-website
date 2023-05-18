import { Button } from '@/components/input';
import { Product } from '@/types/Product';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';

import { useNextImage } from '../../../lib/sanityClient';
import Image from 'next/image';

type Props = {
	noLink?: boolean;
	product: Product;
	className?: string;
};

const ProductImageSliderComponent = ({
	product,
	noLink = false,
	className,
}: Props) => {
	const [imgIndex, setImgIndex] = useState(0);
	const imgProps = useNextImage(product.image[imgIndex]);
	const [direction, setDirection] = useState<'left' | 'right'>();

	const OverridenLinkComponent = noLink ? 'div' : Link;

	return (
		<div
			className={`group relative h-full w-full flex-1 object-cover ${
				className ?? ''
			}`}
		>
			<OverridenLinkComponent
				href={noLink ? '' : `/product/${product.slug.current}`}
				className='h-full'
			>
				<div className='relative h-full w-full overflow-hidden rounded-xl border border-slate-700 object-cover'>
					<Image
						key={`previous ${imgIndex}`}
						src={
							useNextImage(
								product.image[Math.max(0, imgIndex - 1)]
							).src
						}
						width={620}
						height={620}
						alt=''
						aria-hidden
						className={`absolute right-full top-0 h-full w-full object-cover ${
							direction === 'left' ? 'animate-slide-left' : ''
						}`}
					/>
					<Image
						key={`current ${imgIndex}`}
						src={imgProps.src}
						width={620}
						height={620}
						alt={product.name}
						className={`absolute h-full w-full object-cover ${
							direction === 'left' ? 'animate-slide-left' : ''
						} ${
							direction === 'right' ? 'animate-slide-right' : ''
						}`}
					/>
					<Image
						key={`next ${imgIndex}`}
						src={
							useNextImage(
								product.image[
									Math.min(
										product.image.length - 1,
										imgIndex + 1
									)
								]
							).src
						}
						width={620}
						height={620}
						alt=''
						aria-hidden
						className={`absolute left-full top-0 h-full w-full object-cover ${
							direction === 'right' ? 'animate-slide-right' : ''
						}`}
					/>
				</div>
			</OverridenLinkComponent>
			<div className='pointer-events-none absolute left-1/2 top-1/2 hidden w-full -translate-x-1/2 -translate-y-1/2 transform justify-between group-hover:flex'>
				<Button
					variant='secondary'
					id='left-arrow'
					className={`max-w-8 pointer-events-auto m-3 w-1/6 animate-slide-up-and-fade-in p-3 text-slate-600 transition-colors hover:scale-105  hover:bg-slate-200 hover:text-slate-800 ${
						imgIndex === 0 ? 'text-opacity-50' : 'text-opacity-100'
					}`}
					onClick={() => {
						setImgIndex((prev) => Math.max(0, prev - 1));
						setDirection('right');
					}}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</Button>
				<Button
					variant='secondary'
					id='right-arrow'
					className={`max-w-8 pointer-events-auto m-3 w-1/6 animate-slide-up-and-fade-in p-3 text-slate-600 transition-colors hover:scale-105 hover:bg-slate-200 hover:text-slate-800 ${
						imgIndex === product.image.length - 1
							? 'text-opacity-50'
							: 'text-opacity-100'
					}`}
					onClick={() => {
						setImgIndex((prev) =>
							Math.min(product.image.length - 1, prev + 1)
						);
						setDirection('left');
					}}
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</div>
			<ul className='absolute bottom-6 left-1/2 hidden -translate-x-1/2 transform gap-4 group-hover:flex'>
				{product.image?.map((_, i) => (
					<li
						key={i}
						className={`h-1 w-1 animate-slide-up-and-fade-in  rounded-full ${
							i === imgIndex ? 'bg-slate-700' : 'bg-slate-400'
						}`}
					/>
				))}
			</ul>
		</div>
	);
};

export default ProductImageSliderComponent;
