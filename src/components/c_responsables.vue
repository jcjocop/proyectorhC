<!--*
 *      c_responsables.vue
 *          Lista de Responsables
 */
======================================================================================================== -->
<template>
    <section>
        <div class="center">
            <!-- {{lr_ini}}, {{lr_fin}} -->
            <a v-if="l_currCargo.trim().length > 0">
                <span style="font-size:18px;">Responsables con cargo de <span style="font-size:16px; font-weight:bold; font-style:italic">{{l_currCargoN}}  ({{l_currCargo}})</span></span>
            </a>
            <a v-else>
                <span style="font-size:18px;">Responsables de Instancias de Salud</span>
            </a>            
        </div>

        <!-- Card con la identificación del catálogo y opción para grabar -->
        <div class="row">
            <div class="col s12">                
                <div class="card grey lighten-3 black-text z-depth-4">
                    <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab"><a href="#test3" class="active">Buscar Responsable</a></li>
                            <li class="tab"><a href="#test4">Agregar Responsable</a></li>
                        </ul>
                    </div>
                    <div class="">
                        <div id="test3">
                            <div class="input-field">                        
                                <input type="text" v-model="buscar" placeholder="">
                                <label class="black-text">Escriba el nombre del Responsable que desea encontrar.</label>
                            </div>
                        </div> <!-- text4 -->
                        <div id="test4">
                            <div class="center">
                                <div style="height: 18px;"></div>                        
                                <span>Oprima este botón </span>
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger" data-position="top" data-tooltip="Nuevo Responsable"  
                                    @click="nuevoR()" href="#modal2">
                                    <i class="material-icons">edit</i>
                                </a>                        
                                <span>para gregar un Responsable</span>
                                <div style="height: 18px;"></div>
                            </div>
                        </div> <!-- text5 -->
                    </div> <!-- card-content -->
                </div>
            </div>

<!-- 
                    :lista='respoxCargo'
                    :listaf='respoxCargo'
-->
            <div class="col s12">
                <pagineo 
                    :lista='xresponsables'
                    :listaf='xresponsables'
                    :mensaje='lmensaje'
                    :liminf='lr_ini' 
                    :limsup='lr_fin'
                    :npagina='r_pagina'
                    :fuente='lfuente'>
                </pagineo>
            </div>            

            <!-- Tabla con la lista de los departamentos del pais -->
            <div class="col s12">
                <!-- cargos: {{cargos.cargos}} -->
                <table class="responsive-table striped hoverable z-depth-3" >
                    <thead style="font-size:13px">
                        <tr>
                            <th>Cod.</th>
                            <th>Nombre</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <!-- l_currCargo===responsable.codCargo &&  
                        , {{lr_ini}}, {{lr_fin}}
                    -->
                    <tbody>
                        <tr v-if="index>=lr_ini && index <=lr_fin-1" v-for="(responsable,index) in filtrarR">
                
                            <td style="padding: 5px 5px;">{{responsable.codigo}}</td>
                            <td style="padding: 5px 5px;">{{responsable.nombre}}</td>
                            <td style="padding: 5px 5px;">
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped" data-position="top" data-tooltip="Eliminar Responsable"
                                    @click="eliminar(responsable)">
                                        <i class="material-icons">delete</i>                                
                                </a>
                                
                            </td>
                        </tr>
                    </tbody>
                </table> <!-- Tabla con la lista de los departamentos del pais -->

                <!-- modal -->
                <div id="modal2" class="modal" >
                    <div class="modal-content">
                        <!-- currDepto: {{lcodCargo}} proxcod: {{lcodigoM}}  -->
                        <span class="center">Para ingresar Nuevo Responsable para el cargo: {{l_currCargoN}}, complete los datos con asterisco <span style="font-weight: bold; color: #9d0006">rojo</span>. </span><br>
                        <form @submit.prevent="">                
                            <div class="row">
                                <div class="col s2">
                                    <span>Depto</span>
                                    <input type="text" v-model="lcodCargo" max="2" disabled>
                                </div>
                                <div class="col s2">
                                    <span>Código</span>
                                    <input type="text" v-model="lcodigoR" max="2" disabled>
                                </div>
                                <div class="col s8">
                                    <span><span style="font-size:17px; font-weight: bold; color: #9d0006">*</span>Nombre</span>
                                    <input type="text" v-model="lnombre">
                                </div>
                                <div class="col s12 center">
                                    <p></p>
                                    <button class="modal-close waves-effect waves-light btn-floating darken-5 z-depth-3 green btn tooltipped" 
                                            data-position="top" data-tooltip="Grabar"
                                            @click="agregar"> 
                                            <i class="material-icons">check</i></button>
                                    <button class="modal-close waves-effect waves-light btn-floating darken-5 z-depth-3 red   btn tooltipped" data-position="right" data-tooltip="Cancelar"> 
                                        <i class="material-icons">close</i></button>
                                </div>
                            </div> <!-- row --> 
                        </form> <!-- form -->                                
                    </div> <!-- modal-content -->
                    <!-- <a class="modal-close btn btn-floating tooltipped red" data-tooltip="Salir" data-position="top"><app-icon img="close"></app-icon></a> -->            
                </div> <!-- modal1 -->                        
            </div> <!-- col s12 -->            
        </div> <!-- row -->    
    </section>
