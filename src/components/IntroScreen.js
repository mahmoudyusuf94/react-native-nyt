import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Title from './Title';
import AppText from './AppText';
import * as globalStyles from '../styles/global';

const IntroScreen = (props) => {
    return (
    <View style={[globalStyles.COMMON_STYLES.pageContainer, styles.container]}>
        <TouchableOpacity onPress ={ () =>  { props.navigation.navigate('Feed')}}>
            <Title>React Native News Reader</Title>
            <AppText>Start Reading</AppText>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default IntroScreen;