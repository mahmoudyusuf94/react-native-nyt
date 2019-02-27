import React, { Component } from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import {
    ListView,
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    WebView,
    RefreshControl,
    ActivityIndicator,
    NetInfo
} from 'react-native';
import * as globalStyles from '../styles/global';
import NewsItem from './NewsItem';
import SmallText from './SmallText';
import AppText from './AppText';

export default class NewsFeed extends Component {

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.title !== row2.title
        });
        this.state = {
            dataSource: this.ds.cloneWithRows(props.news),
            initialLoading: true,
            modalVisible: false,
            refreshing: false,
            connected: true
        };
        console.log(this.state.dataSource);
        this.renderModal = this.renderModal.bind(this);
        this.onModalOpen = this.onModalOpen.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    }

    handleConnectivityChange(isConnected){
        this.setState({
            connected: isConnected
        });
        if(isConnected){
            this.refresh;
        }
    }

    componentWillMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
        this.refresh();
    }

    componentWillUnmount(){
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillReceiveProps(nextProps){
        this.setState ({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.news),
            initialLoading: false
        });
    }

    refresh(){
        if(this.props.loadNews) {
            this.props.loadNews();
        }
    }

    renderModal(){
        return (
            <Modal
            animationType="slide"
            visible = {this.state.modalVisible}
            onRequestClose={this.onModalClose}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={this.onModalClose}
                        style={styles.closeButton}
                    >
                        <SmallText>Close</SmallText>
                    </TouchableOpacity>
                    <WebView 
                    scalesPageToFit
                    source = {{ uri: this.state.modalUrl }}
                    />
                </View>
            </Modal>
        );
    }

    onModalOpen(url) {
        this.setState({
            modalVisible: true,
            modalUrl: url
        });
    }

    onModalClose() {
        this.setState({
            modalVisible: false
        });
    }

    renderRow(rowData, ...rest){
        const index = parseInt(rest[1], 10);
        return (
            <NewsItem 
            onPress = {() => this.onModalOpen(rowData.url)}
            style = {styles.newsItem}
            index={index}
            {...rowData}
            />
        );
    }
    
    render() {

        if(!this.state.connected) {
            console.log("NOT CONNECTED!!!");
            return (
                <View style={{flex:1}}>
                    <AppText>No Connection!</AppText>
                </View>
            );
        }

        const {
            listStyles = globalStyles.COMMON_STYLES.pageContainer,
            showLoadingSpinner
        } = this.props;
        const { initialLoading, refreshing, dataSource } = this.state;
        console.log(this.props);
        console.log(this.state);
        return (
            ( (initialLoading && showLoadingSpinner)
            ? (
                    <View style={[listStyles, styles.loadingContainer]}>
                        <ActivityIndicator
                            animating
                            size="small"
                            {...this.props}
                        />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <ListView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={this.refresh}
                                />
                            }
                            enableEmptySections
                            dataSource={dataSource}
                            renderRow={this.renderRow}
                            style={listStyles}
                        />
                        {this.renderModal()}
                    </View>
                )
            )
        );
    }
}

NewsFeed.propTypes = {
    news: PropTypes.arrayOf(PropTypes.object),
    listStyles: ViewPropTypes,
    loadNews: PropTypes.func,
    showLoadingSpinner: PropTypes.bool
};

NewsFeed.defaultProps = {
    showLoadingSpinner: true
};

const styles = StyleSheet.create({
    newsItem: {
        marginBottom: 20
    },
    container: {
        flex: 1
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
        backgroundColor: globalStyles.BG_COLOR
    },
    closeButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row'
    }
});