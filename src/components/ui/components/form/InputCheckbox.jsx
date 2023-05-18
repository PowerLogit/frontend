const InputCheckbox = ({ label, name, value, checked, onChange }) => (
    <div className='flex flex-col gap-2 items-center justify-center'>
        <label
            htmlFor={name}
            className='block text-sm font-medium text-gray-900 dark:text-white'
        >
            {label}
        </label>
        <input
            id={name}
            type='checkbox'
            value={value}
            checked={checked}
            onChange={onChange}
            className='w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        />
    </div>
)

export default InputCheckbox
