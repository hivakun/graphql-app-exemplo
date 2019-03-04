import React from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, Container, Content } from 'native-base';
import { ViewPager } from 'rn-viewpager';
import { stepStyle, styles } from './styles';

import StepIndicator from 'react-native-step-indicator';
import { HeaderBack } from '../../components/header/header-back/header-back';
import LoadingOverlay from '../../components/loading/loading';
import { ListaPratos } from './components/lista-pratos';
import { ListaBebidas } from './components/lista-bebidas';
import { ResumoPedido } from './components/resumo-pedido';
import { CORES } from '../../assets/cores';
import { normalizePixels } from '../../util/responsivo';
import PedidoService from '../../service/pedido-service';

const STEPS = ['Pratos', 'Bebidas', 'Resumo'];
const PAGES = ['Page 1', 'Page 2', 'Page 3'];

export class Pedidos extends React.Component {

    static navigationOptions = {
        title: 'Novo pedido',
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
            paginaAtual: 0,
            carregando: false,
            pratoSelecionado: null,
            bebidaSelecionada: null,
            resumo: null
        };

        this.service = new PedidoService();
    }

    atualizarPagina() {
        if (this.viewPager) {
            this.viewPager.setPage(this.state.paginaAtual);
        }
    }

    selecionarPrato(prato) {
        const pagina = (prato && prato.id) ? 1 : 0;

        this.setState({
            paginaAtual: pagina,
            pratoSelecionado: prato
        }, () => this.atualizarPagina());
    }

    selecionarBebida(bebida) {
        const pagina = (bebida && bebida.id) ? 2 : 1;

        this.setState({
            paginaAtual: pagina,
            bebidaSelecionada: bebida
        }, () => {
            this.obterResumo();
            this.atualizarPagina();
        });
    }

    obterResumo() {

        const {pratoSelecionado, bebidaSelecionada} = this.state;

        this.setState({
            resumo: {
                prato: (pratoSelecionado && pratoSelecionado.nome) ? pratoSelecionado.nome : '-',
                bebida: (bebidaSelecionada && bebidaSelecionada.nome) ? bebidaSelecionada.nome : '-',
            }
        });
    }

    realizarPedido() {

        const {pratoSelecionado, bebidaSelecionada} = this.state;

        if (pratoSelecionado && pratoSelecionado.id && bebidaSelecionada && bebidaSelecionada.id) {
            this.service.pedir(pratoSelecionado, bebidaSelecionada).then((resposta) => {
               console.log('Pedido', resposta);
                Alert.alert('Tudo ok!', 'Pedido realizado com sucesso.');
                this.props.navigation.goBack();
            }).catch(error => {
                console.log('Erro', error);
                Alert.alert('Ops!', 'Algo deu errado');
            });
        }
    }

    render() {
        return (
            <LoadingOverlay loading={this.state.carregando}>
                <Container>
                    <View style={styles.container}>
                        <View style={styles.stepIndicator}>
                            <StepIndicator stepCount={3} customStyles={stepStyle}
                                           currentPosition={this.state.paginaAtual}
                                           labels={STEPS}/>
                        </View>
                        <ViewPager
                            style={{flexGrow: 1}}
                            ref={(viewPager) => {
                                this.viewPager = viewPager
                            }}
                            onPageSelected={(page) => {
                                this.setState({paginaAtual: page.position})
                            }}
                        >
                            {PAGES.map((page) => this.renderViewPagerPage(page))}
                        </ViewPager>
                    </View>
                </Container>
            </LoadingOverlay>
        );
    }

    renderViewPagerPage = (data) => {

        if (data === 'Page 1') {
            return (
                <View>
                    <ListaPratos onChange={(prato) => this.selecionarPrato(prato)}/>
                </View>
            );
        } else if (data === 'Page 2') {
            return (
                <View>
                    <ListaBebidas onChange={(bebida) => this.selecionarBebida(bebida)}/>
                </View>
            );
        } else if (data === 'Page 3') {
            return (
                <Content padder contentContainerStyle={{flex: 1, flexDirection: 'column'}}>
                    <ResumoPedido resumo={this.state.resumo}/>
                    <Button block bordered success style={styles.botaoPedir} onPress={() => this.realizarPedido()}>
                        <Text style={{color: CORES.VERDE_PRIMARIO}}>FAZER PEDIDO</Text>
                    </Button>
                </Content>
            );
        }

        return (<View style={styles.page}>
            <Text>{data}</Text>
        </View>)
    }

}