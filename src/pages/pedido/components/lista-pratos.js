import React from 'react';
import { StyleSheet } from "react-native";

export class ListaPratos extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            carregando: false,
            pratoSelecionado: {id: 0},
        };
    }
}

const styles = StyleSheet.create({
    content: (possuiDados) => {
        return {
            justifyContent: (!possuiDados) ? 'center' : undefined,
            flex: (!possuiDados) ? 1 : undefined
        }
    },
    textProfissional: {
        color: CORES.CINZA_SECUNDARIO,
        fontSize: normalizePixels(18)
    },
    textAlerta: {
        textAlign: 'center',
        ...StylesUtil.fontFamily.joey.regular,
    }
});