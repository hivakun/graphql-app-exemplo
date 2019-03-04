import Dimensions from 'Dimensions';
import { StyleSheet } from "react-native";
import { CORES } from '../../assets/cores';
import { normalizePixels } from '../../util/responsivo';

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    fab: {
        backgroundColor: CORES.VERDE_PRIMARIO
    },
    header: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: CORES.SELECAO
    },
    icone: {
        fontSize: 18
    },
    cardItem: {
        height: 40
    },
    cardBotao: {
        height: normalizePixels(40),
        justifyContent: "center",
        alignItems: "center"
    },
    botaoCancelar: {height: normalizePixels(20)},
    textoLabel: {
        color: CORES.CINZA_PRIMARIO,
    },
    textInfo: {
        color: CORES.CINZA_PRIMARIO
    },
    textAlerta: {
        textAlign: 'center',
        color: CORES.CINZA_PRIMARIO
    },
    footer: {
        height: normalizePixels(60),
        elevation: 0,
        shadowColor: 'transparent',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 0,
    },
    botaoAgendar: {
        height: normalizePixels(42),
        justifyContent: 'center',
        width: (DEVICE_WIDTH - normalizePixels(40))/2
    },
    botaoContato: {
        height: normalizePixels(42),
        justifyContent: 'center',
        width: (DEVICE_WIDTH - normalizePixels(40))/2
    },
    textoBotao: {
        color: 'white',
        fontSize: normalizePixels(16)
    },
    iconeBotao: {
        color: 'white',
        marginRight: 10
    },
    buttonSair: {
        alignItems: 'center',
        justifyContent: 'center',
        width: DEVICE_WIDTH - normalizePixels(35)
    }
});

export default styles;