export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-orange-700 focus:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:bg-orange-800 ${
                    disabled ? 'cursor-not-allowed opacity-50' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}