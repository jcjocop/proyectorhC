<!--*
 *      c_tiposS.vue
 *          Lista de Tipos de Servicio
 */
======================================================================================================== -->
<template>
    <section>
        <div class="center">

            <a style="font-size:18px;">Tipos de Servicio de Salud</a><br>
        </div>

        <!-- Card con la identificación del catálogo y opción para grabar -->
        <div class="row">
            <div class="col s12">                
                <div class="card grey lighten-3 black-text z-depth-4">
                    <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab"><a href="#test9" class="active">Buscar Tipo de Servicio</a></li>
                            <li class="tab"><a href="#test10">Agregar Tipo de Servicio</a></li>
                        </ul>
                    </div>
                    <div class="">
                        <div id="test9">
                            <div class="input-field">                        
                                <input type="text" v-model="buscar" placeholder="">
                                <label class="black-text">Escriba el nombre del Tipo de Servicio que desea encontrar.</label>
                            </div>
                        </div> <!-- text4 -->
                        <div id="test10">
                            <div class="center">
                                <div style="height: 18px;"></div>                        
                                <span>Oprima este botón </span>
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger" data-position="top" data-tooltip="Nuevo Tipo de Servicio"
                                    @click="nuevo()" href="#modal5">
                                    <i class="material-icons">edit</i>
                                </a>                        
                                <span>para gregar un Tipo de Servicio</span>                        
                                <div style="height: 18px;"></div>
                            </div>
                        </div> <!-- text5 -->
                    </div> <!-- card-content -->
                </div>
            </div>

            <div class="col s12">
                <pagineo 
                    :lista='xtipoS' 
                    :listaf='filtrarTS'
                    :mensaje='lmensaje'
                    :liminf='lts_ini' 
                    :limsup='lts_fin'
                    :npagina='ts_pagina'
                    :fuente='lfuente'>
                </pagineo>
            </div>            

            <!-- Tabla con la lista de los departamentos del pais -->
            <div class="col s12">
                <!-- deptos: {{deptos.deptos}} -->
                <!-- {{ld_ini}}; {{ld_fin-1}} -->
                <table class="responsive-table striped hoverable z-depth-3">
                    <thead style="font-size:13px">
                        <tr>
                            <th>Cod.</th>
                            <th>Nombre</th>
                            <th>Siglas</th>
                            <th>#SS</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-if="index>=lts_ini && index <=lts_fin-1" v-for="(tipoS,index) in filtrarTS" @click="activarTipoS(tipoS)">

                            <td style="padding: 5px 5px;" :bgcolor="tipoS.color"> {{tipoS.codigo}}</td>
                            <td style="padding: 5px 5px;" :bgcolor="tipoS.color"> {{tipoS.nombre}}</td>
                            <td style="padding: 5px 5px;" :bgcolor="tipoS.color"> {{tipoS.siglas}}</td>
                            <td style="padding: 5px 5px;" :bgcolor="tipoS.color"> {{tipoS.cantss}}</td>

                            <td style="padding: 5px 5px;" :bgcolor="tipoS.color">
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped" data-position="top" data-tooltip="Eliminar Tipo de Servicio"
                                    @click="eliminar(tipoS)">
                                        <i class="material-icons">delete</i>                                
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table> <!-- Tabla con la lista de los departamentos del pais -->

                <!-- modal -->
                <div id="modal5" class="modal">
                    <div class="modal-content">
                        <span class="center">Para ingresar Nuevo Tipo de Servicio, complete los datos con asterisco <span style="font-weight: bold; color: #9d0006">rojo</span>.</span><br>
                        <form @submit.prevent="">                
                            <div class="row">
                                <div class="col s2">
                                    <span>Código</span>
                                    <input type="text" v-model="lcodigo" max="2" disabled>                            
                                </div>
                                <div class="col s7">
                                    <span><span style="font-size:17px; font-weight: bold; color: #9d0006">*</span>Nombre</span>
                                    <input type="text" v-model="lnombre">
                                </div>
                                <div class="col s3">
                                    <span><span style="font-size:17px; font-weight: bold; color: #9d0006">*</span>Siglas</span>
                                    <input type="text" v-model="lsiglas">
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
                </div> <!-- 5 -->        
            </div> <!-- col s12 -->            
        </div> <!-- row -->
    
    </section>
</template>

