export class Exception extends Error {
    public code: string;

    constructor(message: string, code: string = '') {
        // Calling parent constructor of base Error class.

        super(message);

        // Saving class name in the property of our custom error as a shortcut

        this.name = 'Exception';

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

        // You can use any additional properties you want.
        // I'm going to use preferred HTTP status for this error types.
        // `500` is the default value if not specified.
        this.code = code;
    }
}
