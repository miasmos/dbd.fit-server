export class Observer {
    constructor() {
        this.subjects = {};
    }

    on(event, fn) {
        if (!(event in this.subjects)) {
            this.subjects[event] = [];
        }

        this.subjects[event].push({
            fn: fn
        });
    }

    emit(event, args) {
        if (!(event in this.subjects)) return;
        for (var key in this.subjects[event]) {
            this.subjects[event][key].fn.call(this, args);
        }
    }

    off(event, fn) {
        if (!(event in this.subjects)) return;
        for (var key in this.subjects[event]) {
            let subject = this.subjects[key];
            if (subject.fn === fn) this.subjects[event].splice(key, 1);
        }
    }
}
