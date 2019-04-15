
import {db, rutaTipoS, dbTipoS} from './../myFirebaseApp'

const mutations = {

    agregarTipoS: (state, tipoS) => {

        state.st_dbTipoS.push(tipoS);
    }, // agregarTipoS
    eliminarTipoS(state, eltipoS){

        var lnuevaRuta= state.st_rutaTipoS + '/' + eltipoS.llave;

        var dbelTipoS  = db.ref(lnuevaRuta);            
        var elRegTipoS = dbelTipoS.remove();
    }, // eliminarTipoS()
    actualizarCTS(state, eltipoS){

        state.st_TipoSCurr.cantss = eltipoS.cantss;

        var lnuevaRuta= rutaTipoS + '/' + state.st_TipoSCurr.llave;

        var dbelTipoS  = db.ref(lnuevaRuta);            
        var elRegTipoS = dbelTipoS.update(eltipoS);
    }, // actualizarCSS()
};

export default {

    state: {
        st_rutaTipoS:      rutaTipoS,
        st_dbTipoS:        dbTipoS,
        tipoS:             [
            { codigo: '77', nombre: 'el 77', cantss: 0,},
            { codigo: '88', nombre: 'el 88', cantss: 1,},
            { codigo: '99', nombre: 'el 99', cantss: 2,},
        ],

        /** Bandera o indicador para saber cuál departamento es el concurrente */
        // st_currDepto: "", st_currDeptoN: "", st_currDeptoK: "", st_currDeptoCM: 0,
        st_TipoSCurr: { codigo: "", nombre: "", llave: "", siglas: "", cantss: 0},
    },
    mutations,
};