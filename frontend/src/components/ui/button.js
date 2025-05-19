import { cva } from 'class-variance-authority'

const button_class = cva('font-bold font-medium rounded-lg me-2 mb-2', {
  variants: {
    intent: {
      primary:
        'text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700',
      secondary: 'text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700',
    },
    size: {
      sm: 'text-sm px-5 py-2.5',
      lg: 'text-lg px-10 py-5',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'sm',
  },
})

const Button = ({ classNameIn, classNameOut, children, onClick, ...props }) => {
  return (
    <div className={`${classNameOut}`}>
      <button className={`${classNameIn} ` + button_class(props)} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

export default Button
