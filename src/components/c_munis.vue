<!--*
 *      c_munis.vue
 *          Lista de Municipios
 */
======================================================================================================== -->
<template>
  <section>
    <div class="center">
      <a v-if="l_currDepto.trim().length > 0">
        <span style="font-size:18px;">Municipios de
          <span style="font-size:16px; font-weight:bold; font-style:italic">{{l_currDeptoN}}</span>
        </span>
      </a>
      <a v-else>
        <span style="font-size:18px;">Municipios del País</span>
      </a>
    </div>

    <!-- Card con la identificación del catálogo y opción para grabar -->
    <div class="row">
      <div class="col s12">
        <div class="card grey lighten-3 black-text z-depth-4">
          <div class="card-tabs">
            <ul class="tabs tabs-fixed-width">
              <li class="tab">
                <a href="#test3" class="active">Buscar Municipio</a>
              </li>
              <li class="tab">
                <a href="#test4">Agregar Municipio</a>
              </li>
            </ul>
          </div>
          <div class>
            <div id="test3">
              <div class="input-field">
                <input type="text" v-model="buscar" placeholder>
                <label class="black-text">Escriba el nombre del municipio que desea encontrar.</label>
              </div>
            </div>
            <!-- text4 -->
            <div id="test4">
              <div class="center">
                <div style="height: 18px;"></div>
                <span>Oprima este botón</span>
                <a
                  class="btn btn-small btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger"
                  data-position="top"
                  data-tooltip="Nuevo Municipio"
                  @click="nuevoM()"
                  href="#modal2"
                >
                  <i class="material-icons">edit</i>
                </a>
                <span>para gregar un Municipio</span>
                <div style="height: 18px;"></div>
              </div>
            </div>
            <!-- text5 -->
          </div>
          <!-- card-content -->
        </div>
      </div>

      <div class="col s12">
        <pagineo
          :lista="munisxDepto"
          :listaf="munisxDepto"
          :mensaje="lmensaje"
          :liminf="lm_ini"
          :limsup="lm_fin"
          :npagina="m_pagina"
          :fuente="lfuente"
        ></pagineo>
      </div>

      <!-- Tabla con la lista de los departamentos del pais -->
      <div class="col s12">
        <!-- deptos: {{deptos.deptos}} -->
        <table class="responsive-table striped hoverable z-depth-3">
          <thead style="font-size:13px">
            <tr>
              <th>Cod.</th>
              <th>Nombre</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <!-- l_currDepto===muni.codDepto &&  
                        , {{lm_ini}}, {{lm_fin}}
          -->
          <tbody>
            <tr v-if="index>=lm_ini && index <=lm_fin-1" v-for="(muni,index) in filtrarM">
              <td style="padding: 5px 5px;">{{muni.codigo}}</td>
              <td style="padding: 5px 5px;">{{muni.nombre}}</td>
              <td style="padding: 5px 5px;">
                <a
                  class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped"
                  data-position="top"
                  data-tooltip="Eliminar Municipio"
                  @click="eliminar(muni)"
                >
                  <i class="material-icons">delete</i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Tabla con la lista de los departamentos del pais -->
        <!-- modal -->
        <div id="modal2" class="modal">
          <div class="modal-content">
            <!-- currDepto: {{lcodDepto}} proxcod: {{lcodigoM}}  -->
            <span class="center">
              Para ingresar Nuevo Municipio al Departamento: {{l_currDeptoN}}, complete los datos con asterisco
              <span style="font-weight: bold; color: #9d0006">rojo</span>.
            </span>
            <br>
            <form @submit.prevent>
              <div class="row">
                <div class="col s2">
                  <span>Depto</span>
                  <input type="text" v-model="lcodDepto" max="2" disabled>
                </div>
                <div class="col s2">
                  <span>Código</span>
                  <input type="text" v-model="lcodigoM" max="2" disabled>
                </div>
                <div class="col s8">
                  <span>
                    <span style="font-size:17px; font-weight: bold; color: #9d0006">*</span>Nombre
                  </span>
                  <input type="text" v-model="lnombre">
                </div>
                <div class="col s12 center">
                  <p></p>
                  <button
                    class="modal-close waves-effect waves-light btn-floating darken-5 z-depth-3 green btn tooltipped"
                    data-position="top"
                    data-tooltip="Grabar"
                    @click="agregar"
                  >
                    <i class="material-icons">check</i>
                  </button>
                  <button
                    class="modal-close waves-effect waves-light btn-floating darken-5 z-depth-3 red btn tooltipped"
                    data-position="right"
                    data-tooltip="Cancelar"
                  >
                    <i class="material-icons">close</i>
                  </button>
                </div>
              </div>
              <!-- row -->
            </form>
            <!-- form -->
          </div>
          <!-- modal-content -->
          <!-- <a class="modal-close btn btn-floating tooltipped red" data-tooltip="Salir" data-position="top"><app-icon img="close"></app-icon></a> -->
        </div>
        <!-- modal1 -->
      </div>
      <!-- col s12 -->
    </div>
    <!-- row -->
  </section>
</template>

<script>
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import moment from "moment";

import pagineo from "./culturaGPagineo.vue";

