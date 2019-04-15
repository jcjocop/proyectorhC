<!--
    //* otroscat.vue
    //* Sub-menu para otros catálogos (cargos y responsables) 
-->
<template id="otroscatalogos">
    <section>
        <!--//? Opciones del floating-Point -->
        <div class="fixed-action-btn  direction-bottom" style="position: fixed; top:10px; left:250px; right:1220px; bottom:180px;">
        
            <a class="btn-floating btn-medium blue darken-4"> <i class="large material-icons">more_vert</i>  </a>
            <ul>
                <li><a @click="ayuda" 
                        class="btn waves-effect btn-floating blue darken-2 tooltipped" 
                        data-position="rigth" 
                        data-tooltip="Ayuda" 
                        style="opacity: 0; transform: scale(0.4) translateY(0px) translateX(40px);">
                        <i class="material-icons">accessibility</i>  
                    </a>  
                </li>
                <li><a @click="quitarFiltros" 
                        class="btn waves-effect btn-floating blue darken-2 tooltipped" 
                        data-position="top" 
                        data-tooltip="Quitar filtros." 
                        style="opacity: 0; transform: scale(0.4) translateY(0px) translateX(40px);">
                        <i class="material-icons">refresh</i>  
                    </a>
                </li>
            </ul>
        </div> <!--//* Floating Botton: Acciones complementarias -->

        <!--//? Despliegue de la ayuda -->
        <div class="container row">
            <transition name="fade">
                <section v-if="mostrar" class="center">
                    <b >AYUDA</b><br>
                    <p>Todo catálogo tiene las siguientes partes.</p>
                    <img src="/proyectorh/src/assets/imagenes/ayudacata1.jpg">
                </section>
            </transition>         
        </div>

        <!--//? Declara los componentes para los Cargos y Responsables -->
        <div class="row">
            <div class="col s4">
                <cargos></cargos>
            </div>
        </div>
        <div class="row">

            <div class="col s4">
                <responsables></responsables>            
            </div>
        </div>        
    </section>
</template>

<script>

    import Vue          from 'vue';
    
    import moment       from 'moment'    
    import {store}      from './../store/store'
    // import {mapState}   from 'vuex'

    import cargos       from './c_cargos.vue'
    import responsables from './c_responsables.vue'

    import M from 'materialize-css'

    export default {
        name: 'otroscatalogos',
        data(){
            return {
                mostrar: false,
            }
        },
        components:{
            moment, cargos, responsables
        },
        template:  `#otroscatalogos`,
        mounted(){

            var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = M.FloatingActionButton.init(elems, {});
        },        
        methods:{
            ayuda(){
                this.mostrar = !this.mostrar;
            },
            quitarFiltros(){

                this.cargos.st_cargoCurr.codigo = "";
                var i=0;
                for (i = 0; i < this.cargos.cargos.length; i++) { 
                    this.cargos.cargos[i].color="";
                    this.cargos.cargos[i].tamano="3";
                } //* for                
            } //* quitarFiltros()
        } //* methods
    } //* export
</script>
