import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        danger:
          "bg-red-600/90 text-gray-50 hover:bg-red-600",
        outline:
          "border border-primary-950 hover:text-primary-600 hover:border-primary-500 dark:text-secondary-100 dark:border-secondary-800 dark:hover:border-primary-950  bg-transparent hover:bg-primary-100 dark:hover:bg-primary-950",
        primary:
          "bg-primary-600 text-gray-50 hover:bg-primary-700",
        secondary:
          "bg-secondary-600/90 text-gray-50 hover:bg-secondary-600",
        ghost: "hover:bg-secondary-100 dark:text-gray-100 dark:hover:bg-secondary-800",
        link: "text-primary-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
