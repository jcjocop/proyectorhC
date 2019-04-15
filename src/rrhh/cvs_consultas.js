/**
 *  //* cvs_consultas.js
 *  //* Marzo 2019
 *  //* By Juan Carlos Jocop
 *  //* Script de cvs_consultas.vue
 */

import 'babel-polyfill'

import Vue from 'vue'
import jsPDF from 'jspdf'
     Vue.use(jsPDF)

import pdf from 'vue-pdf'

/*//? Para las fechas */
import moment from 'moment'
import ingreso from './../components/ingreso.vue'

import { store } from './../store/store.js'
import { mapMutations } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilePdf, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFilePdf, faQuestion)

export default {
     components: {
          pdf: pdf,
          'moment': moment,
          'input-date': ingreso,
          fontawesomeicon: FontAwesomeIcon,
     },
     data() {
          return {

               // diasaviso: 0, diasrevision: 0,
               notifi_enCurso: true, 
               notifi_enAviso: true, 
               notifi_vencidos: true,

               /** Para búsquedas */
               busqueda: "", busquedaP: "", busquedaC: "", busquedaA: "", busquedaS: "",

               /* Por default el bloque de filas es mostrado de 5 en 5. De ahí que el primer bloque vaya de 0 a 5 */
               lini: 0, lfin: 5,
               pagina: 1,              // Contador del pagineo en la tabla
               diferencia: 1,          // diferencia = lfin - lini
               cantVista: 5,           // varibles para controlar el pagineo en la vista. (l)imite (ini)cial, (l)imite (fin)al,
               LlegoLimiteSup: false,  // Indicador si se ha llegado a la última página
               LLegoLimiteInf: true,   // Indicador si se ha llegado a la primera página
               limite: 1,              // la (diferencia) entre lfin y lini, si llegó a la última o 1a. página y cantidad de registros.

               /** Para la muestra de PDFs */
               show: true,
               src: './defaultcv.pdf',
               loadedRatio: 0,
               page: 1,
               numPages: 0,
               rotate: 0,

               /** -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /** Para el manejo de foto y cvs */
               urlfoto: "", urlcv: "",
               currFoto: "", currCV: "./cvdocente.pdf",
               currFotoT: "./defaultfoto.jpg",

               CVs: [], CVs2: [], 

               selectedFile: "",
               selectedFoto: "",

               /** -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /** Datos del participante */
               nombre: "", direccion: "", movil: "", email: "", sexo: "",
               edad: 0, profesion: "", puesto: "", ecivil: "", fregistro: new Date(),
               fingreso: new Date(), frevision: new Date(), faviso: new Date(),

               /** Temporales para el CARD  */
               currNombre: "Nombre del Participante", currProfe: "Profesión", currECivil: "Estado Civil",
               currEdad: 0, currSexo: "Sexo", currMovil: "# Movil", currAplica: "",
               currDire: "", currnfoto: "mifoto.jpg", currncv: "micv.pdf",
               currfingreso: "Ingreso el: ", currfaviso: "Aviso el: ", currfrevision: "Revision el: ",
               currdiasvencidos: "Dias vencidos: ",
               currestatus: "Estatus: ", currColorB: "", currColorF: "",

               /** -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
          }
     },
     /*//? Para usar pdfvuer descomentarizar esta linea de codigo y el watch */
     mounted() {

          this.diferencia = this.lfin - this.lini;
          this.lfin = this.cantVista;  

          // this.cargandoValores();
          // this.actualizaEstados();
     }, //* mounted()
     computed: {
          filtrarlosCVs: function () {

               /*//? Hasta aquí se puede obtener bien la cantidad de los CVs que resultan ser
                *  el "límite" del pagineo.
                */
               store.state.st_limite = store.state.st_CVs.length; 
               this.limite           = store.state.st_limite;

               return store.state.st_CVs.filter((cv, index) => {

                    /*//? Preserva el índice las tareas recién instanciadas ya que cuando se realiza una búsqueda y se quiere 
                       eliminar una tarea, el índice cambia y borra otra tarea. [ Ver función eliminar() ] en tareas.vue.  */
                    cv.codigo = index;
                    if (cv.profesion.toUpperCase().includes(this.busquedaP.toUpperCase()) &&
                         cv.nombre.toUpperCase().includes(this.busqueda.toUpperCase()) &&
                         cv.ecivil.toUpperCase().includes(this.busquedaC.toUpperCase()) &&
                         cv.puesto.toUpperCase().includes(this.busquedaA.toUpperCase()) &&
                         cv.estatus.toUpperCase().includes(this.busquedaS.toUpperCase())
                    ) {
                         return cv
                    }
               })
          }, //* filtarlosCVs()
          /*//? ================================================================================================================================== */
          CVsVencidas() {

               var conteo = 0;
               return store.state.st_CVs.filter((cv) => {

                    if (cv.estatus==="vencido") {
                         conteo = conteo + 1;
                         return conteo;
                    }
               })
          }, // CVsVencidas()
          CVsEnAviso() {

               var conteo = 0;
               return store.state.st_CVs.filter((cv) => {

                    if (cv.estatus === "en aviso") {
                         conteo = conteo + 1;
                         return conteo;
                    }
               })
          }, // CVsEnAviso()
          CVsEnCurso() {

               var conteo = 0;
               return store.state.st_CVs.filter((cv) => {

                    if (cv.estatus === "en curso") {
                         conteo = conteo + 1;
                         return conteo;
                    }
               })
          }, // CVsEnCurso()         
          /*//? ================================================================================================================================== */
     }, //* computed
     methods: {
          ...mapMutations(['cargandoCVs', 'addbitacora']),
          /*//? ================================================================================================================================== */
          /*//? Miscelaneos */
          descargartexto() {

               // var myJSON = { "name": "Chris", "age": "38" };

               var myJSON = store.state.st_CVs;
               var myString = JSON.stringify(myJSON);

               // var contenidoDeArchivo = "Hola Mundo!";

               var contenidoDeArchivo = myString;
               var elem = document.getElementById('descargar');

               elem.download = "participantes.json";
               elem.href = "data:application/octet-stream,"
                    + encodeURIComponent(contenidoDeArchivo);
          },            
          senalarRegistro(currRegistro) {

               /* Refresca todos los registros con el color default: black  */
               var i = 0;
               for (i = 0; i < store.state.st_CVs.length; i++) {

                    store.state.st_CVs[i].color = "white";
               }
               /* Cambia el color del registro concurrente (#FFDD00)*/
               currRegistro.color = "#0DA8E5"; // verde: 21960C; celeste: 13C3FF; verde claro: 12FF88; verde obs: 0EBF66, azul obscuro: 0932E5
          }, //* senalarRegistro()
          cambiarEstado(currRegistro) {

               currRegistro.aprobado = !currRegistro.aprobado;

               var lnuevaRuta = store.state.st_rutaCVs + currRegistro.llave;
               var dbCVs = store.state.st_db.ref(lnuevaRuta);

               var elRegistro = dbCVs.update({

                    aprobado: currRegistro.aprobado,
               });
          },
          ayudaToast(){

               let hlinea = '<i class="material-icons color yellow">delete_sweep</i> Borre los textos de búsquedas.'+
                            '<i class="material-icons color yellow">expand_more expand_less</i> Incremente o decremente la cantidad de filas en la lista.'+
                            '<i class="material-icons color yellow">navigate_before navigate_next</i> Cambie de página (anterior o siguiente).'+
                            '<i class="material-icons color yellow">assignment_ind picture_as_pdf</i> Vea los datos del participante (foto y Curriculum).';
               var toastHTML = hlinea;
               M.toast({ html: toastHTML, classes: 'rounded' });
          }, //* ayudaToast()
          limpiarBusquedas(){
               this.busqueda = ""; this.busquedaA = ""; this.busquedaC = ""; this.busquedaP = ""; this.busquedaS = "";
          }, //* limpiarBusquedas()
          limpiar(){
               this.src = './defaultcv.pdf';
               this.currFotoT = "./defaultfoto.jpg";
               this.currNombre = "Nombre del Participante";
               this.currProfe = "Profesión";
               this.currECivil = "Estado Civil";
               this.currEdad = 0;
               this.currSexo = "Sexo";
               this.currMovil = "# Movil";
               this.currAplica = "";
               this.currDire = "";
               this.currnfoto = "mifoto.jpg";
               this.currncv = "micv.pdf";
               this.currfingreso= "ingreso el: ";
               this.currfaviso= "Aviso el: ";
               this.currfrevision= "Revision el: ";
               this.currdiasvencidos = "Dias vencidos: ";
               this.currestatus= "Estatus: ";
               this.currColorB= "";
               this.currColorF= "";
          }, //* limpiar()
          /*//? ================================================================================================================================== */
          /*//? Pagineo */
          incremento() {

               /*//? El incremento de filas siempre será de 5 en 5 hasta 20 */
               this.cantVista += 5;
               if (this.cantVista > 20) { //* Si el conteo sobrepasa los 20, deja como cantidad maxima 20 y no permite más desplazamiento.
                    this.cantVista = 20;
                    return "";
               }

               /*//? Para cada incremento en la vista, el límite inferior siempre sera 0 y el superior la cantidad de filas a mostrar. La página empezará en 1 */
               this.lini = 0; this.lfin = this.cantVista; this.pagina = 1;

               /*//? Si la cantidad de filas a ver es mayor o igual a la cantidad de registros, entonces */
               if (this.cantVista >= store.state.st_CVs.length) {

                    this.LlegoLimiteSup = true; //* el indicador de haber llegado al límite superior se activará (true)
                    this.LLegoLimiteInf = true; //* el indicador de haber llegado al límite inferior también se activará, puesto que todos los registros son mostrados y no debe haber desplazamiento para ningún lado
                    /*//? Si la cantidad de filas a ver es exactamente igual a la cantidad de registros, entonces  */
                    if (this.cantVista === store.state.st_CVs.length) {
                         this.cantVista = store.state.st_CVs.length;
                    } //* la cantidad de filas a mostrar será la totalidad de registros
               } else {
                    this.LlegoLimiteSup = false;
               } //* el indicador de haber llegado al límite inferior se inactivará (false) puesto que puede haber "regreso"

               /*//? La diferencia siempre será el límite superior - límite inferior */
               this.diferencia = this.lfin - this.lini;
          }, //* incremento()
          decremento() {

               /*//? El decremento de filas siempre será de 5 en 5 hasta 0 */
               this.cantVista -= 5;
               if (this.cantVista < 5) { //* Si el conteo es menor que las primeros 5 filas, deja como cantidad maxima 5 y no permite más desplazamiento a la izquierda
                    this.cantVista = 5;
                    return "";
               }

               /*//? Para cada decremento en la vista, el límite inferior siempre sera 0 y el superior la cantidad de filas a mostrar. La página empezará en 1 */
               this.lini = 0;
               this.lfin = this.cantVista;
               this.pagina = 1;

               /*//? Si la cantidad de filas a ver es mayor o igual a la cantidad de registros, entonces */
               if (this.cantVista < store.state.st_CVs.length) {

                    this.LlegoLimiteSup = false; //* el indicador de haber llegado al límite superior se activará (true)
                    this.LLegoLimiteInf = false; //* el indicador de haber llegado al límite inferior también se activará, puesto que todos los registros son mostrados y no debe haber desplazamiento para ningún lado

                    /*//? La diferencia siempre será el límite superior - límite inferior */
                    this.diferencia = this.lfin - this.lini;
               } else {
                    this.LlegoLimiteSup = false;
                    this.LLegoLimiteInf = true;
               }
          }, //* decremento()   
          siguiente() {

               /* Si no ha llegado al límite superior, entonces ... */
               if (!this.LlegoLimiteSup) {

                    /*//? El indicador de llegar al limite inferior es falso, porque no está ahí. */
                    this.LLegoLimiteInf = false; 

                    /*//? Actualiza el límite inferior y superior */
                    this.lini = this.lini + this.diferencia;
                    this.lfin = this.lfin + this.diferencia;

                    /** //? Puede ocurrir que en la última vista (bloque), la totalidad de registros que se visualizan es menor a la cantidad que deben visualizarse. 
                     *  por ejemplo: la cantidad que debe visualizarse es de 10 filas, pero la totalidad de registros (filas) es 15, entonces en la
                     *  primera vista (bloque) si se verán 10 filas, pero en la segunda vista (bloque) solo se verán 5 filas, no 10 ! 
                     *  Por lo tanto, el espejo sirve para preservar el valor de la totalidad de registros (que ha quedado en límite superior). Esto ocurre en THEN
                     */
                    var lespejo = ""; var huboespejo = false;

                    /*//? Si el límite superior es mayor a la cantidad de registros, entonces   */
                    if (this.lfin > this.limite) {

                         lespejo = this.lfin;
                         huboespejo = true;       //* preserva en el espejo el valor del límite superior y activa (true) el indicador del espejo, y
                         this.lfin = this.limite; //* establece como límite superior la cantidad de registros
                    }

                    /*//? Si el límite superior (menos 1) es exactamente igual la totalidad de registros (menos 1) entonces */
                    if ((this.lfin - 1) === (this.limite - 1)) {

                         /*//? activa (true) el indicador del límite superior para que no hayan más deplazamientos a la derecha, y */
                         this.LlegoLimiteSup = true; 

                         /*//? Si hubo espejo entonces actualiza el límite superior con el valor que dejó en el espejo */
                         if (huboespejo) {
                              this.lfin = lespejo;
                         }
                    }

                    /*//? Incrementa la página visitada */
                    this.pagina = this.pagina + 1;
               } //* If
          }, //* siguiente()
          anterior() {

               /*//? Si no ha llegado al limite inferior, entonces ... */
               if (!this.LLegoLimiteInf) {

                    /*//? indicador de llegada al limite superior es falso, porque no está ahí. */
                    this.LlegoLimiteSup = false; 

                    /*//? Actualiza el límite inferior y superior */
                    this.lini = this.lini - this.diferencia;
                    this.lfin = this.lfin - this.diferencia;

                    /*//? Si el límite inferior es menor que el primer registro (0), entonces */
                    if (this.lini < 0) {
                         this.lini = 0;
                    } //* establece como límite inferior el primer registro (0)

                    /*//? Si el límite inferior es exáctamente el primer registro (0), entonces */
                    if (this.lini === 0) {
                         this.LLegoLimiteInf = true;
                    } //* el indicador del límite inferior se activa (true) para que ya no hayan más desplazamientos a la izquierda

                    /*//? Decrementa el conteo de la página */
                    this.pagina = this.pagina - 1;
               } // If 
          }, //* anterior()

          /*//? ================================================================================================================================== */
          verjspdf(elNombre,nombrePDF) {
               /** */

               this.bitacora(elNombre, "P");

               var nArchivo = "demo"
               nArchivo= nombrePDF;

               var doc = new jsPDF();

               doc.setFontSize(40);
               doc.text("Octonyan loves jsPDF", 35, 25);

               // Set the document to automatically print via JS
               // doc.save(nArchivo);
               doc.autoPrint();
               // window.open(doc.output('bloburl'), '_blank');

               window.open(nombrePDF, '_blank');
               // doc.output('dataurlnewwindow');               
          }, //* verjspdf()

          /* //? ================================================================================================================================== */
          /*//? Necesarios cuando el PDF trae password */
          password: function (updatePassword, reason) {

               updatePassword(prompt('password is "test"'));
          },
          error: function (err) {

               console.log(err);
          },

          /*//? Muestra la foto, los datos del participante y botón para ver el PDF */
          verFoto(elRegistro, elNombre, imagen, url, lista, imagenpdf, urlpdf) {

               /*//? highlight del registro */
               this.senalarRegistro(elRegistro);
               
               /*//? Obtiene los datos del participante concurrente */
               url = url.trim();
               var currFoto = '<img src="' + url + '">';
               this.currFotoT = url;
               this.currFoto = currFoto;
               this.currNombre = lista.nombre;
               this.currProfe = lista.profesion;
               this.currECivil = lista.ecivil;
               this.currEdad = lista.edad;
               this.currSexo = lista.sexo === "M" ? "Masculino" : "Femenino";
               this.currMovil = lista.movil;
               this.currAplica = lista.puesto;
               this.currDire = lista.direccion;
               this.currnfoto = lista.cfoto;
               this.currncv = lista.ccv;
               this.currfingreso = "Ingreso el: " + lista.fingreso;
               this.currfaviso = "Aviso el: " + lista.faviso;
               this.currfrevision = "Revisión el: " + lista.frevision;
               this.currdiasvencidos = "Dias vencidos: " + lista.diasvencidos;
               this.currestatus = "Estatus: " + lista.estatus;
               this.currColorB = lista.estatusbcolor;
               this.currColorF = lista.estatusfcolor;

               /*//? Variable para ver el PDF en el visor */
               urlpdf = urlpdf.trim();
               this.src = urlpdf;

               /*//? Agrega consulta del PDF en la bitacora */
               this.bitacora(elNombre, "F");
          }, //* verFoto()

          /* //? ================================================================================================================================== */
          deleteCV(elNombre, laLlave, larutaCV, seleccionadoCV, larutaFoto, seleccionadoFoto) {

               this.visibleDel=false;
               const self = this;

               var confirma = confirm("Seguro de eliminar el CV ? " + elNombre);
               if (confirma === true) {

                    store.state.st_eliminando= true;

                    /*//? Borra del nodo /usuarios al usuario deseado */
                    self.borrarCV(laLlave, larutaCV, seleccionadoCV, larutaFoto, seleccionadoFoto);      // También se borra el usuario del nodo /usuarios
               } //* if(confirma)

               store.state.st_eliminando= false;

               this.bitacora(elNombre,"D");
          }, //* deleteCV()

          /*//? Borra el registro de FB-Database y los archivos del FB-Storage  */
          borrarCV(laLlave,larutaCV,seleccionadoCV,larutaFoto,seleccionadoFoto) {

               /*//? ................................................................. */
               /*//? Borra de la base de datos el registro */
               var lanuevaRuta = store.state.st_rutaCVs + '/' + laLlave;
               var dbelCV      = store.state.st_db.ref(lanuevaRuta);

               var elRegistro = dbelCV.remove();

               /*//? ................................................................. */
               /*//? Borra del storage el CV */
               var file = 'cvs/' + seleccionadoCV;

               /*//? Referencia a la carpeta donde estan los CVs */
               var storageRef = store.state.st_stg.ref(file);
               storageRef.delete()
                    .then( function(){
                         console.log("CV borrado de Storage.");
                    })
                    .catch(function(error){
                         console.log("Un error ocurrió al borrar CV. ",error);
                    });

               /*//? ................................................................. */
               /*//? Borra del storage la Foto */
               var fileF = 'fotosu/' + seleccionadoFoto;

               /*//? Referencia a la carpeta donde estan las fotos */
               var storageRef = store.state.st_stg.ref(fileF);
               storageRef.delete()
                    .then(function () {
                         console.log("Foto Borrada de Storage.");
                    })
                    .catch(function (error) {
                         console.log("Un error ocurrió al borrar foto. ", error);
                    });

               /*//? ................................................................. */
               /*//? Vuelve a cargar la lista de participantes */
               this.$store.commit('cargandoCVs');

               this.limpiar();

               alert("Participante eliminado !");
          }, //* borrarCV()    
          
          /* //? ================================================================================================================================== */
          /* //? Bitácora */
          bitacora(elnombre,viene) {

               /*//? Obtiene la fecha en español y la hora */
               moment.locale('es');
               let now = moment().format('L');
               let now2 = moment().format('LTS');

               let laaccion= "";
               if (viene === "D"){ laaccion = "Eliminó el CV de " + elnombre; }
               if (viene === "F") { laaccion = "Consultó datos de " + elnombre; }
               if (viene === "P") { laaccion = "Consultó el CV de " + elnombre; }

               this.$store.commit('addbitacora', {
                    fecha: now, accion: laaccion,
                    hora: now2
               });
          }, //* Bitacora          

     } //* methods
} //