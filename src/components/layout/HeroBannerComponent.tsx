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

type Props = {
	banner: Banner;
};

const HeroBanner = ({ banner }: Props) => {
	const imgProps = useNextImage(banner.image);
	return (
		<>
			{banner && (
				<div className='flex flex-col text-center mt-32 gap-6 max-w-7xl mx-auto min-h-screen'>
					<Image
						width={imgProps.width}
						height={imgProps.height}
						className='absolute inset-0 -z-50 opacity-70'
						src={imgProps.src}
						loader={imgProps.loader}
						alt='keyboard'
					/>
					<p className='bg-red-500 text-zinc-700 text-sm mx-auto py-1 px-3 rounded-full'>
						{banner.smallText}
					</p>
					<h1 className='text-slate-800 text-5xl font-extrabold font-display'>
						{banner.largeText}
					</h1>
					<h3 className='text-slate-600 text-lg max-w-lg mx-auto'>
						{banner.midText}
					</h3>
					<Link
						className='mx-auto'
						href={`/product/${banner.product}`}
					>
						<Button id='cta-button' type='button' variant='primary'>
							{banner.primaryButtonText}{' '}
							<FontAwesomeIcon icon={faArrowRight} />
						</Button>
					</Link>
					<div className=''>
						<p>{banner.discount}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default HeroBanner;
