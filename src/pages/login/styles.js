import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import { CORES } from '../../assets/cores';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CORES.VERDE_SECUNDARIO
    },
    form: {
        flex: 1,
    },
    formExtra: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        borderColor: CORES.VERDE_SECUNDARIO,
        marginBottom: 10,
        height: 45,
        color: CORES.CINZA_SECUNDARIO,
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CORES.VERDE_PRIMARIO,
        width: DEVICE_WIDTH - 40,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
    buttonExtra: {
        color: 'white',
        textAlign: 'center'
    }
});

export default styles;