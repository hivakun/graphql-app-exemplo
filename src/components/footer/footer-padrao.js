import React from 'react';
import { StyleSheet } from 'react-native'
import { Footer } from 'native-base';

export class FooterPadrao extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Footer {...this.props} style={[styles.footer, this.props.style]}>
                {this.props.children}
            </Footer>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        elevation: 0,
        borderWidth: 0,
        backgroundColor: 'white',
        shadowColor: 'transparent',
    }
});