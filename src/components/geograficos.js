import Vue from 'vue';

import moment from 'moment'
import { store } from './../store/store'
import { mapState } from 'vuex'

import deptos from './c_deptos'
import munis from './c_munis'
import das from './c_das.vue'
import dms from './c_dms.vue'
import tipoS from './c_tipoS.vue'
import ss from './c_ss.vue'

import M from 'materialize-css'

export default {
     name: 'geograficos',
     data() {
          return {
               mostrar: false,
          }
     },
     components: {
          moment, deptos, munis, das, dms, tipoS, ss
     },
     template: `#geograficos`,
     mounted() {
          var elems = document.querySelectorAll('.fixed-action-btn');
          var instances = M.FloatingActionButton.init(elems, {});
     },
     computed: {
          ...mapState(['deptos', 'dms', 'das', 'tipoS', 'ss']),  // ,'responsables'
     },
     methods: {
          ayuda() {
               this.mostrar = !this.mostrar;
          },
          quitarFiltros() {

               /* Quita los filtros para los Departamentos */
               this.deptos.st_DeptoCurr.codigo = "";
               var i = 0;
               for (i = 0; i < this.deptos.deptos.length; i++) {
                    this.deptos.deptos[i].color = "";
                    this.deptos.deptos[i].tamano = "3";
               } // * for

               /* Quita los filtros para los DAS */
               this.das.st_DASCurr.codigo = "";
               var i = 0;
               for (i = 0; i < this.das.das.length; i++) {
                    this.das.das[i].color = "";
                    this.das.das[i].tamano = "3";
               } // for                

               /* Quita los filtros para los DMS */
               this.dms.st_DMSCurr.codigo = "";
               var i = 0;
               for (i = 0; i < this.dms.dms.length; i++) {
                    this.dms.dms[i].color = "";
                    this.dms.dms[i].tamano = "3";
               } // * for                

               /* Quita los filtros para los Tipos de Salud */
               this.tipoS.st_TipoSCurr.codigo = "";
               var i = 0;
               for (i = 0; i < this.tipoS.tipoS.length; i++) {
                    this.tipoS.tipoS[i].color = "";
                    this.tipoS.tipoS[i].tamano = "3";
               } // * for                
          } // * quitarFiltros()
     } // * methods        
}