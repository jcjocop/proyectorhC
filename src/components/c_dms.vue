<!--*
 *      c_dms.vue
 *          Lista de Distritos de Salud
 */
======================================================================================================== -->
<template>
    <section>
        <div class="center">
            <a v-if="l_currDAS.trim().length > 0">
                <span style="font-size:18px;">Distritos del Área de Salud: <span style="font-size:16px; font-weight:bold; font-style:italic">{{l_currDASN}}</span></span>
            </a>
            <a v-else>
                <span style="font-size:18px;">Distritos del País</span>
            </a>                                    
        </div>

        <!-- Card con la identificación del catálogo y opción para grabar -->
        <div class="row">
            <!-- buscarDepto ? {{deptos.buscarPalabra}}; rutaDeptos: {{deptos.st_rutaDeptos}}; dbDeptos: {{deptos.st_dbDeptos}}<br> -->
            <div class="col s12">                
                <div class="card grey lighten-3 black-text z-depth-4">
                    <!-- <deptosID></deptosID> -->
                    <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab"><a href="#test7" class="active">Buscar Distrito de Salud</a></li>
                            <li class="tab"><a href="#test8">Agregar Distrito de Salud</a></li>
                        </ul>
                    </div>
                    <div class="">
                        <div id="test7">
                            <div class="input-field">
                                <input type="text" v-model="buscar" placeholder="">
                                <label class="black-text">Escriba el nombre del Distrito de Salud que desea encontrar.</label>
                            </div>
                        </div> <!-- text7 -->
                        <div id="test8">
                            <div class="center">
                                <div style="height: 18px;"></div>                        
                                <span>Oprima este botón </span>
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger" data-position="top" data-tooltip="Nuevo Distrito de Salud"  
                                    @click="nuevoDMS()" href="#modal4">
                                    <i class="material-icons">edit</i>
                                </a>                        
                                <span>para gregar un Distrito de Salud</span>
                                <div style="height: 18px;"></div>
                            </div>
                        </div> <!-- test8 -->
                    </div> <!-- card-content -->
                </div> <!-- card blue-grey ... -->
            </div> <!-- col s12-->

            <!-- dmsxdas -->
            <div class="col s12">
                <pagineo 
                    :lista='filtrarDMS' 
                    :listaf='dmsxdas'
                    :mensaje='lmensaje'
                    :liminf='ldms_ini' 
                    :limsup='ldms_fin'
                    :npagina='dms_pagina'
                    :fuente='lfuente'>
                </pagineo>
            </div>            

            <!-- Tabla con la lista de los departamentos del pais -->
            <div class="col s12">
                <!-- deptos: {{deptos.deptos}} -->
                <table class="responsive-table striped hoverable z-depth-3">
                    <thead style="font-size:13px">
                        <tr>
                            <th>DAS</th>
                            <th>Cod.</th>
                            <th>Nombre</th>
                            <th>Cod. SIGSA</th>                            
                            <th>#SS</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-if="index>=ldms_ini && index <=ldms_fin-1" v-for="(dms,index) in filtrarDMS" @click="activarDMS(dms)">
                
                            <td style="padding: 5px 5px;" :bgcolor="dms.color">  {{dms.codDAS}} </td>
                            <td style="padding: 5px 5px;" :bgcolor="dms.color">  {{dms.codigo}} </td>
                            <td style="padding: 5px 5px;" :bgcolor="dms.color">  {{dms.nombre}}  </td>
                            <td style="padding: 5px 5px;" :bgcolor="dms.color">  {{dms.codsigsa}}  </td>
                            <td style="padding: 5px 5px;" :bgcolor="dms.color">  {{dms.cantss}} </td>

                            <td style="padding: 5px 5px;" :bgcolor="dms.color">
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped" data-position="top" data-tooltip="Eliminar Distrito de Salud"
                                    @click="eliminar(dms)">
                                        <i class="material-icons">delete</i>                                
                                </a>
                                
                            </td>
                        </tr>
                    </tbody>
                </table> <!-- Tabla con la lista de los departamentos del pais -->

                <!-- modal -->
                <div id="modal4" class="modal">
                    <div class="modal-content">
                        <!-- currDepto: {{lcodDepto}} proxcod: {{lcodigoM}}  -->
                        <span class="center">Para ingresar un Nuevo Distrito de Salud al Área de Salud: {{l_currDASN}}, complete los datos con asterisco <span style="font-weight: bold; color: #9d0006">rojo</span>.</span><br>
                        <form @submit.prevent="">                
                            <div class="row">
                                <div class="col s2">
                                    <span>Código DAS</span>
                                    <input type="text" v-model="lcodDAS" max="2" disabled>
                                </div>
                                <div class="col s1">
                                    <span>Código</span>
                                    <input type="text" v-model="lcodigoDMS" max="2" disabled>
                                </div>
                                <div class="col s6">
                                    <span><span style="font-size:17px; font-weight: bold; color: #9d0006">*</span>Nombre</span>
                                    <input type="text" v-model="lnombre">
                                </div>
                                <div class="col s3">
                                    <span>Código SIGSA</span>
                                    <input type="text" v-model="lcodsigsa" max="12">
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

    // st_rutaDeptos,st_dbDeptos
    export default {
        name: 'munis',
        data(){
            return {
                xdms: [], correlativo: 0, lfuente: "DMS",
                lcodDAS: "", lcodigoDMS: "", lnombre: "", buscar: "",
                lcodsigsa: "", lcantss: 0, lmensaje: "Distritos",
                lini: 0, lfin: 5,
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
                        
            this.cargandoDMS();
        },
        components:{
            moment,
            pagineo,
            // deptosID,
        },
        computed: { 
            ...mapState(['das','dms']),
            ldms_ini(){  return store.state.DMSlini; },
            ldms_fin(){  return store.state.DMSlfin; },
            dms_pagina(){  return store.state.DMSpagina; },                  
            dmsxdas(){
                return this.xdms.filter( (dms) => {

                    if ( dms.codDAS.toUpperCase().includes(this.l_currDAS.toUpperCase() ) ){
                        return dms
                    }
                })
            }, // dmsxdas()                    
            filtrarDMS: function() {

                let token=      this.buscar;
                return this.xdms.filter( (dms, index) => {

                    if (this.l_currDAS.length === 0){
                        if (dms.nombre.toUpperCase().includes(token.toUpperCase()) ) {
                            return dms
                        } // if()
                    } else {
                        if (dms.nombre.toUpperCase().includes(token.toUpperCase()) && this.l_currDAS===dms.codDAS ) {
                            return dms
                        } // if()
                    }
                }) // return
            }, // filtar()  
            l_currDAS(){  return this.das.st_DASCurr.codigo;  },
            l_currDASN(){  return this.das.st_DASCurr.nombre;  },
            l_currDASK(){  return this.das.st_DASCurr.llave;  },
            l_currDASCD(){  return this.das.st_DASCurr.cantdms;  },
        },
        methods:{
            ...mapMutations(['agregarDMS','eliminarDMS','actualizarCDMSDAS','filtrarDistritos']),
            /* ================================================================================================================================== */
                posicion(valor){
                    var ldiv1 = (valor) / 2;
                    var ldiv2 = Math.trunc(ldiv1);
                    let resultado = "impar";
                    if (ldiv1 === ldiv2){
                        resultado = "par";
                    }
                    return resultado;
                },                        
            activarDMS(currDMS){

                /* Refresca todos los registros con el color default: black  */
                var i=0;
                for (i = 0; i < this.dmsxdas.length; i++) { 

                    this.dmsxdas[i].color="#FFFFFF";
                    if (this.posicion(i+1) === "impar") {
                        this.dmsxdas[i].color="#F2F2F2";
                    }
                    this.dmsxdas[i].tamano="3";
                }
                /* Cambia el color del registro concurrente (FFDD00) */
                currDMS.color  = "#0DA8E5"; // verde: 21960C; celeste: 13C3FF; verde claro: 12FF88
                currDMS.tamano = "3"; 

                this.dms.st_DMSCurr.codigo    = currDMS.codigo;
                this.dms.st_DMSCurr.nombre    = currDMS.nombre;
                this.dms.st_DMSCurr.llave     = currDMS.llave;
                this.dms.st_DMSCurr.cantss    = currDMS.cantss;

                /* Incializando contadores para los distritos del área concurrente */
                store.state.DMSlini   = 0;
                store.state.DMSlfin   = 5;
                store.state.DMSpagina = 1;
                store.state.DMSesLimiteInf= true;
                store.state.DMSesLimiteSup= false;

                /* Incializando contadores para los SS del área concurrente */
                store.state.SSlini   = 0;
                store.state.SSlfin   = 5;
                store.state.SSpagina = 1;
                store.state.SSesLimiteInf= true;
                store.state.SSesLimiteSup= false;
            },            
            getDMS(losDMS){

                this.xdms = [];        
                for (let key in losDMS){

                    this.xdms.push({

                        llave: key,
                        codDAS: losDMS[key].codDAS,
                        codigo: losDMS[key].codigo, 
                        nombre: losDMS[key].nombre,
                        codsigsa: losDMS[key].codsigsa,
                        cantss: losDMS[key].cantss,
                        color: "",
                        tamano: "3",
                    })
                } // for

                this.dms.dms    = this.xdms;
                this.correlativo= this.xdms.length;
            },                     
            cargandoDMS() {

                var dummy= this.dms.st_dbDMS
                            .on('value',snapshot=> this.getDMS( snapshot.val() ) );
            },

            /* ============================================================================================================================ */
            nuevoDMS(){

                let ltotalEsteDepto= this.xdms.length;

                /* Obteniendo el código del departamento concurrente */
                this.lcodDAS=  this.l_currDAS;

                let proxCodigo= ltotalEsteDepto + 1;
                proxCodigo= proxCodigo.toString().trim();
                if ( (ltotalEsteDepto + 1) <= 9){
                    proxCodigo= '0' + proxCodigo;
                }
            },
            eliminar(eldms){

                if (eldms.cantss > 0 ){

                    alert("No es posible eliminar el Distrito "+eldms.nombre+
                           ". \nTiene relación con "+eldms.cantss+" Servicios de Salud.");
                } else{

                    var confirma = confirm("Seguro de eliminar el Distrito de Salud "+eldms.nombre+" ?");
                    if (confirma === true){

                        this.$store.commit('eliminarDMS',eldms);

                        /* Decrementa el contador de municipios para el departamento concurrente */
                        this.$store.commit('actualizarCDMSDAS',{
                            cantdms:  this.l_currDASCD - 1,
                        })
                    } // if (confirma)
                }// if ( >0 )
            }, // eliminar()
            agregar(){

                if (this.lcodDAS.trim().length >0 && this.lcodigoDMS.trim().length >0 && this.lnombre.trim().length >0 ){

                    var confirma = confirm("Seguro de grabar el Distrito de Salud "+this.lnombre+ "? ");
                    if (confirma === true){

                        this.$store.commit('agregarDMS',{
                            codDAS: this.das.st_DASCurr.codigo,
                            codigo: this.lcodigoDMS,
                            nombre: this.lnombre,
                            codsigsa: this.lcodsigsa,
                            cantss: this.lcantss,
                        });

                        /* Incrementa el contador de municipios para el departamento concurrente */
                        this.$store.commit('actualizarCDMSDAS',{
                            cantdms:  this.l_currDASCD + 1,
                        });

                        alert("Distrito de Salud "+ this.lnombre +" grabado con éxito");
                    } // if (confirma)

                } // if (length >0)
                else {
                    let mensaje="";
                    if (this.lcodDAS.trim().length <= 0){
                        mensaje="Debe Seleccionar un Área de Salud."
                    }
                    if (this.lnombre.trim().length <= 0){
                        mensaje= mensaje + "\nDebe ingresar un Nombre al Distrito."
                    }
                    alert(mensaje);
                }                

                this.limpiar()
            }, // agregar()
            limpiar(){

                this.lcodigoDMS = "";
                this.lnombre    = "";
                this.lcodsigsa  = "";                
            }, // limpiar()
        } // methods
    }
</script>