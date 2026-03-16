import React from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary"
  fullWidth?: boolean
}

export function Button({
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) {

  const base =
    "rounded-xl text-sm font-semibold transition-all hover:shadow-md active:scale-[0.99] disabled:opacity-50"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300"
  }

  return (
    <button
      className={cn(
        base,
        variants[variant],
        fullWidth && "w-full",
        "px-4 py-2",
        className
      )}
      {...props}
    />
  )
}