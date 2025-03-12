import { classNames } from '../utils/classNames';
import { PinInput } from 'react-input-pin-code';
import { PinInputProps } from 'react-input-pin-code/dist/types/PinInput';

interface IProps extends PinInputProps {
	isError?: boolean;
}

const StyledPinInput: React.FC<IProps> = ({
	containerClassName,
	inputClassName,
	isError,
	...rest
}) => {
	return (
		<div className="w-full" dir="ltr">
			<PinInput
				{...rest}
				containerClassName={classNames(
					'h-14 w-full',
					'flex items-center justify-between md:gap-3 gap-1',
					containerClassName ?? '',
				)}
				inputClassName={classNames(
					'rounded-xl !border-[0.5px] !border-[#6d6d6d]',
					'transition-colors',
					'focus:!outline-0 focus:!ring-0',
					isError ? '!border-b-[#F03B6B] mb-4' : '',
					'w-full flex-1 min-w-0 h-full !h-14 ',
					'rounded-xl',
					'text-white ',
				)}
				placeholder='-'
				showState={false}
				validate={/^[0-9]*$/}
                size="md"
				autoFocus
				autoTab
			/>
			{isError && <span className="text-[#F03B6B] ">کد اشتباه است</span>}
		</div>
	);
};

export default StyledPinInput;
