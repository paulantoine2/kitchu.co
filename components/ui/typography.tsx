import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TypographyH1({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function TypographyH4({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  )
}

export function TypographyP({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  )
}

export function TypographyLead({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

export function TypographyLarge({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </div>
  )
}

export function TypographySmall({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <small
      className={cn("text-sm font-medium leading-none block", className)}
      {...props}
    >
      {children}
    </small>
  )
}

export function TypographyMuted({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}
