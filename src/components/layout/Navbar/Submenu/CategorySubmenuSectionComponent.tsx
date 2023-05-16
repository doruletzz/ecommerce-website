import { client } from '@/lib/sanityClient';
import { Category } from '@/types/Category';
import { Slug } from '@/types/Slug';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
	category: Category;
};

type SubmenuCollections = Array<{ name: string; slug: Slug }>;

const CategorySubmenuSectionComponent = ({ category }: Props) => {
	const [collections, setCollections] = useState<SubmenuCollections>();

	useEffect(() => {
		const fetchCollections = async () => {
			const query = `*[_type == "collection" && "${category?._id}" in categories[]._ref]{name, slug}`;
			const categories = await client.fetch<SubmenuCollections>(query);

			setCollections(categories);
		};

		if (category) fetchCollections();
	}, [category]);

	return (
		<ul>
			{collections?.map((collection) => (
				<li key={collection.slug.current}>
					<Link
						href={`/store/${category?.slug.current}/${collection.slug.current}`}
					>
						{collection.name}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default CategorySubmenuSectionComponent;
