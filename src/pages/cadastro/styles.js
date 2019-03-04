import { StyleSheet } from 'react-native';
import { CORES } from '../../assets/cores';
import Dimensions from 'Dimensions';
import { normalizePixels } from '../../util/responsivo';

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    label: {
        color: CORES.CINZA_PRIMARIO,
        fontSize: 15,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: DEVICE_WIDTH - normalizePixels(35)
    },
    footer: {
        backgroundColor: 'white',
    }
});

export default styles;