const InputText = ({
    type = 'text',
    label,
    error,
    className,
    placeholder,
    name,
    defaultValue,
    onChange,
    onBlur,
    required,
    ...props
}) => {
    const labelClass = error
        ? 'text-red-700 dark:text-red-500'
        : 'text-gray-900 dark:text-white'

    const inputClass = error
        ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

    return (
        <div className={className}>
            <label
                htmlFor={name}
                className={`block mb-2 text-sm font-medium ${labelClass}`}
            >
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                className={`border text-sm rounded-lg block w-full p-2.5 ${inputClass}`}
                {...props}
            />
            {error && (
                <span className='mt-2 text-sm text-red-600 dark:text-red-500'>
                    {error}
                </span>
            )}
        </div>
    )
}

export default InputText
