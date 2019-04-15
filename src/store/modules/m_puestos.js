/**
 *   src/store/modules/m_puestos.js
 *   Marzo 10, 2019
 *   by Juan Carlos Jocop
 */

import { store } from '../store.js';

import { db, rutaPuestos, dbPuestos } from './../myFirebaseApp'

const st_rutaPuestos = rutaPuestos;
const st_dbPuestos = dbPuestos;
const st_db = db;

const mutations = {

     /** ======================================================================================== */
     cargandoPuestos: (state) => {
          store.state.st_puestos = [];

          var dummy = st_dbPuestos
               .on('value', snapshot => mutations.getPuestos(state, snapshot.val()));
     },
     getPuestos: (state, losPuestos) => {

          for (let key in losPuestos) {
               store.state.st_puestos.push({

                    llave: key,
                    id: losPuestos[key].id,
                    descripcion: losPuestos[key].descripcion,
               });
          } // for
     },

     /** ======================================================================================== */
     borrarPuesto: (state, payload) => {

          var localDescripcion = payload[0].laDescripcion;
          var localLlave       = payload[0].laLlave;

          var confirma = confirm("Seguro de eliminar el Puesto ? " + localDescripcion + "(" + localLlave + ")");
          if (confirma === true) {

               var lanuevaRuta = st_rutaPuestos + '/' + localLlave;
               var dbelPuesto  = st_db.ref(lanuevaRuta);

               var elRegPuesto = dbelPuesto.remove();
          }

          mutations.cargandoPuestos();
     }, // borrarProfesion()

     agregarPuesto: (state, payload) => {

          var localID          = payload[0].laID;
          var localDescripcion = payload[0].laDescripcion;

          if (localID.trim().length === 0 || localDescripcion.trim().length === 0) {

               alert("Debe ingresar una ID y descripción !");
          } else {
               var confirma = confirm("Seguro de agregar el Puesto " + localDescripcion + " ?" + localID);
               if (confirma === true) {

                    st_dbPuestos.push({
                         descripcion: localDescripcion,
                         id: localID,
                    }).then((data) => {

                         mutations.cargandoPuestos();
                    });
               } // if confirma()
          } // if localID ...
     } // agregarProfesion()
};

/** > Exporto las mutaciones definidas anteriormente y las variables de la ruta y nodo (de Firebas) de las Profesiones.
 *  > Inicializo también la colección de objetos que contendrá la información de las profesiones */
export default {
     state: {
          st_rutaPuestos,
          st_dbPuestos,
          st_db,
     },
     mutations,
};