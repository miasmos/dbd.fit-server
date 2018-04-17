export const ErrorMessage = {
    NOT_FOUND: "Whoops. That doesn't exist.",
    INVALID_PARAM_TYPE:
        'Parameter %s supplied with invalid type, expecting %s.',
    INVALID_PARAM_VALUE: 'Parameter %s supplied with invalid value.',
    RATE_LIMITED: 'Your request was rate limited. Try again later.',
    GENERIC_ERROR: 'An undiagnosed error has occurred.',
    CORS: 'This is not for you.',
    NO_RESULTS: 'The request was made, but returned no results.',
    SERVICE_UNAVAILABLE:
        'The requested service is unavailable. It is either down or slow to respond.',
    RECAPTCHA_FAILED: 'You failed to complete the captcha. Are you a robot?',
    BAD_REQUEST: 'The request was malformed or did not validate successfully.'
};

export const ErrorCode = {
    OK: 200,
    FORBIDDEN: 403,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    TIMED_OUT: 408,
    ERROR: 500,
    TOO_MANY_REQUESTS: 429,
    NO_RESULTS: 601,
    SERVICE_UNAVAILABLE: 503,
    RECAPTCHA_FAILED: 700
};

export const ErrorType = {
    TYPE: 1,
    VALUE: 2
};
