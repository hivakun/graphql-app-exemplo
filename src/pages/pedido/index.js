import React from 'react';
import { Alert, Text, View } from 'react-native';
import { Container } from 'native-base';
import { ViewPager } from 'rn-viewpager';
import { stepStyle, styles } from './styles';

import StepIndicator from 'react-native-step-indicator';
import { HeaderBack } from '../../components/header/header-back/header-back';
import LoadingOverlay from '../../components/loading/loading';

const STEPS = ['Pratos', 'Bebidas'];
const PAGES = ['Page 1', 'Page 2'];

export class Pedidos extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            paginaAtual: 0,
            carregando: false,
        };
    }

    atualizarPagina() {
        if (this.viewPager) {
            this.viewPager.setPage(this.state.paginaAtual);
        }
    }

    render() {
        return (
            <LoadingOverlay loading={this.state.carregando}>
                <Container>
                    <HeaderBack titulo={'Pedido'} navigation={this.props.navigation}/>
                    <View style={styles.container}>
                        <View style={styles.stepIndicator}>
                            <StepIndicator stepCount={2} customStyles={stepStyle}
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
        return (<View style={styles.page}>
            <Text>{data}</Text>
        </View>)
    }

}