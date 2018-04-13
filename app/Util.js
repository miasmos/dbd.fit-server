export function GetRequestIP(request) {
    if (
        'x-forwarded-for' in request.headers &&
        typeof request.headers['x-forwarded-for'] === 'string' &&
        request.headers['x-forwarded-for'].length
    ) {
        return request.headers.split(', ')[0];
    }
    if (
        'remoteAddress' in request.connection &&
        request.connection['remoteAddress'] === 'string' &&
        request.connection.remoteAddress.length
    ) {
        return request.connection.remoteAddress;
    }
    if (
        'socket' in request &&
        'remoteAddress' in request.socket &&
        typeof request.socket['remoteAddress'] === 'string' &&
        request.socket.remoteAddress.length
    ) {
        return request.socket.remoteAddress;
    }
    if (
        'socket' in request.connection &&
        'remoteAddress' &&
        'remoteAddress' in request.connection.socket &&
        typeof request.connection.socket.remoteAddress === 'string' &&
        request.connection.socket.remoteAddress.length
    ) {
        return request.connection.socket.remoteAddress;
    }

    return undefined;
}

export function FillString(string, ...params) {
    return string.split('%s').reduce((accumulator, value, index) => {
        return (
            accumulator +
            (index > params.length ? '%s' : params[index - 1]) +
            value
        );
    });
}

export function IsPromise(obj) {
    return (
        typeof obj === 'object' &&
        'then' in obj &&
        typeof obj.then === 'function'
    );
}

class ArrayUtils {
    static reduceToLowestByPropertyLength(array, prop) {
        return array.reduce(
            (accumulator, value) =>
                value[prop].length < accumulator
                    ? value[prop].length
                    : accumulator,
            1000
        );
    }

    static reduceToHighestByPropertyLength(array, prop) {
        return array.reduce(
            (accumulator, value) =>
                !accumulator || value[prop].length > accumulator
                    ? value[prop].length
                    : accumulator,
            0
        );
    }

    static hasDuplicate(array) {
        return array.length > 1 && array.length !== new Set(array).size;
    }

    static isEmpty(array) {
        return (
            !Array.isArray(array) ||
            !array ||
            !array.length ||
            array.filter(value => !value).length > 0
        );
    }
}
export { ArrayUtils as Array };
