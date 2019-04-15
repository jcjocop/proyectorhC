<!-- 
    //* configuración.vue
    //* Valores pre-definidos.
-->
<template>
    <section>

        <!-- //? Imágen de fondo -->
        <div class="container">

               <div class="row">
                    <!-- //? Mensaje de Bienvenida -->
                    <div class="center">
                         <b style="font-size:19px" class="center">Valores predefinidos</b><br>
                    </div>

                    <div class="col s6">
                         <span>Cantidad de días para alertar la fecha de Revisión ? </span>
                         <input type="number" v-model="lDiasAviso">
                    </div>
                    <div class="col s6">
                         <span>Cantidad de días para revisar los Curriculums a partir del ingreso ? </span>
                         <input type="number" v-model="lDiasRevision">
                    </div>
               </div>

               <div class="row col s12 center">
                    <button class="btn waves-effect 
                              waves-light 
                              btn-small green tooltipped" 
                              data-position="top" 
                              data-tooltip="Actualizar valores"
                              @click="actualizaValores">
                              <i class="material-icons">system_update_alt</i>
                    </button>                    
               </div>
        </div> <!-- //* class="ros" -->
    </section>        
</template>

<!--//? =*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*#=*# -->
<script>

     // import Vue from 'vue'
     // import VueFire from 'vuefire'

     import {store}           from './../store/store'
     import firebase          from 'firebase';

     import 'materialize-css/dist/css/materialize.min.css'
     import M                        from 'materialize-css'

     import {library}         from '@fortawesome/fontawesome-svg-core'
     import { faCog, }        from '@fortawesome/free-solid-svg-icons'
     import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
     library.add(faCog)                          //* 22

     export default {
          data(){
               return {
                    lDiasAviso: 0,
                    lDiasRevision: 0,
               }
          },
          components: {
               fontawesomeicon: FontAwesomeIcon,
          },
          mounted(){
               var elems = document.querySelectorAll('.tooltipped');
               var instances = M.Tooltip.init(elems, {});
               
               this.cargandoValores();
          }, 
          methods:{
               /*//? ======================================================================================== */
               cargandoValores  () {
                    console.log("ruta ? ",store.state.st_rutaValoresC);
                    console.log("db   ? ",store.state.st_dbValoresC);
                    console.log("conf ? ",this.configuracion);

                    var dummy = store.state.st_dbValoresC.on('value', snapshot => 
                                   this.getValores( snapshot.val()) );
               },
               getValores (losValores) {

                    store.state.st_valoresConf = [];
                    store.state.st_valoresConf.diasaviso = losValores.diasaviso;
                    store.state.st_valoresConf.diasrevision = losValores.diasrevision;

                    this.lDiasAviso      = losValores.diasaviso;
                    this.lDiasRevision   = losValores.diasrevision;
               },
               actualizaValores(){

                    var confirma = confirm("Seguro de actualizar los valores ? ");
                    if (confirma === true) {
                         var actualizar = store.state.st_dbValoresC.update({
                              diasaviso: this.lDiasAviso,
                              diasrevision: this.lDiasRevision,
                         });
                    }
               },
          }
    }
</script>