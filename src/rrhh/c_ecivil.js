/**
 *   //* c_civil.js
 *   //* Marzo 8, 2019
 *   //* by Juan Carlos Jocop
 */
import M from 'materialize-css'

import { store } from './../store/store'

import { mapMutations, mapGetters } from 'vuex';

export default {
     name: 'eciviles',
     data: function () {
          return {

               busqueda: "",
               descripcion: "", id: "",
          }
     }, //* data
     mounted() {

          var elems = document.querySelectorAll('select');
          var instances = M.FormSelect.init(elems, {});

          var elems = document.querySelectorAll('.modal');
          var instances = M.Modal.init(elems, { dismissible: false });

          var elems = document.querySelectorAll('.tooltipped');
          var instances = M.Tooltip.init(elems, {});

          this.cargarInformacion();
     }, //* mounted()
     computed: {
          ...mapGetters(['totaldeRegistrosEC']),          /* Filtra las tareas cuando la búsqueda es por descripción o responsable */
          filtrar: function () {

               var buscar = this.busqueda;
               return store.getters.filtrarRegistrosEC({ buscar })
          }
     },
     methods: {
          ...mapMutations(['cargandoECiviles', 'borrarECiviles', 'agregarECiviles']),
          limpiar() {

               this.busqueda = "";
               this.id = "";
               this.descripcion = "";
          }, //* limpiar()
          /* ================================================================================================================================== */
          cargarInformacion() {

               this.$store.commit('cargandoECiviles');
          }, //* cargarInformacion()
     } //* methods
} //* export
