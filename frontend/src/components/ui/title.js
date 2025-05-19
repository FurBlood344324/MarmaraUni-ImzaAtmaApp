import { cva } from 'class-variance-authority'

const title_class = cva('font-bold text-gray-900 py-3', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-4xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'lg',
    weight: 'bold',
    align: 'left',
  },
})

const Title = ({ className, children, ...props }) => {
  return <h2 className={`${className} ` + title_class(props)}>{children}</h2>
}

export default Title
