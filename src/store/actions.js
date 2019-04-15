/**
 * //* actions.js
 * //* Marzo 2019
 * //* by Juan Carlos Jocop Arriola
 * //* Actúan sobre las mutaciones
 */
/*//? Necesario para hacer referencia a store.state.xxx */
import { store } from './store'

/*//? Necesario para grabar en FB */
import firebase from 'firebase'

export const actions = {
     /*//? ======================================================================================== */

     acc_subirFoto: (context,payload) => {

          /*//? */
          let laruta       = payload.laruta;
          let seleccionado = payload.seleccionado;

          /*//? Obtiene el archivo seleccionado en "file" y establece en "hijo" la nueva ruta de acceso que incluye
            //? solo el nombre del archivo seleccionado.  */
          var file = seleccionado;
          var hijo = laruta + seleccionado.name;

          /*//? Referencia a la carpeta donde estarán los CVs */
          var storageRef = store.state.st_stg.ref(hijo);

          /*//? Graba el archivo seleccionado en la carpeta correspondiente en storage */
          var uploadTaskCV = storageRef.put(file);

          /*//? Listen for state changes, errors, and completion of the upload. */
          var self = this;

          uploadTaskCV.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
               function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                         case firebase.storage.TaskState.PAUSED: // or 'paused'
                              console.log('Upload is paused');
                              break;
                         case firebase.storage.TaskState.RUNNING: // or 'running'
                              console.log('Upload is running');
                              break;
                    } //* switch
               }, //* function(snapshot)
               function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                         case 'storage/unauthorized':
                              // User doesn't have permission to access the object
                              break;
                         case 'storage/canceled':
                              // User canceled the upload
                              break;
                         case 'storage/unknown':
                              // Unknown error occurred, inspect error.serverResponse
                              break;
                    } //* switch
               }, //* function(error)
               function () {
                    /* //* Upload completed successfully, now we can get the download URL */
                    uploadTaskCV.snapshot.ref.getDownloadURL()
                         .then(function (downloadURL) {

                              store.state.objFoto.push({
                                   lafoto: downloadURL,
                              })
                         })
                         .then( function(){

                              context.commit('subirFoto', store.state.objFoto)

                              actions.acc_subirCV(context,payload)
                         })
               } //* function()
          ); //* uploadTaskCV()
     },
     acc_subirCV: (context, payload) => {

          /*//? */
          let laruta       = payload.larutaC;
          let seleccionado = payload.seleccionadoC;

          /*//? Obtiene el archivo seleccionado en "file" y establece en "hijo" la nueva ruta de acceso que incluye
            //? solo el nombre del archivo seleccionado.  */
          var file = seleccionado;
          var hijo = laruta + seleccionado.name;

          /*//? Referencia a la carpeta donde estarán los CVs */
          var storageRef = store.state.st_stg.ref(hijo);

          /*//? Graba el archivo seleccionado en la carpeta correspondiente en storage */
          var uploadTaskCV = storageRef.put(file);

          /*//? Listen for state changes, errors, and completion of the upload. */
          var self = this;

          uploadTaskCV.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
               function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                         case firebase.storage.TaskState.PAUSED: // or 'paused'
                              console.log('Upload is paused');
                              break;
                         case firebase.storage.TaskState.RUNNING: // or 'running'
                              console.log('Upload is running');
                              break;
                    } //* switch
               }, //* function(snapshot)
               function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                         case 'storage/unauthorized':
                              // User doesn't have permission to access the object
                              break;
                         case 'storage/canceled':
                              // User canceled the upload
                              break;
                         case 'storage/unknown':
                              // Unknown error occurred, inspect error.serverResponse
                              break;
                    } //* switch
               }, //* function(error)
               function () {
                    /* //* Upload completed successfully, now we can get the download URL */
                    uploadTaskCV.snapshot.ref.getDownloadURL()
                         .then(function (downloadURL) {

                              store.state.objCV.push({
                                   elcv: downloadURL,
                              })
                         })
                         .then( function(){

                              context.commit('subirCV', store.state.objCV);

                              actions.acc_grabarParticipante(context, payload)
                         })
               } //* function()
          ); //* uploadTaskCV()
     },
     acc_grabarParticipante: (context, payload) => {

          context.commit('grabarParticipante', payload)
     }
}