import { combineReducers } from 'redux';

import ideas from './ideas';
import ideasView from './ideas-view';

const rootReducer = combineReducers({
    ideas,
    ideasView,
});

export default rootReducer;
