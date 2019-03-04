import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import logoImg from '../../../assets/img/logo.png';
import { normalizePixels } from '../../../util/responsivo';

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={logoImg} style={styles.image} />
                <Text style={styles.texto}>Delivery</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: normalizePixels(100),
        height: normalizePixels(100),
    },
    texto: {
        color: 'white',
        backgroundColor: 'transparent',
        marginTop: normalizePixels(10),
        fontSize: normalizePixels(50)
    },
});