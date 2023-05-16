import { Color } from './Product';

export type Filter = {
	sort?: 'ascending' | 'descending' | 'newest' | 'oldest';
	sizes?: FilterSize[];
	colors?: FilterColor[];
	brands?: string[];
};

export type FilterColor = {
	value: Color;
	disabled: boolean;
};

export type FilterSize = {
	value: string;
	disabled: boolean;
};
