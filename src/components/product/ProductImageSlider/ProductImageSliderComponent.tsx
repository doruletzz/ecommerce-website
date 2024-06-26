import { Button } from '@/components/input';
import { Product } from '@/types/Product';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';

import { useNextImage } from '../../../lib/client';
import Image from 'next/image';

type Props = {
	product: Product;
	className?: string;
};

const ProductImageSliderComponent = ({ product, className }: Props) => {
	const [imgIndex, setImgIndex] = useState(0);
	const imgProps = useNextImage(product.image[imgIndex]);
	const [direction, setDirection] = useState<'left' | 'right'>();

	return (
		<div
			className={`group w-full h-full flex-1 object-cover relative pb-16 group-hover:pb-0 transition-all duration-[1300ms] ease-in-out-expo ${
				className ?? ''
			}`}
		>
			<div className='hidden pointer-events-none group-hover:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full justify-between'>
				<Button
					id='left-arrow'
					className={`p-6 pointer-events-auto text-slate-300 hover:text-slate-100 hover:scale-110  animate-slide-up ${
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
					id='right-arrow'
					className={`p-6 pointer-events-auto text-slate-300 hover:text-slate-100 hover:scale-110  animate-slide-up ${
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
			<ul className='hidden absolute bottom-6 group-hover:flex gap-4 left-1/2 transform -translate-x-1/2'>
				{product.image?.map((_, i) => (
					<li
						key={i}
						className={`w-1 h-1 rounded-full  animate-slide-up ${
							i === imgIndex ? 'bg-slate-700' : 'bg-slate-400'
						}`}
					/>
				))}
			</ul>
			<Link href={`/product/${product.slug.current}`}>
				<div className='w-full h-full object-cover rounded-xl relative border-slate-700 border -z-10 overflow-hidden'>
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
						className={`w-full h-full object-cover absolute right-full top-0 ${
							direction === 'left' ? 'animate-slide-left' : ''
						}`}
					/>
					<Image
						key={`current ${imgIndex}`}
						src={imgProps.src}
						width={620}
						height={620}
						alt={product.name}
						className={`w-full h-full object-cover ${
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
						className={`w-full h-full object-cover absolute left-full top-0 ${
							direction === 'right' ? 'animate-slide-right' : ''
						}`}
					/>
				</div>
			</Link>
		</div>
	);
};

export default ProductImageSliderComponent;
