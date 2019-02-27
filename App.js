import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import IntroScreen from './src/components/IntroScreen';
import { Provider } from 'react-redux';
import createStore from './src/createStore';
import HomeScreen from './src/components/HomeScreen';

const AppNavigator = createStackNavigator(
    {
    Intro: IntroScreen,
    Feed: HomeScreen
    }, {
        initialRouteName: 'Intro',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
);


const AppContainer = createAppContainer(AppNavigator);
const store = createStore();

export default class App extends Component {
    render() {
        return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
        ); 
    }
}