/**
 * //* cvs_gravicas.js
 * //* Marzo 2019
 * //* By Juan Carlos Jocop
 * //* Script de cvs_graficas.vue
 */

import 'babel-polyfill'

import Vue from 'vue'
import VueGraph from 'vue-graph'
     Vue.use(VueGraph)

import JsonExcel from 'vue-json-to-excel'
     Vue.component('downloadExcel', JsonExcel)

import ElementUI from 'element-ui';
     Vue.use(ElementUI);

import GraphLine3D from 'vue-graph/src/components/line3d.js'
import NoteWidget from 'vue-graph/src/widgets/note.js'
import LegendWidget from 'vue-graph/src/widgets/legends.js'

import { store } from './../store/store.js'
import { mapMutations } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faQuestion)

import graficaBN from './cvs_graficaBN.vue'
import graficaBP from './cvs_graficaBP.vue'
import graficaPN from './cvs_graficaPN.vue'
import graficaPD from './cvs_graficaPD.vue'
import grafica3D from './cvs_grafica3D.vue'
import graficaL  from './cvs_graficaL.vue'

/** Para las fechas */
import moment from 'moment'
import ingreso from './../components/ingreso.vue'

export default {
     components: {
          GraphLine3D: GraphLine3D,
          NoteWidget: NoteWidget,
          LegendWidget: LegendWidget,

          fontawesomeicon: FontAwesomeIcon,

          graficaBN, graficaBP, graficaPN, graficaPD,
          grafica3D, graficaL,

          'moment': moment,
          'input-date': ingreso,
     },
     data() {
          return {
               /*//? -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /*//? Variables de prueba */
               vergraficas: true, exito: false, 

               /*//? Variables para el temporizador */
               conteo1: null, conteo2: null, seconds: 0, minutos: 0,
               refrescando: false,

               /*//? Variable para el-tabs */
                tabPosition: 'top',
               
               /*//? Variables que obtienen su valor del almacen para saber si se está grabando o eliminando o cargando datos en los otros tabs */
               grabando: false, eliminando: false, cargando: false,

               /*//? Variables temporales para exportar a Excel y las gráficas */
               CVs: [], CVs2: [],

               /*//? -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /*//? Definiciones para EXPORTACION a CVS */
               json_fields: {
                    'Nombre': 'String',
                    'Edad': 'number',
                    'Sexo': 'String',
                    'Estado Civil': 'String',
                    'E-mail': 'String',
                    '# Celular': 'String',
                    'Profesión': 'String',
                    'Aplica para': 'String',
                    'Archivo CV': 'String',
                    'Archivo Foto': 'String',
               },
               json_data: [ {
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
               }],
               json_meta: [
                    [{
                         'key': 'charset',
                         'value': 'utf-8'
                    }]
               ],

               /*//? -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /*//? Para las gráficas */
               etiquetas_linea: ["fecha"],
               names_linea: ['MS', 'Apple', 'Google'],
               values_linea: [
                    [10, 5, 6, 13],
                    [14, 11, 9, 7],
                    [12, 8, 10, 12]
               ],

               /*//? Variables para la grafica de COMPARISION */
               labels_comp: ["80+", "75-59", "70-74", "65-69", "60-64", "55-59", "50-54", "45-49", "40-44", "35-39", "30-34", "25-29", "20-24", "15-19", "10-14", "5-9", "0-4"],
               values_comp: [
                    [6.0, 4.7, 9.6, 13.6, 19.0, 19.7, 23.2, 30.2, 34.9, 42.2, 43.9, 50.1, 53.8, 56.5, 63.3, 60.6, 54.2],
                    [5.3, 4.5, 9.7, 12.9, 18.7, 19.5, 25.8, 32.1, 37.5, 42.9, 44.7, 51.3, 57.6, 64.0, 69.4, 66.3, 58.6]
               ],
               names_comp: ["Female", "Male"],
               title_comp: "Gráfica de Población",

               /*//? Variables para las gráficas */
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

               /*//? -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. */
               /*//? Para los catalogos */
               lasprofesiones: [],
               lospuestos: [],
               loseciviles: [],
          }
     },
     /** Para usar pdfvuer descomentarizar esta linea de codigo y el watch */
     mounted() {

          this.temporizador();

          // this.json_data = store.state.st_CVs;
     },
     methods: {
          ...mapMutations(['cargandoCVs', 'addbitacora']),

          /*//? ================================================================================================================================== */
          temporizador(){

               this.grabando= store.state.st_grabando;
               this.eliminando= store.state.st_eliminando;
               this.cargando = store.state.st_cargando;

               if (this.grabando===false && 
                    this.eliminando === false && 
                    this.cargando === false){

                    this.conteo1 = new Date().getTime();

                    var vm = this;
                    var x = setInterval(
                         function () {

                              vm.conteo2 = new Date().getTime();
                              vm.diferen = vm.conteo2 - vm.conteo1;
                              vm.seconds = Math.floor((vm.diferen % (1000 * 60)) / 1000);

                              if (vm.seconds % 10 === 0) {
                                   vm.refrescando = true;
                                   vm.cargarValoresGraficas();
                              } else { vm.refrescando = false; }
                              // console.log(vm.seconds, " %  15 = ", vm.seconds % 15, " refrescando ? ", vm.refrescando);

                              if (vm.seconds >= 59) {

                                   vm.minutos = vm.minutos + 1;
                              }
                         }, 1000);                    
               }
          },
          /*//? Necesario para los textos de ayuda */
          ayudaToast() {

               let hlinea = 'Exporta la información a formato CSV para luego importarla en Excel. ' +
                              'El contenido de las gráficas cambian según la información cambia.'
               var toastHTML = hlinea;
               M.toast({ html: toastHTML, classes: 'rounded' });
          },
          /*//? Necesario para gráfica de DONUT */
          dataFormat: function (a, b) {
               if (b) return b + "%";
               return a;
          }, //*dataFormat
          /*//? Necesario para ordenar la salida de las graficas de barras */
          ordenarAsc3() {
               return this.CVs2.sort((a, b) =>
                    a.ecivil.localeCompare(b.ecivil)
               )
          }, //* tareasDescripcion() 

          /*//? ================================================================================================================================== */
          graficoBarrasNormal() {
               /*//? Inicialización de variables locales */
               var loseciviles = [];
               var losvaloresM = [];
               var losvaloresF = [];
               var losvalores = [];
               this.vergraficas = true;

               /*//? Obtiene una copia de los CVs y ordena dicha copia */
               this.CVs2 = [];
               this.CVs2 = store.state.st_CVs.slice(0);

               /*//? Ordena los datos alfabéticamente según el estado civil */
               this.ordenarAsc3();

               /* Define las variables temporales necesarias para obtener el conteo de la */
               /*  ocurrencia del sexo Masculino y Femenino por cada Estado Civil.      */
               var i = 0; var cMasc = 0; var cFeme = 0;
               var ltotal = this.CVs2.length - 1;
               var lcivil = "";

               /*//? Recorro la colección ya ordenada por estado civil */
               while (i <= ltotal) {

                    /* Se obtiene el estado civil concurrente y se inicializan los */
                    /*  contadores para Maculino y femenino            */
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

                    /*//? Agrega, en distinto objeto, el estado civil concurrente con su 
                      //?  conteo para Maculino y femenino */
                    loseciviles.push(lcivil);
                    losvaloresM.push(cMasc);
                    losvaloresF.push(cFeme);
               }; //* while externo

               /* //? Agrega los resultados (valores) obtenidos para masculino y femenino, 
               /* //? al objeto LOSVALORES */
               losvalores.push(losvaloresM);
               losvalores.push(losvaloresF);

               /*//? Traslada los valores obtenidos a las variables establecidas en */
               this.etiquetas = loseciviles;
               this.names = ["M", "F"];
               this.values = losvalores;
          }, //* graficoBarrasNormal()

          /*//? Prepara la información para la gráfica de Pie Normal y Pie Donut */
          graficoPieNormalyDonut() {

               /*//? Define las variables necesarias para la obtención de los resultados para las profesiones y puestos de trabajo */
               this.CVs = [];
               var losCVs = store.state.st_CVs;
               var lasprofesiones = [];
               var lospuestos = [];
               var losdias = [];

               /* //? 1) Recorre la colección de objetos de los CVs para obtener las profesiones, puestos, días de ingreso
                * //? asignando los campos "date" y "pv" requeridos en el algoritmo que hace la agrupación.
                * //? Así también como los datos de cada participante sin la ruta en fb-storage. */
               for (var i in losCVs) {
                    if (losCVs.hasOwnProperty(i)) {

                         lasprofesiones.push({
                              date: losCVs[i].profesion,
                              pv: losCVs[i].valor,
                         }); //* lasprofesiones.push

                         lospuestos.push({
                              date: losCVs[i].puesto,
                              pv: losCVs[i].valor,
                         }); //* lospuestos.push

                         losdias.push({
                              date: losCVs[i].fechac,
                              pv: losCVs[i].valor,
                         }) //* losdias.push

                         this.CVs.push({
                              nombre: losCVs[i].nombre, 
                              edad: losCVs[i].edad,
                              sexo: losCVs[i].sexo,
                              ecivil: losCVs[i].ecivil,
                              email: losCVs[i].email,
                              movil: losCVs[i].movil,
                              profesion: losCVs[i].profesion,
                              puesto: losCVs[i].puesto,
                              ccv: losCVs[i].ccv,
                              cfoto: losCVs[i].cfoto,
                         }) //* this.CVs.push
                    } //* if
               }; //* for

               /* 2) Asigna a una variable local (rawtData) las profesiones obtenidad y aplica la agrupación */
               /*    de acuerdo al algoritmo visto en internet     */
               var rawtData = lasprofesiones;
               var groupBy = function (miarray, prop) {
                    return miarray.reduce(function (groups, item) {
                         var val = item[prop];
                         groups[val] = groups[val] || { date: item.date, pv: 0 };
                         groups[val].pv += item.pv;
                         return groups;
                    }, {});
               }

               /*//? Valores para la gráfica de pie normal */
               var resultData = Object.values(groupBy(rawtData, 'date'));

               /* //? 3) Separa la agrupación obtenida en dos objetos: 
                * //? names_pie[] y values_pie
                * //?  ya que estos son los que están referenciados en el html.   */
               this.names_pie = [];
               this.values_pie = [];
               for (var i in resultData) {
                    if (resultData.hasOwnProperty(i)) {

                         this.names_pie.push(resultData[i].date);
                         this.values_pie.push(resultData[i].pv);
                    }
               };

               /*//? Valores para la gráfica de pie donut */
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

               /*//? Valores para la gráfica de línea */
               var rawtData = losdias;
               var resultDataL = Object.values(groupBy(rawtData, 'date'));

               this.names_linea = [];
               this.values_linea = [];
               for (var i in resultDataL) {
                    if (resultDataL.hasOwnProperty(i)) {

                         this.names_linea.push(resultDataL[i].date);
                         this.values_linea.push(resultDataL[i].pv);
                    }
               }; //* for
          }, //* graficoPieNormalyDonut()

          /*//? Funciones para actualizar los gráficos de acuerdo a los valores que se tengan en CVs */
          cargarValoresGraficas() {

               this.$store.commit('cargandoCVs');

               this.graficoBarrasNormal();
               this.graficoPieNormalyDonut();
          },
          /*//? Controla el clickeo en el-buton del el-button-group */
          graficas(lugar){
               this.tabPosition= lugar;

               this.bitacora(lugar);
          },
          /*//? Maneja el clickeo en el-tabs. Existen 4 tab-pane */
          handleClick(tab, event) {

               this.bitacora(tab.name)
          },

          /* //? ================================================================================================================================== */
          /* //? Bitácora */
          bitacora(viene) {

               /*//? Obtiene la fecha en español y hora */
               moment.locale('es');
               let now = moment().format('L');
               let now2 = moment().format('LTS');

               let laaccion = "";
               if (viene === "left") { laaccion = "Tab de Gráficas de Estado Civil " }
               if (viene === "right") { laaccion = "Tab de Gráficas de Profesiones" }
               if (viene === "top") { laaccion = "Tab de Gráficas de Puestos al que aplican" }
               if (viene === "bottom") { laaccion = "Tab de Gráficas para fechas de aplicación" }

               if (viene === "BN") { laaccion = "Panel de la gráfica de Barras normal para [ Estado Civil agrupado por Sexo ]" }
               if (viene === "BP") { laaccion = "Panel de la gráfica de Barras apiladas para [ Estado Civil apilado por Sexo ]" }
               if (viene === "3D") { laaccion = "Panel de la gráfica 3D para [ Estados Civiles agrupados por Sexo ]" }
               if (viene === "PN") { laaccion = "Panel de la gráfica Pie para [ Profesiones ]" }
               if (viene === "PD") { laaccion = "Panel de la gráfica Donut para [ Puesto al que aplica ]" }
               if (viene === "L") { laaccion = "Panel de la gráfica de líneas para [ Fechas de aplicación ]" }

               this.$store.commit('addbitacora', {
                    fecha: now, accion: laaccion,
                    hora: now2
               });
          }, //* Bitacora          

     } // methods
} //