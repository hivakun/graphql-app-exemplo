import React from 'React';
import { Body, Button, Header, Icon, Left, Title } from 'native-base';
import { StyleSheet } from "react-native";
import { CORES } from '../../../assets/cores';
import { normalizePixels } from '../../../util/responsivo';

export class HeaderBack extends React.Component {

    constructor(props) {
        super(props);
    }

    navigate() {
        if (this.props.navigation) {
            if (this.props.backTo) {
                this.props.navigation.navigate(this.props.backTo);
            } else {
                this.props.navigation.goBack();
            }
        }
    }

    render() {
        return (
            <Header style={styles.header} androidStatusBarColor={CORES.VERDE_SECUNDARIO}>
                <Left>
                    <Button transparent onPress={() => this.navigate()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                <Title style={styles.texto}>{this.props.titulo}</Title>
                </Body>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: CORES.VERDE_SECUNDARIO,
        shadowRadius: 0
    },
    texto: {marginLeft: 10, color: 'white', fontSize: normalizePixels(24)},
});