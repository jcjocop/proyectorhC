/**
 * cvs_gravicas.js
 *        Script de cvs_graficas.vue
 */

import 'babel-polyfill'

import Vue from 'vue'
import VueGraph from 'vue-graph'
     Vue.use(VueGraph)

import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

import GraphLine3D from 'vue-graph/src/components/line3d.js'
import NoteWidget from 'vue-graph/src/widgets/note.js'
import LegendWidget from 'vue-graph/src/widgets/legends.js'

import firebase from 'firebase'

import { store } from './../store/store.js'

export default {
     components: {
          GraphLine3D: GraphLine3D,
          NoteWidget: NoteWidget,
          LegendWidget: LegendWidget,
     },
     data() {
          return {
               /** -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /** Variables de prueba */
               vergraficas: true, exito: false, 
               sumando: 0, promediando: 0,
               stext: "", selected: null,
               porcentaje: 0,
               conteo1: null, conteo2: null, seconds: 0, minutos: 0,
               refrescando: false,
               
               grabando: false, eliminando: false,
               cargando: false,

               CVs: [], CVs2: [],

               /** -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /** Definiciones para EXPORTACION a CVS */
               json_fields: {
                    'Nombre': 'nombre',
                    'Edad': 'edad',
                    'Sexo': 'sexo',
                    'Estado Civil': 'ecivil',
                    'E-mail': 'email',
                    '# Celular': 'movil',
                    'Profesión': 'profesion',
                    'Aplica para': 'puesto',
                    'Archivo CV': 'ccv',
                    'Archivo Foto': 'cfoto',
               },
               json_meta: [
                    [{
                         'key': 'charset',
                         // 'value': 'iso-8859-1'
                         'value': 'utf-8'
                    }]
               ],

               /** -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /** Para las gráficas */
               etiquetas_linea: ["dia", "T2", "T3", "T4"],
               names_linea: ['MS', 'Apple', 'Google'],
               values_linea: [
                    [10, 5, 6, 13],
                    [14, 11, 9, 7],
                    [12, 8, 10, 12]
               ],

               /** Variables para la grafica de COMPARISION */
               labels_comp: ["80+", "75-59", "70-74", "65-69", "60-64", "55-59", "50-54", "45-49", "40-44", "35-39", "30-34", "25-29", "20-24", "15-19", "10-14", "5-9", "0-4"],
               values_comp: [
                    [6.0, 4.7, 9.6, 13.6, 19.0, 19.7, 23.2, 30.2, 34.9, 42.2, 43.9, 50.1, 53.8, 56.5, 63.3, 60.6, 54.2],
                    [5.3, 4.5, 9.7, 12.9, 18.7, 19.5, 25.8, 32.1, 37.5, 42.9, 44.7, 51.3, 57.6, 64.0, 69.4, 66.3, 58.6]
               ],
               names_comp: ["Female", "Male"],
               title_comp: "Gráfica de Población",

               /** Variables para las gráficas */
               etiquetas: ['1T', '2T', '3T', '4T'],
               names: ["M", "F"],
               values: [
                    [10, 5, 5, 5],
                    [40, 10, 10, 10],
                    [10, 20, 30, 40]
               ],
               values_pie: [10, 5, 5, 5],
               names_pie: ['Apple', 'Google', 'MS', 'Facebook'],

               values_donut: [10, 5, 5, 5],
               names_donut: ['Apple', 'Google', 'MS', 'Facebook'],

               /** -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /** Para los catalogos */
               lasprofesiones: [],
               lospuestos: [],
               loseciviles: [],
          }
     },
     /** Para usar pdfvuer descomentarizar esta linea de codigo y el watch */
     mounted() {

          // this.bdReadCVs();

          this.temporizador();
     },
     methods: {
          temporizador(){

               this.grabando= store.state.st_grabando;
               this.eliminando= store.state.st_eliminando;
               this.cargando = store.state.st_cargando;

               console.log("[ Temporizador ], grabando ? ",this.grabando, this.eliminando);
               if (this.grabando===false && 
                    this.eliminando === false && 
                    this.cargando === false){

                    this.conteo1 = new Date().getTime();
                    console.log("conteo ? ",this.conteo1);
                    var vm = this;
                    var x = setInterval(
                         function () {

                              vm.conteo2 = new Date().getTime();
                              vm.diferen = vm.conteo2 - vm.conteo1;
                              vm.seconds = Math.floor((vm.diferen % (1000 * 60)) / 1000);
                              // console.log("inicia: ", vm.conteo1, ", finaliza: ", vm.conteo2, ", dif ? ", vm.seconds);

                              if (vm.seconds % 10 === 0) {
                                   vm.refrescando = true;
                                   vm.cargarValoresGraficas();
                              } else { vm.refrescando = false; }
                              console.log(vm.seconds, " %  15 = ", vm.seconds % 15, " refrescando ? ", vm.refrescando);

                              if (vm.seconds >= 59) {

                                   vm.minutos = vm.minutos + 1;
                                   // console.log("minutos ? ", vm.minutos, vm.seconds);
                              }
                         }, 1000);                    
               }
          },
          ayudaToast() {

               let hlinea = 'Exporta la información a formato CSV para luego importarla en Excel. ' +
                              'El contenido de las gráficas cambian según la información cambia.'
               var toastHTML = hlinea;
               M.toast({ html: toastHTML, classes: 'rounded' });
          },

          /** Necesario para gráfica de DONUT */
          dataFormat: function (a, b) {
               if (b) return b + "%";
               return a;
          },

          /** Para dejar la fecha ingresada, en formato dd/mm/aaaa */
          verFechaCorta() {

               var d = this.fregistro;

               let ldia = d.getDate();
               if (ldia <= 9) {
                    ldia = '0' + ldia.toString().trim();
               } else {
                    ldia = ldia.toString().trim();
               }
               let lmes = d.getMonth() + 1;
               if (lmes <= 9) {
                    lmes = '0' + lmes.toString().trim();
               } else {
                    lmes = lmes.toString().trim();
               }
               let lanio = d.getFullYear();
               let lingreso = ldia + '/' + lmes + '/' + lanio;

               return lingreso;
          },

          ordenarAsc(p_array_json, p_key) {
               console.log("A ordenar ? ",p_array_json);
               p_array_json.sort(function (a, b) {
                    return a[p_key].toUpperCase().charCodeAt(0) - b[p_key].toUpperCase().charCodeAt(0);
                    });
          },          
          ordenarAsc2(tcvs) {

               return this.CVs2.sort((a, b) => a.ecivil.toUpperCase().charCodeAt(0) - b.ecivil.toUpperCase().charCodeAt(0))               
               // return this.CVs2.sort((a, b) => a.ecivil.toUpperCase().charCodeAt(0) - b.ecivil.toUpperCase().charCodeAt(0))               

          }, // tareasDescripcion() 

          /** .*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.* */
          graficoBarrasNormal() {
               /** Inicialización de variables locales */
               // console.log("...... this.CVs ? ", this.CVs);
               var loseciviles = [];
               var losvaloresM = [];
               var losvaloresF = [];
               var losvalores = [];
               this.vergraficas = true;

               /** Obtiene una copia de los CVs y ordena dicha copia */
               // this.CVs2 = this.CVs.slice(0);

               console.log("[cvs_graficas.js- graficoBarrasNormal], st_CVs ? ", store.state.st_CVs);
               this.CVs2 = store.state.st_CVs.slice(0);
               console.log("[cvs_graficas.js- graficoBarrasNormal], CVs2   ? ", this.CVs2);

               this.ordenarAsc2();
               console.log("Ordenado !!");
               console.log(this.CVs2);
               

               /** Define las variables temporales necesarias para obtener el conteo de la
                *  ocurrencia del sexo Masculino y Femenino por cada Estado Civil.      */
               var i = 0; var cMasc = 0; var cFeme = 0;
               var ltotal = this.CVs2.length - 1;
               var lcivil = "";

               /** Recorro la colección ya ordenada por estado civil */
               while (i <= ltotal) {

                    /** Se obtiene el estado civil concurrente y se inicializan los
                     *  contadores para Maculino y femenino            */
                    lcivil = this.CVs2[i].ecivil;
                    cMasc = 0;
                    cFeme = 0;
                    while (i <= ltotal && lcivil === this.CVs2[i].ecivil) {

                         if (this.CVs2[i].sexo === "M") {
                              cMasc = cMasc + 1;
                         } else {
                              cFeme = cFeme + 1;
                         }
                         i = i + 1;
                    };

                    /** Agrega, en distinto objeto, el estado civil concurrente con su 
                    /*  conteo para Maculino y femenino */
                    loseciviles.push(lcivil);
                    losvaloresM.push(cMasc);
                    losvaloresF.push(cFeme);
               }; // while externo

               /** Los valores obtenidos para masculino y femenino son agregados al
                *  objeto LOSVALORES */
               losvalores.push(losvaloresM);
               losvalores.push(losvaloresF);

               /** Traslada los valores obtenidos a las variables establecidas en */
               this.etiquetas = loseciviles;
               this.names = ["M", "F"];
               this.values = losvalores;
          },
          graficoPieNormalyDonut() {

               /** Define las variables necesarias para la obtención de los resultados para las profesiones y puestos de trabajo */
               var losCVs = this.CVs;
               var lasprofesiones = [];
               var lospuestos = [];
               // var losdias = [];

               /** 1) Recorre la colección de objetos de los CVs para obtener únicamente las profesiones,
                *     asignando los campos "date" y "pv" requeridos en el algoritmo que hace la agrupación. */
               for (var i in losCVs) {
                    if (losCVs.hasOwnProperty(i)) {

                         lasprofesiones.push({
                              date: losCVs[i].profesion,
                              pv: losCVs[i].valor,
                         });

                         lospuestos.push({
                              date: losCVs[i].puesto,
                              pv: losCVs[i].valor,
                         });

                         // losdias.push({
                         //      date: losCVs[i].fechac,
                         //      pv: losCVs[i].valor,
                         // })
                    }
               };

               /** 2) Asigna a una variable local (rawtData) las profesiones obtenidad y aplica la agrupación
                *     de acuerdo al algoritmo visto en internet     */
               var rawtData = lasprofesiones;
               var groupBy = function (miarray, prop) {
                    return miarray.reduce(function (groups, item) {
                         var val = item[prop];
                         groups[val] = groups[val] || { date: item.date, pv: 0 };
                         groups[val].pv += item.pv;
                         return groups;
                    }, {});
               }
               /** ===================================================================================== */
               /** Valores para la gráfica de pie normal */
               var resultData = Object.values(groupBy(rawtData, 'date'));

               /** 3) Separa la agrupación obtenida en dos objetos: 
                *             names_pie[] y values_pie
                *  ya que estos son los que están referenciados en el html.   */
               this.names_pie = [];
               this.values_pie = [];
               for (var i in resultData) {
                    if (resultData.hasOwnProperty(i)) {

                         this.names_pie.push(resultData[i].date);
                         this.values_pie.push(resultData[i].pv);
                    }
               };

               /** ===================================================================================== */
               /** Valores para la gráfica de pie donut */
               var rawtData = lospuestos;
               var resultDataP = Object.values(groupBy(rawtData, 'date'));

               this.names_donut = [];
               this.values_donut = [];
               for (var i in resultDataP) {
                    if (resultDataP.hasOwnProperty(i)) {

                         this.names_donut.push(resultDataP[i].date);
                         this.values_donut.push(resultDataP[i].pv);
                    }
               };
               // console.log("names_donut ? ", this.names_donut);
               // console.log("values_donut ? ", this.values_donut);

               /** ===================================================================================== */
               /** Valores para la gráfica de línea */
               // var rawtData = losdias;
               // var resultDataL = Object.values(groupBy(rawtData, 'date'));

               // this.names_linea = [];
               // this.values_linea = [];
               // for (var i in resultDataL) {
               //      if (resultDataL.hasOwnProperty(i)) {

               //           this.names_linea.push(resultDataL[i].date);
               //           this.values_linea.push(resultDataL[i].pv);
               //      }
               // };
               // console.log("names_linea ? ", this.names_linea);
               // console.log("values_linea ? ", this.values_linea);
          },
          /** Funciones para actualizar los gráficos de acuerdo a los valores que se tengan en CVs */
          cargarValoresGraficas() {

               // console.log("************");
               // console.log("[cargarValoresGraficas] voy a cargar los cvs antes de las graficas !!")
               this.bdReadCVs();
               this.graficoBarrasNormal();
               this.graficoPieNormalyDonut();
          },
          /** .*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.*.* */
          /** Funciones para cargar la información del nodo */
          bdReadCVs() {

               var dummy = store.state.st_dbCVs.on('value', snapshot =>
                    this.getCV(snapshot.val())
               );
          },
          getCV(losCVs) {

               this.CVs = [];
               this.limite = 0;

               /* Tipología = Myers */
               for (let key in losCVs) {
                    this.CVs.push({

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
                         valor: 1,
                    })
               } // for
          },
     } // methods
} //