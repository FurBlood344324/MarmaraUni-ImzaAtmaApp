import { cva } from 'class-variance-authority'

const radio_class = cva(
  'appearance-none rounded-full border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 w-5 h-5',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
      color: {
        primary: 'checked:bg-blue-600',
        secondary: 'checked:bg-green-600',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
)

const RadioButton = ({
  label,
  name,
  value,
  checked,
  onChange,
  classNameIn = '',
  classNameOut = '',
  ...props
}) => {
  return (
    <label className={`inline-flex cursor-pointer items-center space-x-2 ${classNameOut}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`${classNameIn} ${radio_class(props)}`}
        {...props}
      />
      <span className="select-none text-sm">{label}</span>
    </label>
  )
}

export default RadioButton
