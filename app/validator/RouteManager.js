export class RouteManager {
    constructor() {
        this.routes = {};
    }

    add(path, route) {
        this.routes[path] = route;
    }

    get(path) {
        return path in this.routes ? this.routes[path] : false;
    }

    exists(path) {
        return this.get(path);
    }
}
