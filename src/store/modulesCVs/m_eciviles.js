/**
 *   src/store/modules/m_eciviles.js
 *   Marzo 10, 2019
 *   by Juan Carlos Jocop
 */

import { store } from '../store.js';

import { db, rutaECiviles, dbECiviles } from './../myFirebaseApp'

const st_rutaECiviles= rutaECiviles;
const st_dbECiviles  = dbECiviles;
const st_db         = db;

const mutations = {

     /** ======================================================================================== */
     cargandoECiviles: (state) => {
          store.state.st_ECiviles = [];

          var dummy = st_dbECiviles
               .on('value', snapshot => mutations.getECiviles(state, snapshot.val()));
     },
     getECiviles: (state, losECiviles) => {

          for (let key in losECiviles) {
               store.state.st_ECiviles.push({

                    llave: key,
                    id: losECiviles[key].id,
                    descripcion: losECiviles[key].descripcion,
               });
          } // for
     },

     /** ======================================================================================== */
     borrarECiviles: (state, payload) => {

          var localDescripcion = payload[0].laDescripcion;
          var localLlave       = payload[0].laLlave;

          var confirma = confirm("Seguro de eliminar el Estado Civil ? " + localDescripcion + "(" + localLlave + ")");
          if (confirma === true) {

               var lanuevaRuta = st_rutaECiviles + '/' + localLlave;
               var dbelECivil  = st_db.ref(lanuevaRuta);

               var elRegECivil = dbelECivil.remove();
          }

          mutations.cargandoECiviles();
     }, // borrarProfesion()

     agregarECiviles: (state, payload) => {

          var localID          = payload[0].laID;
          var localDescripcion = payload[0].laDescripcion;

          if (localID.trim().length === 0 || localDescripcion.trim().length === 0) {

               alert("Debe ingresar una ID y descripción !");
          } else {
               var confirma = confirm("Seguro de agregar el Estado Civil " + localDescripcion + " ?" + localID);
               if (confirma === true) {

                    st_dbECiviles.push({
                         descripcion: localDescripcion,
                         id: localID,
                    }).then((data) => {

                         mutations.cargandoECiviles();
                    });
               } // if confirma()
          } // if localID ...
     } // agregarProfesion()
};

/** > Exporto las mutaciones definidas anteriormente y las variables de la ruta y nodo (de Firebas) de las Profesiones.
 *  > Inicializo también la colección de objetos que contendrá la información de las profesiones */
export default {
     state: {
          st_rutaECiviles,
          st_dbECiviles,
          st_db,
     },
     mutations,
};