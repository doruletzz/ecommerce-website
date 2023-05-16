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
	disabled?: boolean;
	value: T;
	checked?: boolean;
	className?: string;
	onChange?: ChangeEventHandler;
	onBlur?: ChangeEventHandler;
	ref?: Ref<HTMLInputElement>;
};

const InputComponent = <T extends string | number>({
	id,
	value,
	type = 'text',
	disabled = false,
	checked,
	className,
	onChange,
	onBlur,
	ref,
}: Props<T>) => {
	return (
		<input
			id={id}
			className={className}
			disabled={disabled}
			ref={ref}
			type={type}
			checked={checked ?? false}
			defaultValue={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
};

export default InputComponent;
