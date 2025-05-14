import { cva } from 'class-variance-authority'

const text_class = cva({
  variants: {
    size: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    color: {
      primary: 'text-black-500',
      secondary: 'text-gray-500',
      danger: 'text-red-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
    },
    font: {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
    },
  },
  defaultVariants: {
    size: 'base',
    color: 'primary',
    font: 'sans',
  },
})

const Text = ({ classNameIn, classNameOut, children, ...props }) => {
  return (
    <div className={`${classNameOut} py-1`}>
      <p className={`${classNameIn}` + text_class(props)}>{children}</p>
    </div>
  )
}

export default Text
