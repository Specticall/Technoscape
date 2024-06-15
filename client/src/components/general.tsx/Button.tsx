import { ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/helper";

const styles = cva("cursor-pointer transition-all duration-200", {
  variants: {
    variant: {
      primary: "",
      secondary:
        "bg-white text-slate-800 px-12 py-2 rounded-md font-semibold hover:opacity-80 transition-all duration-200 disabled:opacity-70 ",
      tertiary:
        "bg-black px-8 py-2 rounded-md text-white hover:opacity-80 transition-all duration-200",
    },
  },
});

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  children: ReactNode;
  isLoading?: boolean;
  variant?: VariantProps<typeof styles>["variant"];
};

export default function Button({
  disabled,
  children,
  variant = "primary",
  isLoading = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(styles({ variant }), className)}
      disabled={disabled || isLoading}
    >
      {children}

      {/* Add your custom loading component here */}
      {isLoading && <LoadingSpinner size={"sm"} />}
    </button>
  );
}
