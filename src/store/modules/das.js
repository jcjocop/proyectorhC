import {db, rutaDAS, dbDAS} from './../myFirebaseApp'

const mutations = {

    agregar: (state, das) => {

        state.st_dbDAS.push(das);
    }, // agregar()
    eliminar(state, ladas){

        var lnuevaRuta= rutaDAS + '/' + ladas.llave;

        var dblaDAS  = db.ref(lnuevaRuta);            
        var elRegistro  = dblaDAS.remove();
    },// eliminar()
    actualizarCDMSDAS(state, ladas){

        state.st_DASCurr.cantdms = ladas.cantdms;

        var lnuevaRuta= rutaDAS + '/' + state.st_DASCurr.llave;

        var dblaDAS  = db.ref(lnuevaRuta);            
        var elRegDAS  = dblaDAS.update(ladas);
    }, // actualizarDMSDAS()    
    actualizarCSS_DAS(state, eldms){

        state.st_DASCurr.cantss = eldms.cantss;

        var lnuevaRuta= rutaDAS + '/' + state.st_DASCurr.llave;

        var dbelDAS  = db.ref(lnuevaRuta);
        var elRegDAS = dbelDAS.update(eldms);
    }, // actualizarDepto()        
};

export default {

    state: {
        st_rutaDAS:      rutaDAS,
        st_dbDAS:        dbDAS,
        
        das:             [
            { codDepto: '01', codigo: '77', nombre: 'das 77', cantdms:0,},
            { codDepto: '01', codigo: '88', nombre: 'das 88', cantdms:1,},
            { codDepto: '01', codigo: '99', nombre: 'das 99', cantdms:2,},
        ],

        /** Bandera o indicador para saber cuál departamento es el concurrente */
        st_DASCurr: { codigo: "", nombre: "", llave: "", cantdms: 0, cantss: 0},
    },
    mutations,
};