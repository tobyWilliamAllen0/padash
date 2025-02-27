import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface CheckboxOption {
	label: string;
	value: string;
}

interface CheckboxGroupProps {
	options: CheckboxOption[];
}

const CheckboxGroup = forwardRef((props: CheckboxGroupProps, ref) => {
	const { options } = props;
	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	const handleCheckboxChange = (value: string) => {
		setSelectedValues((prev) =>
			prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
		);
	};

	useImperativeHandle(ref, () => ({
		getSelectedValues: () => selectedValues,
	}));

	return (
		<div className="flex flex-col gap-2">
			{options.map((option) => (
				<label key={option.value} className="flex items-center">
					<input
						type="checkbox"
						value={option.value}
						checked={selectedValues.includes(option.value)}
						onChange={() => handleCheckboxChange(option.value)}
						className="mr-2 appearance-none w-6 h-6 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-transparent"
					/>
					<span className="mr-4">{option.label}</span>
				</label>
			))}
		</div>
	);
});

export default CheckboxGroup;
