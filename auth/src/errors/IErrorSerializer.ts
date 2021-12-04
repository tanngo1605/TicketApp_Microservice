interface ErrorSerializer {
    serializeErrors(): Array<{
        message?: string,
        field?: string
    }>
}

export default ErrorSerializer