/**
 *   cvs_catprofesiones.js
 *   Marzo 7, 2019
 *   by Juan Carlos Jocop
 */
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import moment from 'moment'

import pagineo from './culturaGPagineo.vue'

import { store } from './../store/store'
import { mapState, mapMutations } from 'vuex'

export default {
     name: 'profesiones',
     data() {
          return {
               lProfesiones:  [],                      // lista
               lmensaje:      "Profesiones",           // mensaje
               lfuente:       "CPr",                   // fuente

               correlativo: 0, 
               lcodigo: "", ldescripcion: "", id: "",       // relativo a cada objeto del catálogo 
               lcantRegistros: 0, lbuscar: "",        // conteo del contenido del catalogo y para la búsqueda
          }
     },
     mounted() {     

          var elems = document.querySelectorAll('.tooltipped');
          var instances = M.Tooltip.init(elems, {});

          var elems = document.querySelectorAll('.modal');
          var instances = M.Modal.init(elems, { dismissible: false });

          var elem = document.querySelectorAll('.tabs');
          var instances = M.Tabs.init(elem, {});  // swipeable:true

          this.cargandoCatalogo();
     },
     components: {
          moment,
          pagineo,
     },
     computed: {
          ...mapState(['profesiones']),  // ,'responsables'
          lPr_ini() { return store.state.PrlIni; },
          lPr_fin() { return store.state.Prlfin; },
          lPr_pagina() { return store.state.Prpagina; },
          filtrar: function () {

               let token = this.lbuscar;
               return this.lProfesiones.filter((cargo, index) => {
                    if (cargo.descripcion.toUpperCase().includes(token.toUpperCase())) {
                         return cargo
                    } // if()
               }) // return
          }, // filtar()
     },
     methods: {
          ...mapMutations(['agregarcargo', 'eliminarcargo']),

          posicion(valor) {
               var ldiv1 = (valor) / 2;
               var ldiv2 = Math.trunc(ldiv1);
               let resultado = "impar";
               if (ldiv1 === ldiv2) {
                    resultado = "par";
               }
               return resultado;
          },
          resaltarProfesion(currProfesion) {

               /* Refresca todos los registros con el color default: black  */
               var i = 0;
               for (i = 0; i < this.lProfesiones.length; i++) {

                    this.lProfesiones[i].color = "#FFFFFF";
                    if (this.posicion(i + 1) === "impar") {
                         this.lProfesiones[i].color = "#F2F2F2";
                    }
                    this.lProfesiones[i].tamano = "3";
               }
               /* Cambia el color del registro concurrente */
               currProfesion.color = "#0DA8E5"; // verde: 21960C; celeste: 13C3FF; verde claro: 12FF88; verde obs: 0EBF66, azul obscuro: 0932E5
               currProfesion.tamano = "3";

               this.cargos.st_cargoCurr.codigo = currProfesion.codigo;
               this.cargos.st_cargoCurr.descripcion = currProfesion.descripcion;
               this.cargos.st_cargoCurr.llave = currProfesion.llave;
               this.cargos.st_cargoCurr.cantrespons = currProfesion.cantrespons;
          },
          /* ================================================================================================================================== */
          getcargos(loscargos) {

               // console.log("[cargos.js]-getcargos(), loscargos ? ",loscargos);                
               // console.log("[cargos.js]-getcargos(), cargos antes ? ",this.lcargos,"; ",this.lProfesiones);
               this.lProfesiones = [];
               // console.log("[cargos.js]-getcargos(), cargos después ? ",this.lProfesiones);
               for (let key in loscargos) {

                    // console.log("[cargos.js]-getcargos(), key: ",key,"; codigo ? ",loscargos[key].codigo,"; descripcion ? ",loscargos[key].descripcion);
                    this.lProfesiones.push({

                         llave: key,                                             // 1
                         codigo: loscargos[key].codigo,
                         descripcion: loscargos[key].descripcion,
                         cantrespons: loscargos[key].cantrespons,
                         color: loscargos[key].color,
                         tamano: loscargos[key].tamano,
                         color: "",
                         tamano: "3",
                    })
               } // for

               this.cargos.cargos = this.lProfesiones;
               this.correlativo = this.lProfesiones.length;
          },
          cargandoCatalogo() {

               console.log("========================================================================================================")
               // console.log("[c_cargos.vue]-cargandoCatalogo, this.lcargos ? ",this.lcargos);
               console.log("[c_cargos.vue]-cargandoCatalogo, this.cargos.st_dbCargos ? ", this.cargos.st_dbCargos);
               var nodocargos = this.cargos.st_dbCargos;
               var dummy = this.cargos.st_dbCargos
                    .on('value', snapshot => this.getcargos(snapshot.val()));
          },

          /* ============================================================================================================================ */
          nuevo() {

               let proxCodigo = this.correlativo + 1;
               proxCodigo = proxCodigo.toString().trim();
               if ((this.correlativo + 1) <= 9) {
                    proxCodigo = '0' + proxCodigo;
               }
               this.lcodigo = proxCodigo;
          },
          eliminar(elcargo) {

               // console.log("[c_cargos.vue] En ELIMINAR, listo para commit en ELIMINARcargo con llave ",elcargo.llave,"; ",elcargo.descripcion,"; ",elcargo.cantrespons);
               if (elcargo.cantrespons > 0) {

                    alert("No es posible eliminar el Cargo " + elcargo.descripcion +
                         ". \nTiene relación con " + elcargo.cantrespons + " responsables");
               } else {
                    var confirma = confirm("Seguro de eliminar el Cargo de " + elcargo.descripcion + " ?");
                    if (confirma === true) {

                         this.$store.commit('eliminarcargo', elcargo);
                    }// if(confirma)
               } // if > 0
          },
          agregar() {
               // console.log("[c_cargos.vue] En AGREGAR, listo para commit en AGREGARcargo con ",this.lcodigo," y ",this.ldescripcion);

               if (this.lcodigo.trim().length > 0 && this.ldescripcion.trim().length > 0) {

                    var confirma = confirm("Seguro de grabar el Cargo " + this.ldescripcion + "? ");
                    if (confirma === true) {

                         this.$store.commit('agregarcargo', {
                              codigo: this.lcodigo,
                              descripcion: this.ldescripcion,
                              cantrespons: this.lcantRegistros,
                              color: "",
                              tamano: "3",
                         })
                         this.limpiar()

                         alert("Cargo " + this.ldescripcion + " grabado con éxito");
                    }// confirma()
               }// if (length)
               else {

                    alert("Debe ingresar un código y descripcion para grabar.");
               }
          },
          limpiar() {

               this.lcodigo = "";
               this.ldescripcion = "";
               this.lcantRegistros = 0;
          },
     } // methods
}