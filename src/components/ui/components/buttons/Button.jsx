const Button = ({ kind = 'primary', type = 'button', className, ...props }) => (
    <button
        type={type}
        {...props}
        className={`${KIND_CLASSNAME[kind]} ${className || ''}`}
    ></button>
)

const KIND_CLASSNAME = {
    primary:
        'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
    outline:
        'w-full text-dark dark:text-white hover:text-white border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primary-500 dark:hover:bg-primary-500 dark:focus:ring-primary-800',
}

export default Button
