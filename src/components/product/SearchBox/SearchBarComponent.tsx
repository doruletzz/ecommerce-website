import { Field, Input } from '@/components/input';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

type Props = {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
};

const SearchBarComponent = ({ value, setValue }: Props) => {
	return (
		<Field
			id='search-bar'
			value={value ?? ''}
			startAdornment={<FontAwesomeIcon icon={faSearch} />}
			onChange={(e) =>
				setValue((e.target as HTMLInputElement).value ?? '')
			}
		/>
	);
};

export default SearchBarComponent;
