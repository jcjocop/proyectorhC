import {db, rutaSS, dbSS} from './../myFirebaseApp'

const mutations = {

    agregarSS: (state, ss) => {

        state.st_dbSS.push(ss);
    }, // agregarDMS()
    eliminarSS(state, elss){

        var lnuevaRuta= rutaSS + '/' + elss.llave;

        var dbelSS      = db.ref(lnuevaRuta);            
        var elRegistro  = dbelSS.remove();
    }, // eliminarDMS()
};

export default {

    state: {
        st_rutaSS:      rutaSS,
        st_dbSS:        dbSS,
        
        ss:             [
            { codDAS: '01', codigo: '77', nombre: 'ss 77'},
            { codDAS: '01', codigo: '88', nombre: 'ss 88'},
            { codDAS: '01', codigo: '99', nombre: 'ss 99'},
        ],

        /** Bandera o indicador para saber cuál departamento es el concurrente */
        st_currSS: "jajejijoju",
    },
    mutations,
};