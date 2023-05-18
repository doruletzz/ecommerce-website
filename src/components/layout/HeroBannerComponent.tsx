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
		<div>
			<Image
				width={imgProps.width}
				height={imgProps.height}
				className='pointer-events-none absolute inset-0 z-0 opacity-70'
				src={imgProps.src}
				loader={imgProps.loader}
				alt='keyboard'
			/>
			{banner && (
				<div className='relative mx-auto flex min-h-screen max-w-7xl flex-col gap-4 pt-32 text-center'>
					<h3 className='mx-auto text-sm text-orange-600 '>
						{banner.midText}
					</h3>
					<h1 className='mb-4 font-display text-6xl font-extrabold text-slate-900 '>
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
							className='px-4 py-2 uppercase'
						>
							{banner.primaryButtonText}{' '}
							<FontAwesomeIcon icon={faArrowRight} />
						</Button>
					</Link>
					{product && (
						<div className='mx-auto mt-32 w-128 delay-700'>
							<h4 className='text-left'>BUY NOW:</h4>
							<ProductCard product={product} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default HeroBanner;
