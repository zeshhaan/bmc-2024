import React from "react";
import { Icon } from "@iconify/react";

const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  ...rest
}: {
  variant?: string;
  size?: string;
  icon?: string;
  children?: React.ReactNode;
}) => {
  const sizeClasses: { [key: string]: string } = {
    sm: "h-[36px] min-w-[36px] px-4 text-sm",
    md: "h-[40px] min-w-[40px] px-4 text-base",
    lg: "h-[67px] min-w-[67px] px-4 text-lg",
  };

  const variantClasses: { [key: string]: string } = {
    primary: "bg-primary text-white hover:bg-primary/80",
    secondary: "bg-[#EBEBEB]/60 text-black hover:bg-gray-300",
    outline: "border border-[#E1D6D6] text-black hover:bg-gray-100",
    ghost: "text-[#717171] hover:bg-gray-100",
  };

  return (
    <button
      className={`grid grid-flow-col items-center justify-center gap-2 rounded-full transition-colors duration-300 ${sizeClasses[size]} ${variantClasses[variant]}`}
      {...rest}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );
};

export default Button;
