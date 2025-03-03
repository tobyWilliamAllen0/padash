import React, { forwardRef } from 'react';
import { classNames } from '../utils/classNames';

interface InputProps extends React.AllHTMLAttributes<HTMLInputElement> {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ ...props }, ref) => {
		return (
			<div className="w-full flex items-center relative">
				<input
					{...props}
					ref={ref}
					className={classNames(
						'transition-colors',
						'h-12 w-full',
						'pt-4 px-4 pb-3',
						`rounded-xl !border-[0.5px] !border-[#ffffff1f] outline-none ring-0 `,
						`bg-[#FCFCFC] dark:bg-[#24242B]`,
						'placeholder:text-[#999999] placeholder:dark:text-[#999999] placeholder:font-normal',
					)}
				/>
			</div>
		);
	},
);

Input.displayName = 'Input';
