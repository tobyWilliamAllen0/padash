import React, { forwardRef, useState } from 'react';
import { BsHandIndexThumb } from 'react-icons/bs';

interface CheckboxOption {
	label: string;
	value: string;
}

interface CheckboxGroupProps {
	options: CheckboxOption[];
	yourAnswer: number;
	wasCorrect: boolean;
	onChange: (value: string) => void;
}

const CheckboxGroup = forwardRef((props: CheckboxGroupProps, ref) => {
	const { options, onChange, wasCorrect, yourAnswer } = props;
	const [selectedValue, setSelectedValue] = useState<number>(yourAnswer);
	const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(
		yourAnswer ? true : false,
	);
	return (
		<div className="flex flex-col gap-2">
			{options.map((option, index) => {
				const answereStyle = (index: number) => {
					if (showCorrectAnswer) {
						
						if (wasCorrect && index === selectedValue) {
							return {
								background: 'linear-gradient(270deg, #00bb04, #ffffff00)',
								padding: 4,
								borderRadius: 4,
								width: '100%',
							};
						} else if (index === selectedValue) {
							return {
								background: 'linear-gradient(270deg, #ff0000, #ffffff00)',
								padding: 4,
								borderRadius: 4,
								width: '100%',
							};
						} else {
							return {
								padding: 4,
								borderRadius: 4,
								width: '100%',
							};
						}
					}
					return {
						padding: 4,
						borderRadius: 4,
						width: '100%',
					};
				};
				return (
					<label key={option.value} className="flex items-center">
						<input
							type="checkbox"
							disabled={showCorrectAnswer}
							value={option.value}
							checked={selectedValue === index}
							onChange={() => {
								onChange(option.value);
								setSelectedValue(index);
								setShowCorrectAnswer(true);
							}}
							className="mr-2 appearance-none w-6 h-6 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-transparent"
						/>
						<span className={`mr-4 text-white`} style={answereStyle(index)}>
							{option.label}
						</span>
					</label>
				);
			})}
		</div>
	);
});

export default CheckboxGroup;
