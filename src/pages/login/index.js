import React, { Component } from 'react';
import Logo from './components/logo';
import { Button, Container, Content, Form, Icon, Input, Item, Text } from 'native-base';
import styles from './styles';
import LoadingOverlay from '../../components/loading/loading';

export class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {
            carregando: false,
            email: '',
            senha: '',
        };
    }

    criarConta() {
        this.props.navigation.navigate('Cadastro');
    }

    login() {

        const {email, senha} = this.state;

        if (email && senha) {
            this.setState({carregando: true}, () => {
                this.service.login({email: email.trim(), senha: senha.trim()}, async (dadosUsuario) => {
                    this.setState({carregando: false}, () => {
                        this.props.navigation.navigate('Inicio');
                    });
                }, (error) => {
                    this.setState({carregando: false});
                });
            });
        }
    }

    render() {
        return (
            <LoadingOverlay loading={this.state.carregando}>
                <Container>
                    <Content contentContainerStyle={styles.container}>
                        <Logo/>
                        <Form style={styles.form}>
                            <Item rounded style={styles.input}>
                                <Icon name='mail'/>
                                <Input autoCapitalize='none' placeholder='Email'
                                       onChangeText={valor => this.setState({email: valor})}
                                       value={this.state.email}/>
                            </Item>
                            <Item rounded style={styles.input}>
                                <Icon name='lock'/>
                                <Input secureTextEntry placeholder='Senha'
                                       onChangeText={valor => this.setState({senha: valor})}
                                       value={this.state.senha}/>
                            </Item>
                            <Button rounded style={styles.button} onPress={() => this.login()}>
                                <Text style={styles.buttonText}>ENTRAR</Text>
                            </Button>
                        </Form>
                        <Form style={styles.formExtra}>
                            <Button transparent onPress={() => this.criarConta()}>
                                <Text style={styles.buttonExtra}>Criar uma conta</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </LoadingOverlay>
        );
    }
}
