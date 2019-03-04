import React from 'react';
import styles from './styles';
import { Button, Container, Content, Form, Text, Toast } from 'native-base';
import { EMAIL_REGEX } from '../../util/string-util';
import LoadingOverlay from '../../components/loading/loading';
import { ItemFormulario } from '../../components/form/item-formulario';
import { FooterPadrao } from '../../components/footer/footer-padrao';
import { HeaderBack } from '../../components/header/header-back/header-back';
import { CORES } from '../../assets/cores';
import UsuarioService from '../../service/usuario-service';

export class Cadastro extends React.Component {

    static navigationOptions = {
        title: 'Cadastro',
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
            nome: {
                erro: false,
                valor: ''
            },
            sobrenome: {
                erro: false,
                valor: ''
            },
            email: {
                erro: false,
                valor: ''
            },
            senha: {
                erro: false,
                valor: ''
            },
            confirmacao: {
                erro: false,
                valor: ''
            }
        };

        this.service = new UsuarioService();
    }

    obterCampos() {
        let campos = this.state;
        delete campos.carregando;
        return Object.keys(campos);
    }

    obterDadosCadastro() {

        const cadastro = {};

        this.obterCampos().forEach(campo => {
            cadastro[campo] = this.state[campo].valor;
        });

        console.log('Dados cadastro', cadastro);
        return cadastro;
    }

    atualizar(campo, valor) {
        this.setState({[campo]: valor});
    }

    getConfirmacaoSenhaValidada() {

        const confirmacao = this.state.confirmacao.valor;

        if (confirmacao && confirmacao.trim() === this.state.senha.valor) {
            return {erro: false, valor: confirmacao.trim()};
        } else {
            return {erro: true, valor: confirmacao};
        }
    }

    getCampoValidado(campo) {
        const dado = this.state[campo];
        return {erro: !dado.valor, valor: dado.valor.trim()};
    }

    getEmailValidado() {

        const email = this.state.email.valor;

        if (EMAIL_REGEX.test(email.trim())) {
            return {erro: false, valor: email.trim()};
        } else {
            return {erro: true, valor: email};
        }
    }

    atualizarCampos(callback) {

        const nome = this.getCampoValidado('nome');
        const sobrenome = this.getCampoValidado('sobrenome');
        const email = this.getEmailValidado();
        const senha = this.getCampoValidado('senha');
        const confirmacao = this.getConfirmacaoSenhaValidada();

        this.setState({nome, sobrenome, email, senha, confirmacao}, () => {
            callback();
        });
    }

    dadosValidos() {

        let invalido = false;

        this.obterCampos().forEach((campo) => {
            invalido = invalido || this.state[campo].erro;
        });

        return !invalido;
    }

    cadastrar() {
        this.atualizarCampos(() => {
            if (this.dadosValidos()) {
                this.setState({carregando: true}, () => {
                    this.service.cadastrar(this.obterDadosCadastro()).then(() => {
                        this.setState({carregando: false}, () => {
                            this.props.navigation.navigate('Inicio');
                        });
                    }).catch(error => {
                        this.setState({carregando: false});
                        console.log('Erro', error);
                        Toast.show({text: 'Falha no cadastro'});
                    });
                });
            }
        });
    }

    renderFooter() {
        return (
            <FooterPadrao>
                <Button block bordered success style={styles.button} onPress={() => this.cadastrar()}>
                    <Text>CADASTRAR</Text>
                </Button>
            </FooterPadrao>
        );
    }

    render() {

        return (
            <LoadingOverlay loading={this.state.carregando}>
                <Container padder>
                    <Content>
                        <Form>
                            <ItemFormulario
                                label='Nome'
                                campo={this.state.nome}
                                onChange={(valor) => this.atualizar('nome', valor)}/>
                            <ItemFormulario
                                label='Sobrenome'
                                campo={this.state.sobrenome}
                                onChange={(valor) => this.atualizar('sobrenome', valor)}/>
                            <ItemFormulario
                                label='Email'
                                campo={this.state.email}
                                onChange={(valor) => this.atualizar('email', valor)}
                                autoCapitalize='none'/>
                            <ItemFormulario
                                label='Senha'
                                campo={this.state.senha}
                                onChange={(valor) => this.atualizar('senha', valor)}
                                secureTextEntry/>
                            <ItemFormulario
                                label='Repetir senha'
                                campo={this.state.confirmacao}
                                valido={(valor) => this.validarSenhaIgual(valor)}
                                onChange={(valor) => this.atualizar('confirmacao', valor)}
                                secureTextEntry/>
                        </Form>
                    </Content>
                    {this.renderFooter()}
                </Container>
            </LoadingOverlay>
        );
    }
}
