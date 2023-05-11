const Heading = ({ text, className }) => {
    return (
        <h1
            className={`text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white ${className}`}
        >
            {text}
        </h1>
    )
}

export default Heading
