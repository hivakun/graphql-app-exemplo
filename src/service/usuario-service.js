import {AsyncStorage} from 'react-native';
import { apolloClient } from '../App';
import gql from "graphql-tag";

const CADASTRO_MUTATION = gql`
    mutation CadastroMutation($email: String!, $senha: String!, $nome: String!, $sobrenome: String!) {
        cadastro(email: $email, senha: $senha, nome: $nome, sobrenome: $sobrenome) {
            token
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $senha: String!) {
        login(email: $email, senha: $senha) {
            token
        }
    }
`;

export default class UsuarioService {

    static testarServidor() {
        apolloClient.query({
            query: gql`
                {
                    info
                }
            `
        }).then(response => console.log(response.data.info));
    }

    async login(email, senha) {

        const dadosUsuario = await apolloClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: { email, senha }
        });

        console.log('Usuario', dadosUsuario);
        await this._salvarToken(dadosUsuario.data.login.token);
        return dadosUsuario;
    }

    async cadastrar({email, senha, nome, sobrenome}) {
        const dadosUsuario = await apolloClient.mutate({
            mutation: CADASTRO_MUTATION,
            variables: { email, senha, nome, sobrenome }
        });

        console.log('Usuario', dadosUsuario);
        await this._salvarToken(dadosUsuario.data.cadastro.token);
        return dadosUsuario;
    }

    async logoff() {
        await this._removerToken();
    }

    static async getToken() {
        return await AsyncStorage.getItem('@token');
    }

    async _salvarToken(token) {
        await AsyncStorage.setItem('@token', token);
    }

    async _removerToken() {
        await AsyncStorage.removeItem('@token');
    }
}