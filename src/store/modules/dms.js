import {db, rutaDMS, dbDMS} from './../myFirebaseApp'

const mutations = {

    agregarDMS: (state, dms) => {

        state.st_dbDMS.push(dms);
    }, // agregarDMS()
    eliminarDMS(state, eldms){

        var lnuevaRuta= rutaDMS + '/' + eldms.llave;

        var dbelDMS  = db.ref(lnuevaRuta);            
        var elRegistro  = dbelDMS.remove();
    }, // eliminarDMS()
    actualizarCSS_DMS(state, eldms){

        state.st_DMSCurr.cantss = eldms.cantss;

        var lnuevaRuta= rutaDMS + '/' + state.st_DMSCurr.llave;

        var dbelDMS  = db.ref(lnuevaRuta);
        var elRegDMS = dbelDMS.update(eldms);
    }, // actualizarDepto()    
    filtrarDistritos: function(state,payload) {

        let token= payload.a;
        return payload.b.filter( (dms, index) => {                    
            if (dms.nombre.toUpperCase().includes(token.toUpperCase()) && payload.c===dms.codDAS ) {
                return dms
            } // if()
        }) // return
    }, // filtrarDistritos()
};

export default {

    state: {
        st_rutaDMS:      rutaDMS,
        st_dbDMS:        dbDMS,
        
        dms:             [
            { codDAS: '01', codigo: '77', nombre: 'dms 77'},
            { codDAS: '01', codigo: '88', nombre: 'dms 88'},
            { codDAS: '01', codigo: '99', nombre: 'dms 99'},
        ],

        /** Bandera o indicador para saber cuál departamento es el concurrente */
        st_DMSCurr: { codDAS: "", codigo: "", nombre: "", llave: "", cantss: 0, },        
    },
    mutations,
};