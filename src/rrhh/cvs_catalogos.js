/**
 *   cvs_catalogos.js
 *   Marzo 6, 2019
 *   by Juan Carlos Jocop
 */
import moment       from 'moment'
// import { mapState } from 'vuex'

import profesiones  from './c_profesiones.vue'
import puestos      from './c_puestos.vue'
import eciviles     from './c_ecivil.vue'

import M from 'materialize-css'

export default {
     name: 'cvscatalogos',
     components: {
          moment, profesiones, puestos, eciviles,
     },
     template: `#cvscatalogos`,
     mounted() {
     },
     // computed: {
     //      ...mapState(['profesiones','puestos','eciviles']),  // ,'responsables'            
     // },
} // export