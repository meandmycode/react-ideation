import { SET_IDEA_SORT_TYPE, SET_IDEA_SORT_DESCENDING } from '../constants/action-types';

export const setSortType = sortType => ({ type: SET_IDEA_SORT_TYPE, sortType });
export const setSortDescending = sortDescending => ({ type: SET_IDEA_SORT_DESCENDING, sortDescending });
