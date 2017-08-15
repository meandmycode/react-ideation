const isPlainObject = object => Object.prototype.toString.call(object) === '[object Object]';

export default class JsonVisitor {

    visit(it) {

        if (it == null) return this.visitValue(it);

        if (isPlainObject(it)) {
            return this.visitObject(it);
        } else if (Array.isArray(it)) {
            return this.visitArray(it);
        }

        return this.visitValue(it);

    }

    visitObject(obj) {

        const keys = Object.keys(obj);

        const copy = keys.reduce((copy, key) => {

            const value = obj[key];
            const prop = { key, value };

            const newProp = this.visitProperty(prop);

            copy[newProp.key] = newProp.value;

            return copy;

        }, {});

        return copy;

    }

    visitArray(arr) {
        return arr.map(item => this.visit(item));
    }

    visitProperty({ key, value: currentValue }) {
        const value = this.visit(currentValue);
        return { key, value };
    }

    visitValue(value) { // eslint-disable-line class-methods-use-this
        return value;
    }
}
