import JsonVisitor from './json-visitor';

const isISODateString = str => /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d{3})?Z$/.test(str);

export default class JsonNormalizingVisitor extends JsonVisitor {

    visitProperty({ key: currentKey, value }) {

        const key = currentKey[0].toLowerCase() + currentKey.substring(1);

        return super.visitProperty({ key, value });

    }

    visitValue(value) {

        if (isISODateString(value)) {
            return new Date(value);
        }

        return super.visitValue(value);

    }

}
