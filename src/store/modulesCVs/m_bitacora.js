/**
 *   //* src/store/modules/m_cvs.js
 *   //* Marzo 10, 2019
 *   //* by Juan Carlos Jocop
 */

import { store } from '../store.js';

import { db, rutaBitacora, dbBitacora } from './../myFirebaseApp'

const st_rutaBitacora = rutaBitacora;
const st_dbBitacora   = dbBitacora;
const st_db           = db;

const mutations = {

     /*//? ======================================================================================== */
     cargandoBitacora: (state) => {
          store.state.st_bitacora = [];

          var dummy = st_dbBitacora
               .on('value', snapshot => mutations.getBitacora(state, snapshot.val()));
     },
     getBitacora: (state, laBitacora) => {

          for (let key in laBitacora) {
               store.state.st_bitacora.push({

                    llave: key,                                             // 1
                    usuario: laBitacora[key].usuario, 
                    fecha: laBitacora[key].fecha,
                    hora: laBitacora[key].hora,
                    accion: laBitacora[key].accion,
                    color: "",
               });
          } //* for
     },
     addbitacora(state,payload) {

          let dbBitacora = store.state.st_dbBitacora;

          let vfecha     = payload.fecha;
          let vaccion    = payload.accion;
          let vhora      = payload.hora;
          dbBitacora.push({
               usuario: store.state.st_nusuario,
               fecha: vfecha,
               accion: vaccion,
               hora: vhora,
          });
     },     
};

/** > Exporto las mutaciones definidas anteriormente y las variables de la ruta y nodo (de Firebas) de las Profesiones.
 *  > Inicializo también la colección de objetos que contendrá la información de las profesiones */
export default {
     state: {
          st_rutaBitacora,
          st_dbBitacora,
          st_db,
     },
     mutations,
};