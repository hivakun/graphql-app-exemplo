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

    async login(email, senha) {
        return await apolloClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: { email, senha }
        });
    }

}