
import {db, rutaDeptos, dbDeptos} from './../myFirebaseApp'
const mutations = {

    agregarDepto: (state, depto) => {

        state.st_dbDeptos.push(depto);
    }, // agregarDepto
    eliminarDepto(state, eldepto){

        var lnuevaRuta= state.st_rutaDeptos + '/' + eldepto.llave;

        var dbelDepto  = db.ref(lnuevaRuta);            
        var elRegDepto  = dbelDepto.remove();
    }, // eliminarDepto()
    actualizarCMDepto(state, eldepto){

        state.st_DeptoCurr.cantmunis = eldepto.cantmunis;

        var lnuevaRuta= rutaDeptos + '/' + state.st_DeptoCurr.llave;

        var dbelDepto  = db.ref(lnuevaRuta);            
        var elRegDepto  = dbelDepto.update(eldepto);
    }, // actualizarDepto()
    actualizarCDDepto(state, eldepto){

        state.st_DeptoCurr.cantdas =  eldepto.cantdas;
        var lnuevaRuta= rutaDeptos + '/' + state.st_DeptoCurr.llave;

        var dbelDepto  = db.ref(lnuevaRuta);            
        var elRegDepto  = dbelDepto.update(eldepto);
    }, // actualizarDepto()

};

export default {

    state: {
        st_rutaDeptos:      rutaDeptos,
        st_dbDeptos:        dbDeptos,
        deptos:             [
            { codigo: '77', nombre: 'el 77'},
            { codigo: '88', nombre: 'el 88'},
            { codigo: '99', nombre: 'el 99'},
        ],

        /** Bandera o indicador para saber cuál departamento es el concurrente */
        // st_currDepto: "", st_currDeptoN: "", st_currDeptoK: "", st_currDeptoCM: 0,
        st_DeptoCurr: { codigo: "", nombre: "", llave: "", cantmunis: 0, cantdas: 0},
    },
    mutations,
};