import { store } from "./../store/store";
import { mapState, mapMutations } from "vuex";

export default {
  name: "munis",
  data() {
    return {
      xmunis: [],
      correlativo: 0,
      lfuente: "M",
      lcodDepto: "",
      lcodigoM: "",
      lnombre: "",
      buscar: "",
      lini: 0,
      lfin: 5,
      lmensaje: "Municipios"
    };
  },
  mounted() {
    /** Definiciones para el uso de los slides y tooltips */
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, {});

    var elems = document.querySelectorAll(".tooltipped");
    var instances = M.Tooltip.init(elems, {});

    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, { dismissible: false });

    var elem = document.querySelectorAll(".tabs");
    var instances = M.Tabs.init(elem, {});

    this.cargandoMunis();
  },
  components: {
    moment,
    pagineo
  },
  computed: {
    ...mapState(["deptos", "munis"]),
    lm_ini() {
      return store.state.Mlini;
    },
    lm_fin() {
      return store.state.Mlfin;
    },
    m_pagina() {
      return store.state.Mpagina;
    },
    munisxDepto() {
      return this.xmunis.filter(muni => {
        if (
          muni.codDepto.toUpperCase().includes(this.l_currDepto.toUpperCase())
        ) {
          return muni;
        }
      });
    },
    filtrarM: function() {
      let token = this.buscar;
      return this.xmunis.filter((muni, index) => {
        if (this.l_currDepto.length === 0) {
          if (muni.nombre.toUpperCase().includes(token.toUpperCase())) {
            return muni;
          } // if()
        } else {
          if (
            muni.nombre.toUpperCase().includes(token.toUpperCase()) &&
            this.l_currDepto === muni.codDepto
          ) {
            return muni;
          } // if()
        }
      }); // return
    }, // filtar()
    l_currDepto() {
      return this.deptos.st_DeptoCurr.codigo;
    },
    l_currDeptoN() {
      return this.deptos.st_DeptoCurr.nombre;
    },
    l_currDeptoK() {
      return this.deptos.st_DeptoCurr.llave;
    },
    l_currDeptoCM() {
      return this.deptos.st_DeptoCurr.cantmunis;
    }
  },
  methods: {
    ...mapMutations(["agregarMuni", "eliminarMuni", "actualizarCMDepto"]),
    /* ================================================================================================================================== */

    getMunis(losMunis) {

      this.xmunis = [];
      for (let key in losMunis) {

        this.xmunis.push({
          llave: key,
          codDepto: losMunis[key].codDepto,
          codigo: losMunis[key].codigo,
          nombre: losMunis[key].nombre
        });
      } // for

      this.munis.munis = this.xmunis;
      this.correlativo = this.xmunis.length;
    },
    cargandoMunis() {

        var dummy = this.munis.st_dbMunis.on("value", snapshot =>
                        this.getMunis(snapshot.val())
        );
    },

    /* ============================================================================================================================ */
    nuevoM() {
      let ltotalEsteDepto = this.munisxDepto.length;

      /* Obteniendo el código del departamento concurrente */
      this.lcodDepto = this.l_currDepto;

      let proxCodigo = ltotalEsteDepto + 1;
      proxCodigo = proxCodigo.toString().trim();
      if (ltotalEsteDepto + 1 <= 9) {
        proxCodigo = "0" + proxCodigo;
      }
      this.lcodigoM = proxCodigo;
    },
    eliminar(elmuni) {

      var confirma = confirm(
        "Seguro de eliminar el municipio " + elmuni.nombre + " ?"
      );
      if (confirma === true) {
        this.$store.commit("eliminarMuni", elmuni);

        /* Decrementa el contador de municipios para el departamento concurrente */
        this.$store.commit("actualizarCMDepto", {
          cantmunis: this.l_currDeptoCM - 1
        });
      } // if (confirma)
    }, // eliminar()
    agregar() {

      if (
        this.lcodDepto.trim().length > 0 &&
        this.lcodigoM.trim().length > 0 &&
        this.lnombre.trim().length > 0
      ) {
        var confirma = confirm(
          "Seguro de grabar el municipio " + this.lnombre + "? "
        );
        if (confirma === true) {
          this.$store.commit("agregarMuni", {
            codDepto: this.deptos.st_DeptoCurr.codigo,
            codigo: this.lcodigoM,
            nombre: this.lnombre
          });

          /* Incrementa el contador de municipios para el departamento concurrente */
          this.$store.commit("actualizarCMDepto", {
            cantmunis: this.l_currDeptoCM + 1
          });
        } // if (confirma)

        alert("Municipio " + this.lnombre + " grabado con éxito");
      } // if (length >0)
      else {
        let mensaje = "";
        if (this.lcodDepto.trim().length <= 0) {
          mensaje = "Debe Seleccionar un Departamento.";
        }
        if (this.lnombre.trim().length <= 0) {
          mensaje = mensaje + "\nDebe ingresar un Nombre al Municipio.";
        }
        alert(mensaje);
      }

      this.limpiar();
    }, // agregar()
    limpiar() {
      this.lcodigoM = "";
      this.lnombre = "";
    } // limpiar()
  } // methods
};
</script>

<!-- 
        // methods: mapMutations(['cargaDeptos'])    
-->