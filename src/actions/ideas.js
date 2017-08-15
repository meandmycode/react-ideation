import { LIST_IDEAS, UPSERT_IDEA, REMOVE_IDEA } from '../constants/action-types';

export const list = () => (dispatch, getState, { ideasService }) => {

    dispatch({
        type: LIST_IDEAS,
        payload: ideasService.list(),
    });

};

export const upsert = (item, entity, flush) => (dispatch, getState, { ideasService }) => {

    const type = UPSERT_IDEA;

    if (flush) {

        const payload = entity && entity.key
            ? ideasService.update(entity.key, item)
            : ideasService.create(item);

        return dispatch({
            type,
            item,
            entity,
            payload,
        });

    }

    dispatch({
        type,
        item,
        entity,
    });

};

export const remove = (entity, flush) => (dispatch, getState, { ideasService }) => {

    const type = REMOVE_IDEA;

    if (flush) {

        const payload = ideasService.remove(entity.key);

        return dispatch({
            type,
            entity,
            payload,
        });

    }

    dispatch({
        type,
        entity,
    });

};
