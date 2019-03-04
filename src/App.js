/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { ActivityIndicator } from "react-native";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Root } from "native-base";
import { Login } from './pages/login';
import { Cadastro } from './pages/cadastro';
import { Pedidos } from './pages/pedido';
import UsuarioService from './service/usuario-service';
import { Inicio } from './pages/inicio';
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'https://graphql-node-exemplo.herokuapp.com/'
});

const getJWToken = async () => {
    const token = await UsuarioService.getToken();
    return token ? `Bearer ${token}` : null;
};

const authLink = setContext(async (req, { headers }) => {
    const token = await getJWToken();
    return {
        headers: {
            ...headers,
            authorization: token
        }
    }
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

console.log(UsuarioService.getToken());

const rotasLogin = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Cadastro: {
            screen: Cadastro
        }
    },
    {
        initialRouteName: 'Login',
    },
);

const rotasApp = createStackNavigator(
    {
        Inicio: {
            screen: Inicio
        },
        Pedido: {
            screen: Pedidos
        }
    },
    {
        initialRouteName: 'Inicio',
    },
);

const rotas = createSwitchNavigator(
    {
        App: rotasApp,
        Auth: rotasLogin
    },
    {
        initialRouteName: 'Auth'
    }
);

const ConteudoApp = createAppContainer(rotas);

//Desabilita warnings na aplicação
console.disableYellowBox = true;

// Salva a tela atual e recarrega após o refresh
const navigationPersistenceKey = null;

export const App = () => (
    <ApolloProvider client={apolloClient}>
        <Root>
            <ConteudoApp
                persistenceKey={navigationPersistenceKey}
                renderLoadingExperimental={() => <ActivityIndicator/>}
            />
        </Root>
    </ApolloProvider>
);