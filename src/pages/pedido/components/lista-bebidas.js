import React from 'react';
import { StyleSheet } from "react-native";
import { Query } from 'react-apollo';
import { Badge, Body, Content, Icon, List, ListItem, Right, Text, Left, Thumbnail, Spinner } from "native-base";
import { BEBIDAS_QUERY } from '../../../service/pedido-service';
import { CORES } from '../../../assets/cores';
import { normalizePixels } from '../../../util/responsivo';
import PropTypes from "prop-types";

export class ListaBebidas extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            carregando: false,
            bebidaSelecionada: {id: 0},
        };
    }

    selecionarBebida(bebida) {
        this.setState({bebidaSelecionada: bebida}, () => {
            if (this.props.onChange) {
                this.props.onChange(bebida);
            }
        });
    }

    estaSelecionado(bebida) {
        return this.state.bebidaSelecionada.id === bebida.id;
    }

    renderListaBebidas(bebidas) {

        const itens = bebidas.map(bebida => {
            return (
                <ListItem key={bebida.id} noIndent onPress={() => this.selecionarBebida(bebida)}
                          style={{backgroundColor: this.estaSelecionado(bebida) ? CORES.SELECAO : 'white'}}>
                    <Body>
                        <Text style={styles.textoBebida}>
                            {bebida.nome}
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
                conteudo = this.renderListaBebidas(data.produtos);
            }
        }

        return conteudo;
    }

    render() {
        return (
            <Query query={BEBIDAS_QUERY}>{(resposta) => {
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

ListaBebidas.propTypes = {
    onChange: PropTypes.func
};

const styles = StyleSheet.create({
    textoBebida: {
        color: CORES.CINZA_SECUNDARIO,
        fontSize: normalizePixels(18)
    },
    textAlerta: {
        textAlign: 'center',
    }
});