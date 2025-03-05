import useFetch from '@/hooks/useFetch';
import CheckboxGroup from '@/components/CheckboxGroup';

export const Question = ({ question, onAnswer }: any) => {
	const handleGetSelectedValues = (value: string) => {
		setTimeout(() => {
			onAnswer(
				question._id,
				question.options.findIndex((option: string) => option === value),
			);
		}, 1000);
	};

	return (
		<div key={question._id}>
			<div className="mt-4">
				<span>{question.question}</span>
			</div>
			<div className="mt-4">
				<CheckboxGroup
					onChange={handleGetSelectedValues}
					options={question.options.map((option: string) => ({
						label: option,
						value: option,
					}))}
					correctAnswer={question.answer}
				/>
			</div>
		</div>
	);
};
