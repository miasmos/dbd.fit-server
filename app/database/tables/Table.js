export class Table {
    constructor(model) {
        this.model = model;
    }

    Create(properties) {
        return this.model.create(properties);
    }
}
