import React, {
	ChangeEventHandler,
	Dispatch,
	ReactNode,
	Ref,
	SetStateAction,
} from 'react';

type Props<T> = {
	id: string;
	type?: string;
	value: T;
	onChange?: ChangeEventHandler;
	ref?: Ref<HTMLInputElement>;
};

const InputComponent = <T extends string>({
	value,
	type = 'text',
	onChange,
	ref,
}: Props<T>) => {
	return (
		<input ref={ref} type={type} defaultValue={value} onChange={onChange} />
	);
};

export default InputComponent;
