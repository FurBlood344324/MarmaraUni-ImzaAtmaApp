import { cva } from 'class-variance-authority'

const cardClass = cva('rounded-2xl p-6 max-w-sm transition-shadow', {
  variants: {
    theme: {
      light: 'bg-white text-black',
      dark: 'bg-gray-800 text-white border border-gray-700',
    },
    variant: {
      elevated: 'shadow-lg',
      flat: 'shadow-none',
      bordered: 'border border-gray-300 dark:border-gray-700',
    },
  },
  defaultVariants: {
    theme: 'light',
    variant: 'elevated',
  },
})

const Card = ({ className, children, ...props }) => {
  return <div className={`${className}` + cardClass(props)}>{children}</div>
}

export default Card
