import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// based on iphone 5s's scale
const widthScale = SCREEN_WIDTH / 320;

/**
 * Normaliza a quantidade de pixels para o aparelho que irá executar
 * @param size tamanho em pixels a ser convertido
 * @returns {number} retorna o tamanho do pixels normalizado
 */
export function normalizePixels(size) {
    const newSize = size * widthScale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

/**
 * Obtém a quantidade de pixels em porcentagem da tela do aparelho
 * @param porcentagem porcentagem a ser convertida
 * @returns {number} quantidade de pixels correspondete
 */
export function widthPct(porcentagem) {
    const value = (porcentagem * SCREEN_WIDTH) / 100;
    return Math.round(value);
}
