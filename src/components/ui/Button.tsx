import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  withArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", withArrow, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center text-sm font-semibold uppercase tracking-wider transition-all duration-200",
          "active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none rounded-none",
          {
            "bg-anvaya-gold text-anvaya-navy hover:bg-[#b59041] px-6 py-3": variant === "primary",
            "bg-anvaya-ivory text-anvaya-navy border border-anvaya-navy hover:bg-[#e8e4db] px-6 py-3": variant === "secondary",
            "border border-anvaya-navy text-anvaya-navy hover:bg-anvaya-navy hover:text-white px-6 py-3": variant === "outline",
            "text-anvaya-navy hover:underline underline-offset-4 decoration-anvaya-gold decoration-2 px-4 py-2": variant === "ghost",
          },
          className
        )}
        {...props}
      >
        {children}
        {withArrow && <ArrowRight className="ml-2 w-4 h-4" />}
      </button>
    );
  }
);
Button.displayName = "Button";
