
import {db, rutaResponsables, dbResponsables} from './../myFirebaseApp'

const mutations = {

    agregarresponsable: (state, responsable) => {

        state.st_dbResponsables.push(responsable);
    },
    eliminarresponsable(state, elresponsable){

        var lnuevaRuta= rutaResponsables + '/' + elresponsable.llave;

        var dbelresponsable  = db.ref(lnuevaRuta);            
        var elRegresponsable  = dbelresponsable.remove();
    }
};

export default {

    state: {
        st_rutaResponsables:      rutaResponsables,
        st_dbResponsables:        dbResponsables,
        responsables:             [
            { codDepto: '01', codigo: '77', nombre: 'el 77'},
            { codDepto: '01', codigo: '88', nombre: 'el 88'},
            { codDepto: '01', codigo: '99', nombre: 'el 99'},
        ],

        /** Bandera o indicador para saber cuál departamento es el concurrente */
        st_currresponsable: "jijiji",
    },
    mutations,
};