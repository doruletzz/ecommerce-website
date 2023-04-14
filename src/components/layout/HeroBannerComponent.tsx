import { urlFor } from '@/lib/client';
import { Banner } from '@/types/Banner';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../input';

type Props = {
	banner: Banner;
};

const HeroBanner = ({ banner }: Props) => {
	return (
		<>
			{banner && (
				<div className='flex flex-col text-center mt-72 gap-4 max-w-5xl mx-auto min-h-screen'>
					<p className='bg-red-500 text-zinc-700 text-sm mx-auto py-1 px-3 rounded-full'>
						{banner.smallText}
					</p>
					<h1 className='text-zinc-900 text-5xl tracking-tighter font-bold'>
						{banner.largeText}
					</h1>
					<h3 className='text-zinc-700 text-lg max-w-xl mx-auto'>
						{banner.midText}
					</h3>
					<Image
						width={1920}
						height={1080}
						className='absolute inset-0 -z-10 opacity-70'
						src={urlFor(banner.image).url()}
						loader={() => urlFor(banner.image).url()}
						alt='keyboard'
					/>
					<Link
						className='mx-auto'
						href={`/product/${banner.product}`}
					>
						<Button
							id='cta-button'
							type='button'
							className='rounded bg-zinc-900 py-2 px-4 text-zinc-100 hover:bg-zinc-700'
						>
							{banner.primaryButtonText}
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
