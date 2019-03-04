const moment = require('moment');
require('moment/locale/pt-br');

export function exibirDataPadrao(datahora) {

    let data;

    if (datahora instanceof Date) {
        data = moment(datahora);
    } else {
        data = moment(datahora, 'YYYY-MM-DDTHH:mm:ssZ');

        if (!data.isValid()) {
            data = moment(datahora, 'YYYY-MM-DD HH:mm:ssZ')
        }
    }

    return data.format('DD/MM/YYYY HH:mm');
}