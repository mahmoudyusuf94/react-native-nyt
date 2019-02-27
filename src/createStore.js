import {createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import newsFeedReducer from './reducers/newsFeedReducer';
import searchTermReducer from './reducers/searchTermReducer';
import promiseMiddleware from 'redux-promise';
import bookmarkReducer from './reducers/bookmarkReducer';
const logger = createLogger();

export default (initialState = {}) => (
    createStore(
        combineReducers({
            news: newsFeedReducer,
            searchTerm: searchTermReducer,
            bookmarks: bookmarkReducer
        }),
        initialState,
        applyMiddleware(logger, promiseMiddleware)
    )
);