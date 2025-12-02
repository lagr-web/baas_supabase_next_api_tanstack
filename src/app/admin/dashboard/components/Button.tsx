//src/components/Button.tsx

type TextFieldProps = {
  className?: string;

} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className = "", ...props }: TextFieldProps) => {

  return (

    <div className="grid justify-end">
      <button type="submit" {...props} className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}>
        {children}
      </button>
    </div>
  )
}

export default Button;