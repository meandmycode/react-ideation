import { LIST_IDEAS, UPSERT_IDEA, REMOVE_IDEA } from '../constants/action-types';

export const list = () => ({ ideasService }) => ({
    type: LIST_IDEAS,
    payload: ideasService.list(),
});

export const create = (item, trackingKey, flush) => ({ ideasService }) => {

    const payload = flush && ideasService.create(item);

    return {
        type: UPSERT_IDEA,
        item,
        trackingKey,
        payload,
    };

};

export const update = (item, entity, flush) => ({ ideasService }) => {

    const payload = flush && ideasService.update(entity.key, item);

    return {
        type: UPSERT_IDEA,
        item,
        entity,
        payload,
    };

};

export const remove = (entity, flush) => ({ ideasService }) => {

    const payload = flush && ideasService.remove(entity.key);

    return {
        type: REMOVE_IDEA,
        entity,
        payload,
    };

};
