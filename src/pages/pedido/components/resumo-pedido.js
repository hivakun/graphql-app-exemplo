import React from 'react';
import { StyleSheet } from "react-native";
import { Card, CardItem, Text } from 'native-base';
import { CORES } from '../../../assets/cores';
import { normalizePixels } from '../../../util/responsivo';

export class ResumoPedido extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resumo: null
        }
    }

    componentDidUpdate(prevProps) {

        const {resumo} = this.props;

        console.log('resumo', resumo);

        if (resumo && !this.state.resumo) {
            this.setState({resumo});
        } else if (!resumo && this.state.resumo) {
            this.setState({resumo});
        } else if (resumo && prevProps.resumo && (resumo.prato !== prevProps.resumo.prato || resumo.bebida !== prevProps.resumo.bebida)) {
            this.setState({resumo});
        }
    }

    getCampoValidado(campo) {

        if (this.state.resumo && this.state.resumo[campo]) {
            return this.state.resumo[campo];
        }

        return '-';
    }

    render() {
        return (
            <Card>
                <CardItem header bordered>
                    <Text style={styles.textoHeader}>Resumo do pedido</Text>
                </CardItem>
                <CardItem style={styles.cardItem}>
                    <Text style={styles.textoLabel}>Prato: </Text>
                    <Text style={styles.textInfo}>{this.getCampoValidado('prato')}</Text>
                </CardItem>
                <CardItem style={styles.cardItem}>
                    <Text style={styles.textoLabel}>Bebida: </Text>
                    <Text style={styles.textInfo}>{this.getCampoValidado('bebida')}</Text>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    cardItem: {
        height: 40
    },
    textoHeader: {
        color: CORES.VERDE_PRIMARIO,
        fontSize: normalizePixels(16)
    },
    textoLabel: {
        fontSize: normalizePixels(16)
    },
    textInfo: {
        color: CORES.CINZA_SECUNDARIO,
        fontSize: normalizePixels(16)
    }
});
