import { Button, Field } from '@/components/input';
import { Br } from '@/components/layout';
import AccordionComponent from '@/components/layout/Accordion/AccordionComponent';
import { Filter } from '@/types/Filter';
import React from 'react';

type Props = {
	filter: Filter;
};

const SideBarComponent = ({ filter }: Props) => {
	const sortByValues = ['ascending', 'descending', 'oldest', 'newest'];

	return (
		<div className='row-span-2 row-start-1'>
			<AccordionComponent title='Colors'>
				<ul>
					{filter.colors?.map((color) => (
						<li key={color.value.name}>
							<Field
								type='checkbox'
								id={color.value.name}
								disabled={color.disabled}
								label={color.value.name}
								value={0}
							/>
						</li>
					))}
				</ul>
			</AccordionComponent>
			<Br />
			<AccordionComponent title='Sizes'>
				<ul>
					{filter.sizes?.map((size) => (
						<li key={size.value}>
							<Field
								type='checkbox'
								id={size.value}
								disabled={size.disabled}
								label={size.value}
								value={0}
							/>
						</li>
					))}
				</ul>
			</AccordionComponent>
			<Br />
			<AccordionComponent title='Brands'>
				<ul>
					{filter.brands?.map((brand) => (
						<li key={brand}>
							<Field
								type='checkbox'
								id={brand}
								label={brand}
								value={0}
							/>
						</li>
					))}
				</ul>
			</AccordionComponent>
			<Br />
			<AccordionComponent title='Sort By'>
				<ul>
					{sortByValues.map((sortType) => (
						<li key={sortType}>
							<Field
								type='radio'
								id={sortType}
								label={sortType}
								value={+!!(sortType === filter.sort)}
							/>
						</li>
					))}
				</ul>
			</AccordionComponent>
		</div>
	);
};

export default SideBarComponent;
