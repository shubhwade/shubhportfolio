import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[.97]",
  {
    variants: {
      variant: {
        default: "bg-ink text-bg hover:bg-accent hover:text-white shadow-[0_1px_0_rgba(255,255,255,.12)_inset,0_10px_24px_-12px_rgba(20,20,19,.6)]",
        accent: "bg-accent text-white hover:bg-ink shadow-[0_10px_28px_-12px_rgba(255,91,31,.8)]",
        outline: "border border-line bg-surface/70 text-ink backdrop-blur hover:border-ink hover:bg-surface",
        ghost: "text-ink-2 hover:bg-ink/5 hover:text-ink",
        dark: "border border-graphite-line bg-graphite-2 text-bone hover:border-ash hover:text-white",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        sm: "h-9 px-4 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
