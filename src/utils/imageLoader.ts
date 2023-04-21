type ImageLoaderProps = {
	src: string;
	width: string;
	quality?: number;
};

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
	const params = [
		`width=${width}`,
		`quality=${quality || 75}`,
		'format=auto',
	];
	return `https://example.com/cdn-cgi/image/${params.join(',')}/${src}`;
};

export default imageLoader;
