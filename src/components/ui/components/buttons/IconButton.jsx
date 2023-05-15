const IconButton = ({ icon: Icon, className, type = 'button', ...props }) => (
    <button
        {...props}
        type={type}
        className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white ${className}`}
    >
        <Icon />
    </button>
)

export default IconButton
