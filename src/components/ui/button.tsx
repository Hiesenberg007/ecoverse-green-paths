import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-hover)] hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-eco-mint to-eco-blue text-white font-semibold shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-hover)] hover:scale-105 animate-pulse-glow",
        reward: "bg-gradient-to-r from-eco-yellow to-eco-peach text-foreground font-semibold shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-hover)] hover:scale-105",
        success: "bg-gradient-to-r from-eco-success to-eco-mint text-white font-semibold shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-hover)] hover:scale-105",
        points: "bg-gradient-to-r from-eco-violet to-eco-blue text-white font-semibold shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-hover)] hover:scale-105",
        eco: "bg-eco-mint text-white hover:bg-eco-mint/90 shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-hover)] hover:scale-105",
      },
      size: {
        default: "h-12 px-6 py-3 rounded-xl",
        sm: "h-9 rounded-lg px-4",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg font-bold",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
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
