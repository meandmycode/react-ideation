import { STATUS_PENDING, STATUS_SUCCESS } from '../constants/async-states';

const createMap = (items, keySelector, valueSelector) => {

    const map = new Map();

    for (const item of items) {

        const key = keySelector(item);
        const existingValue = map.get(key);

        const value = valueSelector(item, existingValue);

        map.set(key, value);

    }

    return map;

};

const createRandomKey = () => Math.random().toString(16);

export default class EntityManager {

    constructor({ keySelector, dateSelector } = {}) {
        this.keySelector = keySelector;
        this.dateSelector = dateSelector;
    }

    list(entities, action) {

        if (action.status === STATUS_SUCCESS) {

            const keyMap = createMap(entities, entity => entity.key, entity => entity);

            const newEntities = action.payload.reduce((entities, item) => {

                const key = this.keySelector(item);
                const date = this.dateSelector(item);
                const persistent = true;
                const busy = false;
                const ephemeral = createRandomKey();

                const existingEntity = keyMap.get(key);

                if (existingEntity && existingEntity.date >= date) {
                    return entities;
                }

                const newEntity = { item, key, date, persistent, busy, ephemeral };

                return [...entities, newEntity];

            }, []);

            return [...entities, ...newEntities];
        }

        // TODO: handle error states
        return entities;
    }

    upsert(entities, action) {

        const flushing = action.status != null;
        const busy = flushing && action.status === STATUS_PENDING;

        // if this is not async, then we're just storing the item for later persistence

        const item = action.status === STATUS_SUCCESS
            ? action.payload
            : action.item;

        const error = action.error;

        const key = this.keySelector(item);

        // if we dont have an existing entity then append a new one
        if (action.entity == null) {

            const existingEntity = entities.find(entity => entity.item === action.item);

            if (existingEntity) {

                // otherwise this is an update to an already tracked entity
                return entities.map(entity => {

                    if (entity !== existingEntity) return entity;

                    const date = this.dateSelector(item);

                    return { ...existingEntity, item, key, date, flushing, busy, error };

                });

            }

            const date = new Date();
            const ephemeral = createRandomKey();

            const newEntity = { item, key, date, flushing, busy, ephemeral, error };

            return [...entities, newEntity];

        }

        // otherwise this is an update to an already tracked entity
        return entities.map(entity => {

            if (entity.ephemeral !== action.entity.ephemeral) return entity;

            const date = this.dateSelector(item);

            return { ...entity, item, key, date, flushing, busy, error };

        });

    }

    remove(entities, action) {

        const error = action.error;
        const removed = error == null;

        return entities.reduce((entities, entity) => {

            if (entity.ephemeral !== action.entity.ephemeral) return [...entities, entity];

            if (action.status === STATUS_SUCCESS) return entities;

            return [...entities, { ...entity, error, removed }];

        }, []);

    }

}
