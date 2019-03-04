import { apolloClient } from '../App';
import gql from "graphql-tag";

export const PRATOS_QUERY = gql`
    {
        produtos(filter:"Prato") {
            id
            nome
            descricao
            imagemUrl
        }
    }
`;

export const BEBIDAS_QUERY = gql`
    {
        produtos(filter:"Bebida") {
            id
            nome
        }
    }
`;

export const PEDIDOS_QUERY = gql`
    {
        pedidos {
            prato {
                nome
            }
            bebida {
                nome
            }
            createdAt
        }
    }
`;

const PEDIR_MUTATION = gql`
    mutation PedirMutation($idPrato: ID!, $idBebida: ID!) {
        pedir(idPrato: $idPrato, idBebida: $idBebida) {
            id
            prato {
                nome
            }
            bebida {
                nome
            }
            createdAt
        }
    }
`;

export default class PedidoService {

    async pedir(prato, bebida) {

        console.log('Pedido', prato, bebida);

        return await apolloClient.mutate({
            mutation: PEDIR_MUTATION,
            variables: { idPrato: prato.id, idBebida: bebida.id }
        });
    }

}