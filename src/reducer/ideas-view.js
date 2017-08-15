import { SET_IDEA_SORT_TYPE, SET_IDEA_SORT_DESCENDING } from '../constants/action-types';
import { SORT_FIELD_CREATED_AT, SORT_FIELD_TITLE } from '../constants/sort-types';

const INITIAL_STATE = {
    sortType: SORT_FIELD_CREATED_AT,
    sortDescending: false,
    sortTypes: [
        SORT_FIELD_CREATED_AT,
        SORT_FIELD_TITLE,
    ],
};

export default (state = INITIAL_STATE, { type, sortType, sortDescending }) => {

    switch (type) {
        case SET_IDEA_SORT_TYPE: return { ...state, sortType };
        case SET_IDEA_SORT_DESCENDING: return { ...state, sortDescending };
        default: return state;
    }

};