<script>

    import 'materialize-css/dist/css/materialize.min.css'
    import M                        from 'materialize-css'
    import moment                   from 'moment'

    // import deptosID                 from './c_deptosID.vue'

    import pagineo          from './culturaGPagineo.vue'    

    import {store}          from './../store/store'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: 'deptos',
        data(){
            return {
                xtipoS: [], correlativo: 0, lfuente: "TS",
                lcodigo: "", lnombre: "", lsiglas: "",
                lcantss: 0, lcantdas: 0, buscar: "", lmensaje: "Tipos de Servicio",
            }
        },
        mounted(){

            /** Definiciones para el uso de los slides y tooltips */
            var elems       = document.querySelectorAll('.collapsible');
            var instances   = M.Collapsible.init(elems, {});            

            var elems = document.querySelectorAll('.tooltipped');
            var instances = M.Tooltip.init(elems, {});
            
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {dismissible: false});

            var elem = document.querySelectorAll('.tabs'); 
            var instances = M.Tabs.init(elem, {});
                        
            this.cargandoTipoS();
        },
        components:{
            moment,
            pagineo,            
        },
        computed: { 
            ...mapState(['tipoS']),
            lts_ini(){  return store.state.TSlini;  },
            lts_fin(){  return store.state.TSlfin;  },
            ts_pagina(){  return store.state.TSpagina;  }, 
            filtrarTS: function() {

                let token=      this.buscar;
                return this.xtipoS.filter( (tipoS,index) => {                    
                    if (tipoS.nombre.toUpperCase().includes(token.toUpperCase()) ) {
                        return tipoS
                    } // if()
                }) // return
            }, // filtar()
        },
        methods:{
            ...mapMutations(['agregarTipoS','eliminarTipoS']),
                posicion(valor){
                    var ldiv1 = (valor) / 2;
                    var ldiv2 = Math.trunc(ldiv1);
                    let resultado = "impar";
                    if (ldiv1 === ldiv2){
                        resultado = "par";
                    }
                    return resultado;
                },                        
            activarTipoS(currTipoS){

                /* Refresca todos los registros con el color default: black  */
                var i=0; var elFondo = "";
                for (i = 0; i < this.xtipoS.length; i++) { 

                    this.xtipoS[i].color="#FFFFFF";

                    if (this.posicion(i+1) === "impar") {
                        this.xtipoS[i].color="#F2F2F2";
                    }
                    this.xtipoS[i].tamano="3";
                }
                /* Cambia el color del registro concurrente */
                currTipoS.color = "#0DA8E5"; // verde: 21960C; celeste: 13C3FF; verde claro: 12FF88
                currTipoS.tamano = "3"; 

                this.tipoS.st_TipoSCurr.codigo    = currTipoS.codigo;
                this.tipoS.st_TipoSCurr.nombre    = currTipoS.nombre;
                this.tipoS.st_TipoSCurr.llave     = currTipoS.llave;
                this.tipoS.st_TipoSCurr.siglas    = currTipoS.siglas;
                this.tipoS.st_TipoSCurr.cantss    = currTipoS.cantss;

                /* Incializando contadores para las áreas de salud del Departamento Concurrente */
                store.state.SSlini   = 0;
                store.state.SSlfin   = 5;
                store.state.SSpagina = 1;
                store.state.SSesLimiteInf= true;
                store.state.SSesLimiteSup= false;
            }, // activarTipoS
            /* ================================================================================================================================== */            
            getTipoS(losTipos){

                this.xtipoS = [];        
                for (let key in losTipos){

                    this.xtipoS.push({

                        llave: key,                                             // 1
                        codigo: losTipos[key].codigo, 
                        nombre: losTipos[key].nombre, 
                        siglas: losTipos[key].siglas,
                        cantss: losTipos[key].cantss,
                        color: "",
                        tamano: "3",
                    })
                } // for

                this.tipoS.tipoS= this.xtipoS;
                this.correlativo= this.xtipoS.length;
            },                     
            cargandoTipoS() {

                var dummy= this.tipoS.st_dbTipoS
                            .on('value',snapshot=> this.getTipoS( snapshot.val() ) );
            },

            /* ============================================================================================================================ */
            nuevo(){

                let proxCodigo= this.correlativo + 1;
                proxCodigo= proxCodigo.toString().trim();
                if ( (this.correlativo + 1) <= 9){
                    proxCodigo= '0' + proxCodigo;
                }
                this.lcodigo= proxCodigo;
            },
            eliminar(eltipoS){

                if (eltipoS.cantss > 0 ){

                    alert("No es posible eliminar el Tipo de Servicio "+eltipoS.nombre+
                           ". \nTiene relación con "+eltipoS.cantss+" Servicios de Salud.");
                } else{
                    var confirma = confirm("Seguro de eliminar el Tipo de Servicio de "+eltipoS.nombre+" ?");
                    if (confirma === true){
                    
                        this.$store.commit('eliminarTipoS',eltipoS);
                    }// if(confirma)
                } // if > 0
            },            
            agregar(){

                if (this.lcodigo.trim().length >0 && this.lnombre.trim().length >0 && this.lsiglas.trim().length >0){

                    var confirma = confirm("Seguro de grabar el Tipo de Servicio "+this.lnombre+ "? ");
                    if (confirma === true){
                
                        this.$store.commit('agregarTipoS',{
                            codigo: this.lcodigo,
                            nombre: this.lnombre,
                            siglas: this.lsiglas,
                            cantss: this.lcantss,
                        })
                        this.limpiar()

                        alert("Tipo de Servicio "+ this.lnombre +" grabado con éxito");
                    }// confirma()
                }// if (length)
                else {

                    alert("Debe ingresar un código, un nombre y siglas para grabar.");
                    this.limpiar();
                }                
            },
            limpiar(){

                this.lcodigo= "";
                this.lnombre= "";
                this.lsiglas= "";
            },
        } // methods
    }
</script>