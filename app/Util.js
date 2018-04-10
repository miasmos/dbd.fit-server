export class Util {
    static GetRequestIP(request) {
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
}
