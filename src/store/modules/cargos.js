
import {db, rutaCargos, dbCargos} from './../myFirebaseApp'

const mutations = {

    agregarcargo: (state, cargo) => {

        state.st_dbCargos.push(cargo);
    }, // agregarcargo
    eliminarcargo(state, elcargo){

        var lnuevaRuta= state.st_rutaCargos + '/' + elcargo.llave;

        var dbelcargo  = db.ref(lnuevaRuta);            
        var elRegcargo  = dbelcargo.remove();
    }, // eliminarcargo()
    actualizarCRespons(state, elcargo){

        state.st_cargoCurr.cantrespons = elcargo.cantrespons;

        var lnuevaRuta= rutaCargos + '/' + state.st_cargoCurr.llave;

        var dbelcargo  = db.ref(lnuevaRuta);            
        var elRegcargo  = dbelcargo.update(elcargo);
    }, // actualizarcargo()
};

export default {

    state: {
        st_rutaCargos:      rutaCargos,
        st_dbCargos:        dbCargos,
        cargos:             [
            { codigo: '77', nombre: 'el 77'},
            { codigo: '88', nombre: 'el 88'},
            { codigo: '99', nombre: 'el 99'},
        ],

        /** Bandera o indicador para saber cuál departamento es el concurrente */
        // st_currcargo: "", st_currcargoN: "", st_currcargoK: "", st_currcargoCM: 0,
        st_cargoCurr: { codigo: "", nombre: "", llave: "", cantrespons: 0},
        st_juanK: "juankita",
    },
    mutations,
};