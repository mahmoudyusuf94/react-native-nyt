import React, {Component} from 'react';
import ScrollableTabView, { DefaultTabBar} from 'react-native-scrollable-tab-view';
import NewsFeedContainer from '../containers/NewsFeedContainer';
import SearchContainer from '../containers/SearchContainer';
export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'News Feed'
    };

    render() {
        return (
            <ScrollableTabView
            // renderTabBar = {<DefaultTabBar />}
            >
                <NewsFeedContainer tabLabel="News Feed" />
                <SearchContainer tabLabel="Search" />
            </ScrollableTabView>
        );
    }
}