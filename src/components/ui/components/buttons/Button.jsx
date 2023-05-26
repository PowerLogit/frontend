const Button = ({
    kind = 'primary',
    type = 'button',
    className,
    disabled = false,
    children,
    loading,
    icon: Icon,
    ...props
}) => {
    const baseStyles = KIND_CLASSNAME[kind]
    const styleDisabled = disabled ? 'cursor-not-allowed' : ''
    const optinalStyles = className || ''
    const styles = `${baseStyles} ${styleDisabled} ${optinalStyles}`

    return (
        <button
            type={type}
            disabled={disabled || loading}
            {...props}
            className={styles}
        >
            {Icon && <Icon className={'text-white w-5 h-5 mr-1'} />}
            {loading ? 'Cargando...' : children}
        </button>
    )
}

const KIND_CLASSNAME = {
    primary:
        'text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
    outline:
        'text-dark dark:text-white hover:text-white border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primary-500 dark:hover:bg-primary-500 dark:focus:ring-primary-800',
    normal: 'px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
    danger: 'text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center',
}

export default Button
