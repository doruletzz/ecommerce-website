import { client } from '@/lib/sanityClient';
import { Slug } from '@/types/Slug';
import Link from 'next/link';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';

type Props = {
	categoryId: string;
	categorySlug: string;
	anchor: number;
	onMouseEnter?: MouseEventHandler;
	onMouseLeave?: MouseEventHandler;
};

type SubmenuCollections = Array<{ name: string; slug: Slug }>;

const SubmenuComponent = ({
	categoryId,
	categorySlug,
	anchor,
	onMouseEnter,
	onMouseLeave,
}: Props) => {
	const [collections, setCollections] = useState<SubmenuCollections>();

	useEffect(() => {
		const fetchCollections = async () => {
			const query = `*[_type == "collection" && "${categoryId}" in categories[]._ref]{name, slug}`;
			const categories = await client.fetch<SubmenuCollections>(query);

			setCollections(categories);
		};

		if (categoryId) fetchCollections();
	}, [categoryId]);

	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={{
				left: anchor,
			}}
			className='absolute -translate-x-1/2 top-full transition-[left/height] duration-700 ease-in-out-expo'
		>
			<div className='animate-slide-up-and-fade-in mt-1 p-4 bg-slate-100 border border-slate-700 rounded'>
				<ul>
					{collections?.map((collection) => (
						<li key={collection.slug.current}>
							<Link
								href={`/store/${categorySlug}/${collection.slug.current}`}
							>
								{collection.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const Submenu = SubmenuComponent;
export default Submenu;
