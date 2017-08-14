import { LIST_IDEAS, UPSERT_IDEA, REMOVE_IDEA } from '../constants/action-types';

import EntityManager from '../utils/entity-manager';

const entityManager = new EntityManager({
    keySelector: idea => idea.id,
    dateSelector: idea => idea.modifiedAt,
});

export default (state = [], action) => {

    switch (action.type) {
        case LIST_IDEAS: return entityManager.list(state, action);
        case UPSERT_IDEA: return entityManager.upsert(state, action);
        case REMOVE_IDEA: return entityManager.remove(state, action);
        default: return state;
    }

};
