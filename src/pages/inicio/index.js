import React from 'react';
import { Container, Text, Content, Button, Icon, Fab, View, CardItem, Accordion, Spinner } from "native-base";
import { FooterPadrao } from '../../components/footer/footer-padrao';
import styles from './styles';
import UsuarioService from '../../service/usuario-service';
import { CORES } from '../../assets/cores';
import { PEDIDOS_QUERY } from '../../service/pedido-service';
import { Query } from 'react-apollo';
import { exibirDataPadrao } from '../../util/data-util';

export class Inicio extends React.Component {

    static navigationOptions = {
        title: 'Delivery',
        headerStyle: {
            backgroundColor: CORES.VERDE_SECUNDARIO
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            carregando: false,
        };

        this.usuarioService = new UsuarioService();
        this.renderConteudo = this.renderConteudo.bind(this);
        this.renderCabecalho = this.renderCabecalho.bind(this);
    }

    sair() {
        this.usuarioService.logoff();
        this.props.navigation.navigate('Login');
    }

    renderCabecalho(item, expanded) {

        const {createdAt} = item;

        const icone = <Icon style={styles.icone} type='Entypo' name={expanded ? 'chevron-small-up' : 'chevron-small-down'}/>;

        return (
            <View style={styles.header}>
                <Text style={styles.textoLabel}>
                    {exibirDataPadrao(createdAt)}
                </Text>
                {icone}
            </View>
        );
    }

    renderConteudo(item) {

        const {prato, bebida} = item;

        return (
            <View>
                <CardItem style={styles.cardItem}>
                    <Text style={styles.textoLabel}>Prato: </Text>
                    <Text style={styles.textInfo}>{prato.nome}</Text>
                </CardItem>
                <CardItem style={styles.cardItem}>
                    <Text style={styles.textoLabel}>Bebida: </Text>
                    <Text style={styles.textInfo}>{bebida.nome}</Text>
                </CardItem>
            </View>
        );
    }

    renderAccordion(pedidos) {
        return (
            <Accordion
                dataArray={pedidos}
                animation={true}
                expanded={0}
                renderHeader={this.renderCabecalho}
                renderContent={this.renderConteudo}
            />
        );
    }

    renderResultado({loading, error, data}) {

        let conteudo;

        if (loading) {
            conteudo = <Spinner/>;
        } else if (error) {
            conteudo = <Text style={styles.textAlerta}>Falha na operação</Text>;
        } else {
            const possuiDados = data && data.pedidos && data.pedidos.length;

            if (!possuiDados) {
                conteudo = <Text style={styles.textAlerta}>Não há pedidos</Text>;
            } else {
                conteudo = this.renderAccordion(data.pedidos);
            }
        }

        return conteudo;
    }

    render() {
        return (
            <Query query={PEDIDOS_QUERY}>{(resposta) => {
                console.log(resposta);
                return (
                    <Container>
                        <Content padder>
                            {this.renderResultado(resposta)}
                        </Content>
                        <View>
                            <Fab
                                style={{backgroundColor: CORES.VERDE_PRIMARIO}}
                                onPress={() => this.props.navigation.navigate('Pedido')}
                                position="bottomRight">
                                <Icon type='Entypo' name='plus'/>
                            </Fab>
                        </View>
                        <FooterPadrao>
                            <Button block bordered danger style={styles.buttonSair} onPress={() => this.sair()}>
                                <Text>SAIR</Text>
                            </Button>
                        </FooterPadrao>
                    </Container>
                );
            }}
            </Query>
        );
    }
}
