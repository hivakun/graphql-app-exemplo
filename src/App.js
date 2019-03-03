/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { ActivityIndicator, StatusBar, View } from "react-native";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Provider } from 'unstated';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Root } from "native-base";
import { Login } from './pages/login';
import Logo from './pages/login/components/logo';
import { Cadastro } from './pages/cadastro';
import { Pedidos } from './pages/pedido';

const httpLink = createHttpLink({
    uri: 'http://192.168.0.105:4000'
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const rotas = createDrawerNavigator(
    {
        Login: {
            screen: Login
        },
        Cadastro: {
            screen: Cadastro
        },
        Pedido: {
            screen: Pedidos
        }
    },
    {
        contentComponent: props => <Logo {...props} />,
        initialRouteName: 'Pedido',
        drawerPosition: 'right',
    },
);

const ConteudoApp = createAppContainer(rotas);

//Desabilita warnings na aplicação
console.disableYellowBox = true;

// Salva a tela atual e recarrega após o refresh
const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;

export const App = () => (
    <Root style={{flex: 1}}>
        <ApolloProvider client={apolloClient}>
            <Provider>
                <ConteudoApp
                    persistenceKey={navigationPersistenceKey}
                    renderLoadingExperimental={() => <ActivityIndicator/>}
                />
            </Provider>
        </ApolloProvider>
    </Root>
);