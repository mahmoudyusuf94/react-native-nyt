import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, ImageBackground, View, ViewPropTypes} from 'react-native';
import Title from './Title';

const Thumbnail = ({ url, titleText, accentColor, style }) => {
    const imageStyle = {
        backgroundColor: `${accentColor}77`
    };
    const TitleComponent = <Title style = {styles.title}> {titleText} </Title>
    return (
        <View style = {[styles.container, {borderColor: accentColor} , style]}>
            {url.length > 0 ? (
                <ImageBackground
                    style={styles.image}
                    source={{
                        uri: url
                    }}
                >
                    {TitleComponent}
                </ImageBackground>
            ) : (
                <View style = {[styles.image, imageStyle]}>
                    {TitleComponent}
                </View>
            )}
        </View>
    );
};

Thumbnail.propTypes = {
    style: ViewPropTypes,
    url: PropTypes.string.isRequired,
    titleText: PropTypes.string,
    accentColor: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    image: {
        height: 100,
        justifyContent: 'flex-end'
    },
    title: {
        padding: 5
    },
    container: {
        borderBottomWidth: 3,
        borderStyle: 'solid'
    }
});

export default Thumbnail;