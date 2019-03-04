/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import App from '../App';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
import toJson from 'enzyme-to-json';

import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const logger = createLogger();
const middlewares = [logger, promiseMiddleware]; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);

const initialState = {
    news: [],
    searchTerm: '',
    bookmarks: []
}
it('renders correctly', () => {
    const wrapper = enzyme.shallow(
        <App />,
        {context: {store: mockStore(initialState)}}
    )
    expect(toJson(wrapper.dive())).toMatchSnapshot();
});
