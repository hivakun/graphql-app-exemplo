import React from 'react';
import { Icon, Input, Item, Label } from 'native-base';
import { StyleSheet } from "react-native";
import { CORES } from '../../assets/cores';
import { normalizePixels } from '../../util/responsivo';

export class ItemFormulario extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            erro: props.campo ? props.campo.erro : false,
            valor: props.campo ? props.campo.valor : ''
        }
    }

    componentDidUpdate(prevProps) {

        const campo = this.props.campo;
        const campoAntigo = prevProps.campo;

        if (campo && (campo.valor !== campoAntigo.valor || campo.erro !== campoAntigo.erro)) {
            this.setState({
                erro: campo.erro,
                valor: campo.valor
            });
        }
    }

    onChange(valor) {
        this.setState({valor, erro: false}, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        });
    }

    render() {

        let cross;

        if (this.state.erro) {
            cross = <Icon type='Entypo' name='circle-with-cross'/>
        }

        return (
            <Item floatingLabel error={this.state.erro}>
                <Label style={styles.label}>{this.props.label}</Label>
                <Input
                    style={{fontSize: normalizePixels(16)}}
                    {...this.props.inputProps}
                    secureTextEntry={this.props.secureTextEntry}
                    keyboardType={this.props.keyboardType}
                    returnKeyType={this.props.returnKeyType || 'done'}
                    autoCapitalize={this.props.autoCapitalize || 'sentences'}
                    onChangeText={valor => this.onChange(valor)}
                    value={this.state.valor}
                />
                {cross}
            </Item>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        color: CORES.CINZA_PRIMARIO,
        fontSize: normalizePixels(12.8)
    },
});
