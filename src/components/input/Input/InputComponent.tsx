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
	className?: string;
	onChange?: ChangeEventHandler;
	onBlur?: ChangeEventHandler;
	ref?: Ref<HTMLInputElement>;
};

const InputComponent = <T extends string | number>({
	id,
	value,
	type = 'text',
	className,
	onChange,
	onBlur,
	ref,
}: Props<T>) => {
	return (
		<input
			id={id}
			className={className}
			ref={ref}
			type={type}
			defaultValue={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

export default InputComponent;
