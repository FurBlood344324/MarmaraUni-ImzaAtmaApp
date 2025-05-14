import { cva } from 'class-variance-authority'

const textinput_class = cva('w-full px-4 py-2 border rounded-md transition-all', {
  variants: {
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    },
    variant: {
      filled: 'bg-gray-100 border-gray-300',
      outline: 'bg-transparent border-gray-500',
      none: 'bg-transparent border-transparent',
    },
    disabled: {
      true: 'bg-gray-200 text-gray-400 cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    size: 'medium',
    variant: 'outline',
    disabled: 'false',
  },
})

const TextInput = ({ className, size, variant, disabled, onChange, ...props }) => {
  return (
    <div className={`${className} py-1.5`}>
      <input
        {...props}
        disabled={disabled}
        className={textinput_class({ size, variant, disabled })}
        onChange={onChange}
      />
    </div>
  )
}

export default TextInput
