import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
}
const Button: React.FC<ButtonProps> = ({
	children,
	isLoading = false,
	className,
	...props
}) => {
	return (
		<button
			data-testid="button"
			className={`
                bg-[#4d9ce2] w-full rounded-lg h-12 flex items-center justify-center
                ${className ? className : ''}
            `}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
