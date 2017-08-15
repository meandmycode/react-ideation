import JsonNormalizingVisitor from './json-normalizing-visitor';

const normalizer = new JsonNormalizingVisitor();

/**
 * Graph serializer provides better deserialization semantics for
 * object graphs, specifically providing deserialization of stringified
 * dates that are consistently formatted according to JSON serialization spec.
 */
export default {

    serialize(obj) {
        return JSON.stringify(obj);
    },

    deserialize(str) {
        return normalizer.visit(JSON.parse(str));
    },

};
