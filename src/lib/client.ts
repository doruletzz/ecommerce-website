import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const client = createClient({
	projectId: 'uc33xlea',
	dataset: 'production',
	apiVersion: '2023-03-25',
	token: process.env.NEXT_SANITY_API_WRITE_TOKEN,
	useCdn: false,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => builder.image(source);
