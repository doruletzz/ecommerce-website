import { Color } from './Product';

export type Filter = {
	sort?: Sort[];
	sizes?: FilterSize[];
	colors?: FilterColor[];
	brands?: string[];
};

export type Sort = 'ascending' | 'descending' | 'newest' | 'oldest';

export type FilterColor = {
	value: Color;
	disabled: boolean;
};

export type FilterSize = {
	value: string;
	disabled: boolean;
};
