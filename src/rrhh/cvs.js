/*
     //* cvs.js
     //* Marzo 2019
     //* By Juan Carlos Jocop
 */
import { mapMutations } from 'vuex';

/* //? Importación de los modulos en los tabs */
import cvsingreso   from './cvs_ingreso.vue'
import cvsgraficas  from './cvs_graficas.vue'
import cvsconsultas from './cvs_consultas.vue'

/* //? Necesario para el ingreso de  fechas */
import moment from 'moment'
import ingreso from './../components/ingreso.vue'

import { store } from './../store/store.js'

export default {
     components: {

          cvsingreso,
          cvsgraficas,
          cvsconsultas,

          'moment': moment,
          'input-date': ingreso,          
     }, //* components
     data() {
          return {
               diasaviso: 0, diasrevision: 0,
          }
     },
     mounted() {

          /* //? Definiciones para el uso de  Select, desplazamienots, tooltips y tabs */
          var elems = document.querySelectorAll('select');
          var instances = M.FormSelect.init(elems, {});

          var elems = document.querySelectorAll('.collapsible');
          var instances = M.Collapsible.init(elems, {});

          var elems = document.querySelectorAll('.tooltipped');
          var instances = M.Tooltip.init(elems, {});

          var elem = document.querySelectorAll('.tabs');
          var instances = M.Tabs.init(elem, {});

          this.cargarInformacion();
     }, //* mounted()
     methods: {
          ...mapMutations(['cargandoCVs','cargandoProfesiones', 'cargandoPuestos', 'cargandoECiviles',
                           'addbitacora']),
          /*//? ================================================================================================================================== */      
          addbitacora(viene) {

               if (viene === 2){
                    this.cargandoValores();
                    this.actualizaEstados();
               }

               let opcion="";
               if (viene === 2) { opcion= "Ingreso"}
               if (viene === 1) { opcion = "Consultas" }
               if (viene === 3) { opcion = "Gráficas" }
               let laaccion= "Seleccionó la opción de " + opcion;

               moment.locale('es');
               let now = moment().format('L');
               let now2 = moment().format('LTS');

               this.$store.commit('addbitacora',
                                   {fecha: now, accion: laaccion, hora: now2});
          },
          /*//? ================================================================================================================================== */
               cargarInformacion() {

                    this.$store.commit('cargandoProfesiones');
                    this.$store.commit('cargandoPuestos');
                    this.$store.commit('cargandoECiviles');

                    this.$store.commit('cargandoCVs');
               },

          /*//? ======================================================================================== */
          cargandoValores() {

               var dummy = store.state.st_dbValoresC.on('value', snapshot =>
                    this.getValores(snapshot.val()));
          },
          getValores(losValores) {

               // this.diasControl = [];
               this.diasaviso = parseInt(losValores.diasaviso);
               this.diasrevision = parseInt(losValores.diasrevision);

               // moment.locale('es');

               // this.fingresoT = moment(this.fingreso).format("DD/MM/YYYY");
               // this.frevisionT = moment(this.fingreso).add(this.diasrevision, 'days').calendar();

               // var diasDif = this.diasrevision - this.diasaviso;
               // var temporal = new Date(this.fingreso.setDate(this.fingreso.getDate() + diasDif));
               // this.favisoT = moment(temporal).format("DD/MM/YYYY");
          },
          /*//? ================================================================================================================================== */
          obtenerDias(hoy, laFecha) {

               var fRev_oAviso = laFecha;                         //* Se obtiene la fecha de Revisión o de Aviso
               var dia = fRev_oAviso.substring(0, 2);     //* Se obtiene el día, mes y año de dicha fecha
               var mes = fRev_oAviso.substring(3, 5);
               var anio = fRev_oAviso.substring(6, 10);
               var nfRev_oAviso = anio + "-" + mes + "-" + dia;    //* Genera nueva fecha con formato aaaa-mm-dd

               var tempo1 = moment(nfRev_oAviso);            //* Momente reconoce la fecha y genera una valida.
               var tempo2 = new Date(tempo1);                //* La fecha válida es convertida en formato Date()
               var tempo3 = moment(tempo2);                  //* Esta nueva fecha ya puede ser operable por moment

               var diaspasadosRev_oAviso = hoy.diff(tempo3, "days");        //* Obtiene los días padados desde la fecha de Revisión o Aviso, al día de hoy.

               return diaspasadosRev_oAviso;
          },
          actualizaEstados() {

               /*//? Si eligió consultas */
               moment.locale('es');
               var hoy = moment();

               var tCVs = store.state.st_CVs;
               for (let key in tCVs) {

                    /** Obtiene el estatus (y sus colores) y los días vencidos del CV concurrente */
                    var laLLave = tCVs[key].llave;
                    var elEstatus = tCVs[key].estatus;
                    var elColorF = tCVs[key].estatusfcolor;
                    var elColorB = tCVs[key].estatusbcolor;
                    var losdiasV = tCVs[key].diasvencidos

                    /*//? Obtiene la llave firebase donde está grabado el CV concurrente 
                      //?    y establece el direccionamiento a dicho CV (dbCVs) */
                    var lnuevaRuta = store.state.st_rutaCVs + laLLave;
                    var dbCVs = store.state.st_db.ref(lnuevaRuta);

                    /*//? Obtiene los días pasados desde la fecha de vencimiento */
                    var diasPasadosRev = this.obtenerDias(hoy, tCVs[key].frevision);

                    /*//? Obtiene los días pasados desde la fecha de aviso */
                    var diaspasadosAv = this.obtenerDias(hoy, tCVs[key].faviso);
                    /*//? Si ya llegó al período de aviso y el estatus actual es "en curso" && no está aprobado el CV, entonces */
                    if ((diaspasadosAv >= 0 && diaspasadosAv <= this.diasaviso && elEstatus === "en curso") && !tCVs[key].aprobado) {

                         elEstatus = "en aviso";
                         elColorB = "yellow";
                         elColorF = "black";

                         this.actualizarRegistro(dbCVs, {
                              estatus: elEstatus,
                              estatusbcolor: elColorB,
                              estatusfcolor: elColorF,
                         })
                    }
                    /*//? Si ya se pasó de la fecha de revisión y el estatus actual es "en aviso" && no está aprobado */
                    if (diasPasadosRev > 0 && elEstatus === "en aviso" && !tCVs[key].aprobado) {

                         elEstatus = "vencido";
                         elColorB = "red";
                         elColorF = "yellow";
                         losdiasV = diasPasadosRev;

                         this.actualizarRegistro(dbCVs, {
                              diasvencidos: losdiasV,
                              estatus: elEstatus,
                              estatusbcolor: elColorB,
                              estatusfcolor: elColorF,
                         });
                    } else {
                         /*//? Si ya se pasó de la fecha de revisión y el estatus actual es "vencido" && no está aprobado */
                         if (diasPasadosRev > 0 && diasPasadosRev > losdiasV && elEstatus === "vencido" && !tCVs[key].aprobado) {

                              losdiasV = diasPasadosRev;

                              this.actualizarRegistro(dbCVs, {
                                   diasvencidos: losdiasV,
                              })
                         } //* if
                    } //* else
               } //* for
          }, //* Actualiza Estados
          actualizarRegistro(dbCVs, losCampos) {

               var elRegistro = dbCVs.update(losCampos);
          },               
     } //* methods
} //* Script