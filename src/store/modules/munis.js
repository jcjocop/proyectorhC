
import {db, rutaMunis, dbMunis} from './../myFirebaseApp'

const mutations = {

    agregarMuni: (state, muni) => {

        state.st_dbMunis.push(muni);
    },
    eliminarMuni(state, elmuni){

        var lnuevaRuta= rutaMunis + '/' + elmuni.llave;

        var dbelMuni  = db.ref(lnuevaRuta);            
        var elRegmuni  = dbelMuni.remove();
    }
};

export default {

    state: {
        st_rutaMunis:      rutaMunis,
        st_dbMunis:        dbMunis,
        munis:             [
            { codDepto: '01', codigo: '77', nombre: 'el 77'},
            { codDepto: '01', codigo: '88', nombre: 'el 88'},
            { codDepto: '01', codigo: '99', nombre: 'el 99'},
        ],

        /** Bandera o indicador para saber cuál departamento es el concurrente */
        st_currMuni: "jijiji",
    },
    mutations,
};