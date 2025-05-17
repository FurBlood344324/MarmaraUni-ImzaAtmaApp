import React, { forwardRef } from 'react'
import { cva } from 'class-variance-authority'

const inputVariants = cva('peer sr-only', {
  variants: {
    theme: {
      light: '',
      dark: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    theme: 'light',
    size: 'md',
  },
})

const visualVariants = cva(
  'inline-block rounded-full border transition-all peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-blue-500',
  {
    variants: {
      theme: {
        light: 'bg-white border-gray-400 peer-checked:bg-blue-500',
        dark: 'bg-gray-800 border-gray-600 peer-checked:bg-blue-400',
      },
      size: {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
      },
    },
    defaultVariants: {
      theme: 'light',
      size: 'md',
    },
  }
)

const RadioButton = forwardRef(({ className, theme, size, ...props }, ref) => {
  return (
    <label className={`${className} inline-flex cursor-pointer items-center gap-2`}>
      <input type="radio" ref={ref} className={inputVariants({ theme, size })} {...props} />
      <span className={visualVariants({ theme, size })} />
    </label>
  )
})

RadioButton.displayName = 'RadioButton'

export default RadioButton
