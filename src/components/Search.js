import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import * as globalStyles from '../styles/global';
import PropTypes from 'prop-types';
import NewsFeed from './NewsFeed';

export default class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        };
        this.searchNews = this.searchNews.bind(this);
    }

    searchNews(text) {
        this.setState({
            searchText: text
        });
        this.props.searchNews(text);
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                <View style = {styles.search}>
                    <TextInput 
                    style={styles.input}
                    onChangeText = {text => this.searchNews(text)}
                    value = {this.state.searchText}
                    placeholder = {'Search'}
                    placeholderTextColor = {globalStyles.MUTED_COLOR}
                    />
                </View>
                <NewsFeed news={this.props.filteredNews} listStyles={{}} showLoadingSpinner={false}/>
            </View>
        );
    }
}

Search.propTypes = {
    filteredNews: PropTypes.arrayOf(PropTypes.object),
    searchNews: PropTypes.func
};

const styles = StyleSheet.create({
    input: {
        height: 35,
        color: globalStyles.TEXT_COLOR,
        paddingHorizontal: 5,
        flex: 1
    },
    search: {
        borderColor: globalStyles.MUTED_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 5
    }
});