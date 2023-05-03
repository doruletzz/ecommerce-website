import { client } from '@/lib/sanityClient';
import { Slug } from '@/types/Slug';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
	categoryId: string;
};

type SubmenuCollections = Array<{ name: string; slug: Slug }>;

const SubmenuComponent = ({ categoryId }: Props) => {
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
		<div>
			<ul>
				{collections?.map((collection) => (
					<li key={collection.slug.current}>
						<Link href={collection.slug.current}>
							{collection.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

const Submenu = SubmenuComponent;
export default Submenu;
