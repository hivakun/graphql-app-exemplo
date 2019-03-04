import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';

export default class LoadingOverlay extends Component {

    static propTypes = {
        styles: PropTypes.any,
        loading: PropTypes.bool.isRequired,
        spinnerProps: PropTypes.shape({
            textContent: PropTypes.string,
            textStyle: PropTypes.any,
            overlayColor: PropTypes.string,
            cancelable: PropTypes.bool,
            color: PropTypes.string,
            animation: PropTypes.oneOf(['none', 'slide', 'fade']),
            size: PropTypes.oneOf(['small', 'normal', 'large']),
            customSpinner: PropTypes.children
        })
    };

    static defaultProps = {
        loading: false,
        spinnerProps: {overlayColor: 'rgba(0, 0, 0, 0.5)', color: '#FFF'}
    };

    render() {
        return (
            <View style={[{ flex: 1 }, this.props.styles]}>
                <Spinner {...this.props.spinnerProps} visible={this.props.loading} cancelable={true}>
                    {this.props.spinnerProps.customSpinner}
                </Spinner>
                {this.props.children}
            </View>
        );
    }
}