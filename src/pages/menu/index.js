import React from 'React';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CORES } from '../../assets/cores';
import { Body, Button, Container, Content, Footer, Icon, Left, ListItem, Right, Text, View } from 'native-base';
import styles from './styles';

import { Subscribe } from 'unstated';
import { UsuarioContainer } from '../../container/usuario-container';

const logoImg = '../../assets/img/Alive-1024x1024.png';

export class MenuLateral extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarioLogado: false
        }
    }

    renderHeader(usuarioLogado) {

        let tituloCabecalho;
        let botaoLogin;

        if (usuarioLogado) {
            tituloCabecalho = (
                <View style={styles.viewTitulo}>
                    <Text style={styles.textoBemVindo}>Bem vindo,</Text>
                    <Text style={styles.textoNome}>{usuarioLogado.nome}</Text>
                </View>
            );
        } else {
            tituloCabecalho = (
                <Text style={styles.textoAlive}>Alive</Text>
            );
            botaoLogin = (
                <Button style={styles.botaoEntrar} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.textoBotaoEntrar}>ENTRAR</Text>
                </Button>
            );
        }

        return (
            <View style={styles.viewHeader}>
                <View style={styles.viewLogo}>
                    <Image source={require(logoImg)} style={styles.logo}/>
                    {tituloCabecalho}
                </View>
                <Right>
                    {botaoLogin}
                </Right>
            </View>
        );
    }

    logout(usuarioContainer) {
        this.props.navigation.closeDrawer();
        usuarioContainer.removerDados();
    }

    renderFooter(usuarioContainer) {
        if (usuarioContainer.possuiUsuarioLogado()) {
            return (
                <Footer style={styles.footer}>
                    <Button full bordered danger style={styles.botaoSair} onPress={() => this.logout(usuarioContainer)}>
                        <Text>SAIR</Text>
                    </Button>
                </Footer>
            );
        }
    }

    render() {
        return (
            <Subscribe to={[UsuarioContainer]}>{usuarioContainer => (
                <Container>
                    <Content>
                        {this.renderHeader(usuarioContainer.getUsuarioLogado())}
                        <Text style={styles.textoSessao}>MEUS DADOS</Text>
                        <ListItem noBorder icon>
                            <Left>
                                <Button style={{backgroundColor: CORES.AZUL_PRIMARIO}}>
                                    <Icon active type='Entypo' name='text'/>
                                </Button>
                            </Left>
                            <Body>
                            <Text style={styles.textoItem}>Dados cadastrais</Text>
                            </Body>
                        </ListItem>
                        <Text style={styles.textoSessao}>MINHA SAÚDE</Text>
                        <ListItem noBorder icon onPress={() => this.props.navigation.navigate('AgendamentoListagem')}>
                            <Left>
                                <Button style={{backgroundColor: CORES.VERDE_PRIMARIO}}>
                                    <Icon active name='calendar'/>
                                </Button>
                            </Left>
                            <Body>
                            <Text style={styles.textoItem}>Agendamentos</Text>
                            </Body>
                        </ListItem>
                        <ListItem noBorder icon>
                            <Left>
                                <Button style={{backgroundColor: CORES.VERDE_PRIMARIO}}>
                                    <Icon active type='Entypo' name='heart-outlined'/>
                                </Button>
                            </Left>
                            <Body>
                            <Text style={styles.textoItem}>Índices de saúde</Text>
                            </Body>
                        </ListItem>
                        <ListItem noBorder icon onPress={() => this.props.navigation.navigate('MedicamentoListagem')}>
                            <Left>
                                <Button style={{backgroundColor: CORES.VERDE_PRIMARIO}}>
                                    <Icon active type='Entypo' name='creative-commons-noderivs'/>
                                </Button>
                            </Left>
                            <Body>
                            <Text style={styles.textoItem}>Medicamentos</Text>
                            </Body>
                        </ListItem>
                    </Content>
                    {this.renderFooter(usuarioContainer)}
                </Container>
            )}</Subscribe>
        );
    }
}
