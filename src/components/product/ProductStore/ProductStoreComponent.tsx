import { Color, Product } from '@/types/Product';
import React, { useState } from 'react';
import SideBarComponent from './SideBarComponent';
import { ProductCard } from '..';
import { Filter } from '@/types/Filter';

type Props = {
	products: Product[];
	filter: Filter;
};

const ProductStoreComponent = ({ filter, products }: Props) => {
	const [localFilter, setLocalFilter] = useState(filter);

	return (
		<>
			<SideBarComponent filter={localFilter} />
			<div id='products' className='grid grid-cols-5 gap-4 flex-1'>
				{products?.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</>
	);
};

export default ProductStoreComponent;
