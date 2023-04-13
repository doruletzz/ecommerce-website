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
	onBlur?: ChangeEventHandler;
	ref?: Ref<HTMLInputElement>;
};

const InputComponent = <T extends string>({
	value,
	type = 'text',
	onChange,
	onBlur,
	ref,
}: Props<T>) => {
	return (
		<input
			ref={ref}
			type={type}
			defaultValue={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

export default InputComponent;
