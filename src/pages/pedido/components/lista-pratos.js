import React from 'react';
import { StyleSheet } from "react-native";
import { Query } from 'react-apollo';
import { Badge, Body, Content, Icon, List, ListItem, Right, Text, Left, Thumbnail, Spinner } from "native-base";
import { PRATOS_QUERY } from '../../../service/pedido-service';
import { CORES } from '../../../assets/cores';
import { normalizePixels } from '../../../util/responsivo';
import PropTypes from "prop-types";

export class ListaPratos extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            carregando: false,
            pratoSelecionado: {id: 0},
        };
    }

    selecionarPrato(prato) {
        this.setState({pratoSelecionado: prato}, () => {
            if (this.props.onChange) {
                this.props.onChange(prato);
            }
        });
    }

    estaSelecionado(prato) {
        return this.state.pratoSelecionado.id === prato.id;
    }

    renderListaPratos(pratos) {

        const itens = pratos.map(prato => {
            return (
                <ListItem key={prato.id} avatar noIndent onPress={() => this.selecionarPrato(prato)}
                          style={{backgroundColor: this.estaSelecionado(prato) ? CORES.SELECAO : 'white'}}>
                    <Left>
                        <Thumbnail source={{uri: prato.imagemUrl}}/>
                    </Left>
                    <Body>
                    <Text style={styles.textoPrato}>
                        {prato.nome}
                    </Text>
                    <Text note>
                        {prato.descricao}
                    </Text>
                    </Body>
                    <Icon type="Entypo" name="chevron-right"/>
                </ListItem>
            )
        });

        return (
            <List>
                {itens}
            </List>
        );
    }

    renderConteudo({loading, error, data}) {

        let conteudo;

        if (loading) {
            conteudo = <Spinner/>;
        } else if (error) {
            conteudo = <Text style={styles.textAlerta}>Falha na operação</Text>;
        } else {
            const possuiDados = data && data.produtos && data.produtos.length;

            if (!possuiDados) {
                conteudo = <Text style={styles.textAlerta}>Não há dados</Text>;
            } else {
                conteudo = this.renderListaPratos(data.produtos);
            }
        }

        return conteudo;
    }

    render() {
        return (
            <Query query={PRATOS_QUERY}>{(resposta) => {
                return (
                    <Content>
                        {this.renderConteudo(resposta)}
                    </Content>
                );
            }}
            </Query>
        )
    }
}

ListaPratos.propTypes = {
    onChange: PropTypes.func
};

const styles = StyleSheet.create({
    textoPrato: {
        color: CORES.CINZA_SECUNDARIO,
        fontSize: normalizePixels(18)
    },
    textAlerta: {
        textAlign: 'center',
    }
});