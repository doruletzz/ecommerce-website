import { Button, Field } from '@/components/input';
import { Br } from '@/components/layout';
import AccordionComponent from '@/components/layout/Accordion/AccordionComponent';
import { Filter, FilterColor, FilterSize, Sort } from '@/types/Filter';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

type Flatten<T> = T extends any[] ? T[number] : T;

type Props = {
	filter: Filter;
	selected?: Filter;
	setSelected: Dispatch<SetStateAction<Filter | undefined>>;
};

const SideBarComponent = ({ filter, selected, setSelected }: Props) => {
	const changeSelected = (
		selected: Filter,
		value: Flatten<Filter[keyof Filter]>,
		field: keyof Filter,
		equalFn: (
			v1: Flatten<Filter[keyof Filter]>,
			v2: Flatten<Filter[keyof Filter]>
		) => boolean
	) => {
		let newSelected = { ...selected };
		const selectedIndex =
			selected[field]?.findIndex((f: Flatten<Filter[keyof Filter]>) => {
				console.log(f, value, equalFn(f, value));
				return equalFn(f, value);
			}) ?? -1;

		if (selectedIndex === -1)
			newSelected = {
				...selected,
				[field]: [...(selected[field] ?? []), value],
			};
		else newSelected[field]?.splice(selectedIndex, 1);

		return newSelected;
	};

	const sortByValues: Sort[] = [
		'ascending',
		'descending',
		'oldest',
		'newest',
	];

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
								value={color.value.name}
								checked={
									!!selected?.colors?.find(
										(selectedColors) =>
											color.value === selectedColors.value
									)
								}
								onChange={() =>
									selected &&
									setSelected(
										changeSelected(
											selected,
											color,
											'colors',
											(v1, v2) =>
												(v1 as FilterColor).value
													.name ===
												(v2 as FilterColor).value.name
										)
									)
								}
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
								checked={
									!!selected?.sizes?.find(
										(selectedSize) =>
											size.value === selectedSize.value
									)
								}
								onChange={() =>
									selected &&
									setSelected(
										changeSelected(
											selected,
											size,
											'sizes',
											(v1, v2) =>
												(v1 as FilterSize).value ===
												(v2 as FilterSize).value
										)
									)
								}
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
								checked={!!selected?.brands?.includes(brand)}
								onChange={() =>
									selected &&
									setSelected(
										changeSelected(
											selected,
											brand,
											'brands',
											(v1, v2) => v1 === v2
										)
									)
								}
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
								checked={selected?.sort?.includes(sortType)}
								value={sortType}
								onChange={(e) =>
									selected &&
									setSelected((prev) => ({
										...prev,
										sort: [sortType],
									}))
								}
							/>
						</li>
					))}
				</ul>
			</AccordionComponent>
		</div>
	);
};

export default SideBarComponent;
