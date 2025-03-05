import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface CheckboxOption {
	label: string;
	value: string;
}

interface CheckboxGroupProps {
	options: CheckboxOption[];
	onChange: (value: string) => void;
}

const CheckboxGroup = forwardRef((props: CheckboxGroupProps, ref) => {
	const { options, onChange } = props;
	const [selectedValue, setSelectedValue] = useState<string>();

	return (
		<div className="flex flex-col gap-2">
			{options.map((option) => (
				<label key={option.value} className="flex items-center">
					<input
						type="checkbox"
						value={option.value}
						checked={selectedValue === option.value}
						onChange={() => {
							onChange(option.value);
							setSelectedValue(option.value);
						}}
						className="mr-2 appearance-none w-6 h-6 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-transparent"
					/>
					<span className="mr-4">{option.label}</span>
				</label>
			))}
		</div>
	);
});

export default CheckboxGroup;
