import { StyleSheet } from 'react-native';
import { CORES } from '../../assets/cores';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepIndicator: {
        marginVertical: 20,
    },
    botaoPedir: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        backgroundColor: 'white',
    }
});

export const stepStyle = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: CORES.VERDE_PRIMARIO,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: CORES.VERDE_PRIMARIO,
    stepStrokeUnFinishedColor: '#dedede',
    separatorFinishedColor: CORES.VERDE_PRIMARIO,
    separatorUnFinishedColor: '#dedede',
    stepIndicatorFinishedColor: CORES.VERDE_PRIMARIO,
    stepIndicatorUnFinishedColor: 'white',
    stepIndicatorCurrentColor: 'white',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: CORES.CINZA_SECUNDARIO,
    labelSize: 13,
    currentStepLabelColor: CORES.VERDE_PRIMARIO
};