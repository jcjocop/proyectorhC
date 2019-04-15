/**
 *   //* src/store/modules/m_cvs.js
 *   //* Marzo 10, 2019
 *   //* by Juan Carlos Jocop
 */

 /*//? Para las fechas */
import moment from 'moment'

import { store } from '../store.js';

import { db, rutaCVs, dbCV } from './../myFirebaseApp'

const st_rutaCVs    = rutaCVs;
const st_dbCVs      = dbCV;
const st_db         = db;

const mutations = {

     /*//? ======================================================================================== */
     cargandoCVs: (state) => {
          store.state.st_CVs = [];

          var dummy = st_dbCVs
               .on('value', snapshot => mutations.getCVs(state, snapshot.val()));
     },
     getCVs: (state, losCVs) => {

          store.state.st_CVs = [];
          
          for (let key in losCVs) {

               store.state.st_CVs.push({

                    llave: key,                                             // 1
                    nombre: losCVs[key].nombre, direccion: losCVs[key].direccion,
                    movil: losCVs[key].movil, email: losCVs[key].email,
                    sexo: losCVs[key].sexo,
                    edad: losCVs[key].edad,
                    profesion: losCVs[key].profesion,
                    puesto: losCVs[key].puesto,
                    ecivil: losCVs[key].ecivil,
                    cfoto: losCVs[key].cfoto, ccv: losCVs[key].ccv,
                    urlfoto: losCVs[key].urlfoto, urlcv: losCVs[key].urlcv,
                    fechac: losCVs[key].fechac,
                    fingreso: losCVs[key].fingreso,
                    frevision: losCVs[key].frevision,
                    faviso: losCVs[key].faviso,
                    diasvencidos: losCVs[key].diasvencidos,
                    estatus: losCVs[key].estatus,
                    estatusbcolor: losCVs[key].estatusbcolor,
                    estatusfcolor: losCVs[key].estatusfcolor,
                    aprobado: losCVs[key].aprobado,
                    aprobadono: losCVs[key].aprobadono,
                    valor: 1,
                    color: "",
               });
          } // for
     },    
}

/*//? > Exporto las mutaciones definidas anteriormente y las variables de la ruta y nodo (de Firebas) de las Profesiones.
 *  > Inicializo también la colección de objetos que contendrá la información de las profesiones */
export default {
     state: {
          st_rutaCVs,
          st_dbCVs,
          st_db,
     },
     mutations,
};