import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as CustomButton } from "../ui/button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "borded";
  children: ReactNode;
}

export const Button = ({
  variant = "solid",
  children,
  ...rest
}: ButtonProps) => {
  const variants = {
    solid: "bg-lime9 px-6 text-lime12 hover:bg-lime10",
    borded:
      "rounded-md border border-lime6 bg-lime2 px-6 text-lime11 hover:border-lime7 hover:bg-lime2",
  };

  return (
    <CustomButton className={variants[variant]} {...rest}>
      {children}
    </CustomButton>
  );
};
