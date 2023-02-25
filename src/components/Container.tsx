import clsx from 'clsx'
import type { ReactNode } from "react"

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </div>
  )
}
