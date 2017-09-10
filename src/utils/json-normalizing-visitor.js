import JsonVisitor from './json-visitor';

const isISODateString = str => /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d{3})?Z$/.test(str);

export default class JsonNormalizingVisitor extends JsonVisitor {

    visitValue(value) {

        if (isISODateString(value)) {
            return new Date(value);
        }

        return super.visitValue(value);

    }

}
