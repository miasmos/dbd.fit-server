export const Enum = {
    error: {
        message: {
            NOT_FOUND: "Whoops. That page doesn't exist.",
            INVALID_PARAM_TOKEN: 'Invalid token supplied.',
            INVALID_PARAM_LOCALE: 'Invalid locale supplied.',
            RATE_LIMITED: 'Your request was rate limited. Try again later.',
            GENERIC_ERROR: 'An undiagnosed error has occurred.',
            CORS: 'This is not for you.',
            NO_RESULTS: 'The request was made, but returned no results.',
            SERVICE_UNAVAILABLE:
                'The requested service is unavailable. It is either down or slow to respond.',
            RECAPTCHA_FAILED:
                'You failed to complete the captcha. Are you a robot?',
            BAD_REQUEST:
                'The request was malformed or did not validate successfully.'
        },
        code: {
            OK: 200,
            FORBIDDEN: 403,
            BAD_REQUEST: 400,
            NOT_FOUND: 404,
            TIMED_OUT: 408,
            ERROR: 500,
            TOO_MANY_REQUESTS: 429,
            NO_RESULTS: 601,
            SERVICE_UNAVAILABLE: 503
        }
    }
};
