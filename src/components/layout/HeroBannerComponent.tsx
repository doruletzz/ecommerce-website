import { Banner } from '@/types/Banner';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../input';
import { useNextImage } from '@/lib/sanityClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRight,
	faArrowsSplitUpAndLeft,
	faSquareUpRight,
	faUpDownLeftRight,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from '@/types/Product';
import { ProductCard } from '../product';

type Props = {
	banner: Banner;
	product?: Product;
};

const HeroBanner = ({ banner, product }: Props) => {
	const imgProps = useNextImage(banner.image);
	return (
		<>
			{banner && (
				<div className='flex flex-col text-center mt-32 gap-4 max-w-7xl mx-auto min-h-screen'>
					<Image
						width={imgProps.width}
						height={imgProps.height}
						className='absolute inset-0 -z-50 opacity-70'
						src={imgProps.src}
						loader={imgProps.loader}
						alt='keyboard'
					/>
					<h3 className='text-orange-600 text-sm mx-auto '>
						{banner.midText}
					</h3>
					<h1 className='text-slate-900 text-6xl font-extrabold font-display mb-4 '>
						{banner.largeText}
					</h1>
					<Link
						className='mx-auto'
						href={`/product/${banner.product}`}
					>
						<Button
							id='cta-button'
							type='button'
							variant='primary'
							className='py-3 px-5 text-lg uppercase'
						>
							{banner.primaryButtonText}{' '}
							<FontAwesomeIcon icon={faArrowRight} />
						</Button>
					</Link>
					{product && (
						<div className='w-128 mx-auto mt-32 delay-700'>
							<ProductCard product={product} />
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default HeroBanner;
