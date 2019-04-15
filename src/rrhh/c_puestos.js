/**
 *   c_puestos.js
 *   Marzo 8, 2019
 *   by Juan Carlos Jocop
 */
import M from 'materialize-css'

import { store } from './../store/store'

import { mapMutations, mapGetters } from 'vuex';
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */
export default {
     name: 'puestos',
     data: function () {
          return {

               busqueda: "",
               descripcion: "", id: "",
          }
     }, // data
     mounted() {

          var elems = document.querySelectorAll('select');
          var instances = M.FormSelect.init(elems, {});

          var elems = document.querySelectorAll('.modal');
          var instances = M.Modal.init(elems, { dismissible: false });

          var elems = document.querySelectorAll('.tooltipped');
          var instances = M.Tooltip.init(elems, {});

          this.cargarInformacion();
     },
     computed: {
          // ...mapState(['st_profesiones', 'st_rutaProfesiones', 'st_db']),
          ...mapGetters(['totaldeRegistrosP']),          /* Filtra las tareas cuando la búsqueda es por descripción o responsable */
          filtrar: function () {

               var buscar = this.busqueda;
               return store.getters.filtrarRegistrosP({ buscar })
          }
     },
     methods: {
          ...mapMutations(['cargandoPuestos', 'borrarPuesto', 'agregarPuesto']),
          limpiar() {

               this.busqueda = "";
               this.id = "";
               this.descripcion = "";
          },
          /* ================================================================================================================================== */
          cargarInformacion() {

               this.$store.commit('cargandoPuestos');
          },
     }
} // methods
