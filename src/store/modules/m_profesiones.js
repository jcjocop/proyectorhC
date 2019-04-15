/**
 *   src/store/modules/m_profesiones.js
 *   Marzo 10, 2019
 *   by Juan Carlos Jocop
 */

import { store } from '../store.js';

import { db, rutaProfesiones, dbProfesiones } from './../myFirebaseApp'

const st_rutaProfesiones = rutaProfesiones;
const st_dbProfesiones   = dbProfesiones;
const st_db              = db;

const mutations = {

     /** ======================================================================================== */
     cargandoProfesiones: (state) => {
          store.state.st_profesiones = [];

          var dummy = st_dbProfesiones
               .on('value', snapshot => mutations.getProfesiones(state, snapshot.val()));
     },
     getProfesiones: (state, lasProfesiones) => {

          for (let key in lasProfesiones) {
               store.state.st_profesiones.push({

                    llave: key,
                    id: lasProfesiones[key].id,
                    descripcion: lasProfesiones[key].descripcion,
               });
          } // for
     },

     /** ======================================================================================== */
     borrarProfesion: (state, payload) => {

          var localDescripcion= payload[0].laDescripcion;
          var localLlave=       payload[0].laLlave;

          var confirma = confirm("Seguro de eliminar la Profesion ? " + localDescripcion + "(" + localLlave + ")");
          if (confirma === true) {

               var lanuevaRuta = st_rutaProfesiones + '/' + localLlave;
               var dblaProfesion = st_db.ref(lanuevaRuta);

               var elRegProfesion = dblaProfesion.remove();
          }

          mutations.cargandoProfesiones();
     }, // borrarProfesion()

     agregarProfesion: (state,payload) => {

          var localID         = payload[0].laID;
          var localDescripcion= payload[0].laDescripcion;

          if (localID.trim().length === 0 || localDescripcion.trim().length===0) {

               alert("Debe ingresar una ID y descripción !");
          } else {
               var confirma = confirm("Seguro de agregar la profesion " + localDescripcion + " ?");
               if (confirma === true) {

                    st_dbProfesiones.push({
                         descripcion: localDescripcion,
                         id: localID,
                    }).then((data) => {

                         mutations.cargandoProfesiones();
                    });
               } // if confirma()
          } // if localID ...
     } // agregarProfesion()
};

/** > Exporto las mutaciones definidas anteriormente y las variables de la ruta y nodo (de Firebas) de las Profesiones.
 *  > Inicializo también la colección de objetos que contendrá la información de las profesiones */
export default {
     state: {
          st_rutaProfesiones,
          st_dbProfesiones,
          st_db,
     },
     mutations,
};