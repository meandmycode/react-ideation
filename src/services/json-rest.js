import { createError } from '../utils/error-utils';

export const BAD_RESPONSE = 'BAD_RESPONSE';

export default class JsonRest {

    constructor(baseUri, serializer) {
        this.baseUri = baseUri;
        this.serializer = serializer;
    }

    send(uri, method, item) {

        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        const body = this.serializer.serialize(item);

        return fetch(uri, {
            method,
            headers,
            body,
        });

    }

    async list() {

        const response = await fetch(this.baseUri);

        if (response.ok !== true) {
            throw createError(BAD_RESPONSE, 'Bad response when listing entities', { response });
        }

        const str = await response.text();

        return this.serializer.deserialize(str);

    }

    async create(idea) {

        const response = await this.send(this.baseUri, 'POST', idea);

        if (response.ok !== true) {
            throw createError(BAD_RESPONSE, 'Bad response when creating entity', { response });
        }

        const str = await response.text();

        return this.serializer.deserialize(str);

    }

    async update(id, idea) {

        const response = await this.send(`${this.baseUri}/${id}`, 'PUT', idea);

        if (response.ok !== true) {
            throw createError(BAD_RESPONSE, 'Bad response when updating entity', { response });
        }

        const str = await response.text();

        return this.serializer.deserialize(str);

    }

    async remove(id) {

        const response = await fetch(`${this.baseUri}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok !== true) {
            throw createError(BAD_RESPONSE, 'Bad response when deleting entity', { response });
        }

    }

}