</template>

<script>

    import 'materialize-css/dist/css/materialize.min.css'
    import M                        from 'materialize-css'
    import moment                   from 'moment'

    import pagineo          from './culturaGPagineo.vue'

    import {store}          from './../store/store'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: 'responsables',
        data(){
            return {
                xresponsables: [], correlativo: 0, lfuente: "R",
                lcodCargo: "", lcodigoR: "", lnombre: "", buscar: "",
                lmensaje: "Responsables",
                // lini: 0, lfin: 5, 
            }
        },
        mounted(){
            
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {dismissible: false});
                        
            this.cargandoresponsables();
        },
        components:{
            moment,
            pagineo,
        },
        computed: { 
            ...mapState(['cargos','responsables']),
            lr_ini(){ return store.state.Rlini;  },
            lr_fin(){ return store.state.Rlfin;  },
            r_pagina(){ return store.state.Rpagina; },                  
                    respoxCargo(){
                        return this.xresponsables.filter( (responsable) => {

                            if ( responsable.codCargo.toUpperCase().includes(this.l_currCargo.toUpperCase() ) ){
                                return responsable
                            }
                        })
                    }, 
            filtrarR: function() {

                let token= this.buscar;
                return this.xresponsables.filter( (responsable, index) => {
                    
                    if (this.l_currCargo.length === 0){
                        if (responsable.nombre.toUpperCase().includes(token.toUpperCase()) ) {
                            return responsable
                        } // if()
                    } else {
                        if (responsable.nombre.toUpperCase().includes(token.toUpperCase()) && this.l_currCargo===responsable.codCargo ) {
                            return responsable
                        } // if()                        
                    }
                }) // return
            }, // filtar()
            l_currCargo(){  return this.cargos.st_cargoCurr.codigo;  },
            l_currCargoN(){  return this.cargos.st_cargoCurr.nombre;  },
            l_currCargoK(){  return this.cargos.st_cargoCurr.llave;  },
            l_currCargoCC(){  return this.cargos.st_cargoCurr.cantrespons;  },
        },
        methods:{
            ...mapMutations(['agregarresponsable','eliminarresponsable','actualizarCRespons']),
            /* ================================================================================================================================== */            
            getresponsables(losresponsables){

                this.xresponsables = [];        
                for (let key in losresponsables){

                    this.xresponsables.push({

                        llave: key,
                        codCargo: losresponsables[key].codCargo,
                        codigo: losresponsables[key].codigo, 
                        nombre: losresponsables[key].nombre, 
                    })
                } // for

                this.responsables.responsables= this.xresponsables;
                this.correlativo= this.xresponsables.length;
            },                     
            cargandoresponsables() {

                var dummy= this.responsables.st_dbResponsables
                            .on('value',snapshot=> this.getresponsables( snapshot.val() ) );
            },

            /* ============================================================================================================================ */
            nuevoR(){

                let ltotalEsteResponsable= this.respoxCargo.length;

                /* Obteniendo el código del departamento concurrente */
                this.lcodCargo=  this.l_currCargo;

                let proxCodigo= ltotalEsteResponsable + 1;
                proxCodigo= proxCodigo.toString().trim();
                if ( (ltotalEsteResponsable + 1) <= 9){
                    proxCodigo= '0' + proxCodigo;
                }
                this.lcodigoR= proxCodigo;
            },
            eliminar(elresponsable){

                /* +elresponsable.llave+" )" */
                var confirma = confirm("Seguro de eliminar el Responsable "+elresponsable.nombre+" ?");
                if (confirma === true){

                    this.$store.commit('eliminarresponsable',elresponsable);

                    /* Decrementa el contador de Responsables para el departamento concurrente */
                    this.$store.commit('actualizarCRespons',{
                        cantrespons:  this.l_currCargoCC - 1,
                    })
                } // if (confirma)
            }, // eliminar()
            agregar(){

                if (this.lcodCargo.trim().length > 0 && this.lcodigoR.trim().length >0 && this.lnombre.trim().length >0 ){

                    var confirma = confirm("Seguro de grabar el Responsable "+this.lnombre+ "? ");
                    if (confirma === true){

                        this.$store.commit('agregarresponsable',{
                            codCargo: this.cargos.st_cargoCurr.codigo,
                            codigo: this.lcodigoR,
                            nombre: this.lnombre,
                        });

                        /* Incrementa el contador de Responsables para el departamento concurrente */
                        this.$store.commit('actualizarCRespons',{
                            cantrespons:  this.l_currCargoCC + 1,
                        });
                    } // if (confirma)

                    alert("Responsable "+ this.lnombre +" grabado con éxito");            
                } // if (length >0)
                else {
                    let mensaje="";
                    if (this.lcodCargo.trim().length <= 0){
                        mensaje="Debe Seleccionar un Cargo."
                    }
                    if (this.lnombre.trim().length <= 0){
                        mensaje= mensaje + "\nDebe ingresar un Nombre al Responsable."
                    }
                    alert(mensaje);
                }                

                this.limpiar()
            }, // agregar()
            limpiar(){

                this.lcodigoR= "";
                this.lnombre= "";
            }, // limpiar()
        } // methods
    }
</script>

<!-- 
        // methods: mapMutations(['cargacargos'])    
-->