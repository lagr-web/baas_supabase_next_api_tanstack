
//src/components/TextFields.tsx

type TextFieldProps = {
    label?: string;
    className?: string;
    
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextFields = ({ label, className = "", ...props }: TextFieldProps) => {

    return (
        <div className="mb-3">
          <label className="block text-gray- text-md font-bold mb-1">{label}</label>
            <input
                {...props}
                className={`shadow border-gray-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
            />
        </div>
    )
}

export default TextFields;
