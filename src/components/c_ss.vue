<!--*
 *      c_ss.vue
 *          Lista de Servicios de Salud
 */
======================================================================================================== -->
<template>
    <section>
        <div class="center">

            <a v-if="l_currTipoS.trim().length > 0">
                <span style="font-size:16px;">
                    <span style="font-size:14px; font-weight:bold; font-style:italic">{{l_currTipoSN}}; </span>
                    <span style="font-size:14px; font-weight:bold; font-style:italic">{{l_currDMSN}}; </span> 
                    <span style="font-size:14px; font-weight:bold; font-style:italic">{{l_currDASN}}</span>
                </span>
            </a>
            <a v-else>
                <span style="font-size:18px;">Servicios de Salud del País</span>
            </a>            
            
            <br>
        </div>

        <!-- Card con la identificación del catálogo y opción para grabar -->
        <div class="row">
            <div class="col s12">                
                <div class="card grey lighten-3 black-text z-depth-4">
                    <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab"><a href="#test11" class="active">Buscar Servicio de Salud</a></li>
                            <li class="tab"><a href="#test12">Agregar Servicio de Salud</a></li>
                        </ul>
                    </div>
                    <div class="">
                        <div id="test11">
                            <div class="input-field">                        
                                <input type="text" v-model="buscar" placeholder="">
                                <label class="black-text">Escriba el nombre del Servicio de Salud que desea encontrar.</label>
                            </div>
                        </div> <!-- text4 -->
                        <div id="test12">
                            <div class="center">
                                <div style="height: 18px;"></div>                        
                                <span>Oprima este botón </span>
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger" data-position="top" data-tooltip="Nuevo Servicio de Salud"  
                                    @click="nuevoSS()" href="#modal6">
                                    <i class="material-icons">edit</i>
                                </a>                        
                                <span>para gregar un Servicio de Salud</span>
                                <div style="height: 18px;"></div>
                            </div>
                        </div> <!-- text5 -->
                    </div> <!-- card-content -->
                </div>
            </div>

            <div class="col s12">
                <pagineo 
                    :lista='filtrarSS'
                    :listaf='ssxtsydas'
                    :mensaje='lmensaje'
                    :liminf='lSS_ini' 
                    :limsup='lSS_fin'
                    :npagina='SS_pagina'
                    :fuente='lfuente'>
                </pagineo>
            </div>            

            <!-- Tabla con la lista de los departamentos del pais -->
            <div class="col s12">
                <!-- deptos: {{deptos.deptos}} -->
                <table class="responsive-table striped hoverable z-depth-3" >
                    <thead style="font-size:13px">
                        <tr>
                            <th>DAS</th>
                            <th>DMS</th>                            
                            <th>TS</th>
                            <th>Cod.</th>
                            <th>Nombre</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="index>=lSS_ini && index <=lSS_fin-1" v-for="(ss,index) in filtrarSS">

                            <td style="padding: 5px 5px;">{{ss.codDAS}}</td>                
                            <td style="padding: 5px 5px;">{{ss.codDMS}}</td>
                            <td style="padding: 5px 5px;">{{ss.codTipoS}}</td>                
                            <td style="padding: 5px 5px;">{{ss.codigo}}</td>
                            <td style="padding: 5px 5px;">{{ss.nombre}}</td>
                            <td style="padding: 5px 5px;">
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped" data-position="top" data-tooltip="Eliminar Servicio de Salud"
                                    @click="eliminar(ss)">
                                        <i class="material-icons">delete</i>                                
                                </a>
                                
                            </td>
                        </tr>
                    </tbody>
                </table> <!-- Tabla con la lista de los departamentos del pais -->

                <!-- modal -->
                <div id="modal6" class="modal">
                    <div class="modal-content">
                        <!-- currDepto: {{lcodDepto}} proxcod: {{lcodigoM}}  -->
                        <span class="center">
                            Para ingresar un Nuevo Servicio de Salud, complete los datos con asterisco
                            <span style="font-weight: bold; color: #9d0006">rojo</span>. <br>
                            * AREA DE SALUD: {{l_currDASN}}; <br>
                            * DISTRITO: {{l_currDMSN}}; <br>
                            * TIPO DE SERVICIO: {{l_currTipoSN}}; <br>                            
                        </span><br>
                        <form @submit.prevent="">                
                            <div class="row">
                                <div class="col s4">
                                    <span>Cod. DAS</span>
                                    <input type="text" v-model="lcodDAS" max="2" disabled>
                                </div>
                                <div class="col s4">
                                    <span>Cod. DMS</span>
                                    <input type="text" v-model="lcodDMS" max="2" disabled>
                                </div>
                                <div class="col s4">
                                    <span>Cod. TS</span>
                                    <input type="text" v-model="lcodTS" max="2" disabled>
                                </div>
                                <div class="col s2">
                                    <span>Código</span>
                                    <input type="text" v-model="lcodigoSS" max="2" disabled>
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
        name: 'munis',
        data(){
            return {
                xss: [], correlativo: 0, lfuente: "SS",
                lcodDAS: "", lcodDMS: "", lcodTS: "", lcodigoSS: "", lnombre: "", 
                buscar: "", lmensaje: "Servicios de Salud",
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
                        
            this.cargandoSS();
        },
        components:{
            moment,
            pagineo,
        }, 
        computed: { 
            ...mapState(['das','dms','tipoS','ss']),
            lSS_ini(){ return store.state.SSlini; },
            lSS_fin(){ return store.state.SSlfin; },
            SS_pagina(){ return store.state.SSpagina; },                  
                    ssxtsydas(){

                        return this.xss.filter( (ss) => {

                            if ( ss.codTipoS.toUpperCase().includes(this.l_currTipoS.toUpperCase()) && 
                                 ss.codDAS.toUpperCase().includes(this.l_currDAS.toUpperCase()) &&
                                 ss.codDMS.toUpperCase().includes(this.l_currDMS.toUpperCase()) ) {
                                return ss
                            }
                        })
                    }, 
            filtrarSS: function() {

                /* Si no se ha seleccionado aún un Tipo de Servicio, entonces la 
                    búsqueda debe ser solo por el "token de busqueda" */
                let token=      this.buscar;
                return this.xss.filter( (ss, index) => {

                    /* F, F, F*/
                    if (this.l_currTipoS.length === 0 && 
                        this.l_currDAS.length === 0 && this.l_currDMS.length === 0){
                        if ( ss.nombre.toUpperCase().includes(token.toUpperCase()) ) {
                            return ss
                        } // if()
                    } else{
                        /* V, F, F*/
                        if (this.l_currTipoS.length > 0 && 
                            this.l_currDAS.length === 0 && this.l_currDMS.length === 0 ){  
                            if ( ss.nombre.toUpperCase().includes(token.toUpperCase()) && 
                                this.l_currTipoS===ss.codTipoS) {
                                return ss
                            } // if()
                        } // if con el DAS seleccionado y TS NO seleccionado
                        else {
                            /* F, V, F*/                            
                            if (this.l_currTipoS.length === 0 && 
                                this.l_currDAS.length > 0 && this.l_currDMS.length === 0 ){
                                if ( ss.nombre.toUpperCase().includes(token.toUpperCase()) && 
                                    this.l_currDAS===ss.codDAS) {
                                    return ss
                                } // if()
                            } // if con el DAS NO seleccionado y TS seleccionado
                            else {
                                /* V, V, F*/
                                if (this.l_currTipoS.length > 0 && 
                                    this.l_currDAS.length > 0 && this.l_currDMS.length === 0 ){
                                    if ( ss.nombre.toUpperCase().includes(token.toUpperCase()) && 
                                        this.l_currDAS===ss.codDAS && this.l_currTipoS===ss.codTipoS) {
                                        return ss
                                    } // if()
                                } // if con el DAS NO seleccionado y TS seleccionado
                                else {
                                    /* V, F, V */
                                    if (this.l_currTipoS.length > 0 && 
                                        this.l_currDAS.length === 0 && this.l_currDMS.length > 0 ){
                                        if ( ss.nombre.toUpperCase().includes(token.toUpperCase()) && 
                                            this.l_currDMS===ss.codDMS && this.l_currTipoS===ss.codTipoS) {
                                            return ss
                                        } // if()
                                    } // if con el DAS NO seleccionado y TS seleccionado
                                    else {
                                        /* F, F, V */
                                        if (this.l_currTipoS.length === 0 && 
                                            this.l_currDAS.length === 0 && this.l_currDMS.length > 0 ){
                                            if ( ss.nombre.toUpperCase().includes(token.toUpperCase()) && 
                                                this.l_currDMS===ss.codDMS) {
                                                return ss
                                            } // if()
                                        } // if con el DAS NO seleccionado y TS seleccionado
                                        else {
                                            /* F, V, V */
                                            if (this.l_currTipoS.length === 0 && 
                                                this.l_currDAS.length > 0 && this.l_currDMS.length > 0 ){
                                                if ( ss.nombre.toUpperCase().includes(token.toUpperCase()) && 
                                                    this.l_currDAS===ss.codDAS && this.l_currDMS===ss.codDMS) {
                                                    return ss
                                                } // if()
                                            } // if con el DAS NO seleccionado y TS seleccionado
                                            else {
                                                /* V, V, V */
                                                if (this.l_currTipoS.length > 0 && 
                                                    this.l_currDAS.length > 0 && this.l_currDMS.length > 0 ){
                                                    if ( ss.nombre.toUpperCase().includes(token.toUpperCase()) && 
                                                        this.l_currDMS===ss.codDMS && this.l_currDAS===ss.codDAS && this.l_currTipoS===ss.codTipoS) {
                                                        return ss
                                                    } // if()
                                                } // V, V, V
                                            } // F, V, V
                                        } // F, F, V
                                    } // V, F, V
                                } // V, V, F
                            } // F, V, F
                        } // V, F, F
                    } // F, F, F
                }) // return
            }, // filtar()
            /* Codigo, nombre, llave y cantidad de SS del TS concurrente */
            l_currTipoS(){  return this.tipoS.st_TipoSCurr.codigo;  },
            l_currTipoSN(){  return this.tipoS.st_TipoSCurr.nombre;  },
            l_currTipoSS(){  return this.tipoS.st_TipoSCurr.siglas;  },
            l_currTipoSK(){  return this.tipoS.st_TipoSCurr.llave;  },
            l_currTipoSCSS(){  return this.tipoS.st_TipoSCurr.cantss;  },
            /* Codigo, nombre, llave y cantidad de SS del DMS concurrente */
            l_currDMS(){  return this.dms.st_DMSCurr.codigo;  },
            l_currDMSN(){  return this.dms.st_DMSCurr.nombre;  },
            l_currDMSK(){  return this.dms.st_DMSCurr.llave;  },
            l_currDMSCSS(){  return this.dms.st_DMSCurr.cantss;  },            

            /* Codigo, nombre, llave y cantidad de SS del DAS concurrente */
            l_currDAS(){  return this.das.st_DASCurr.codigo;  },
            l_currDASN(){  return this.das.st_DASCurr.nombre;  },
            l_currDASK(){  return this.das.st_DASCurr.llave;  },
            l_currDASCSS(){  return this.das.st_DASCurr.cantss;  },

        },
        methods:{
            ...mapMutations(['agregarSS','eliminarSS','actualizarCTS','actualizarCSS_DMS','actualizarCSS_DAS']),
            /* ================================================================================================================================== */            
            getSS(losSS){

                this.xss = [];        
                for (let key in losSS){

                    this.xss.push({

                        llave: key,
                        codDAS: losSS[key].codDAS,
                        codDMS: losSS[key].codDMS,
                        codTipoS: losSS[key].codTipoS,
                        codigo: losSS[key].codigo, 
                        nombre: losSS[key].nombre, 
                    })
                } // for

                this.ss.ss      = this.xss;
                this.correlativo= this.xss.length;
            },                     
            cargandoSS() {

                var dummy= this.ss.st_dbSS
                            .on('value',snapshot=> this.getSS( snapshot.val() ) );
            },

            /* ============================================================================================================================ */
            nuevoSS(){

                let ltotalEsteDepto= this.xss.length;

                /* Obteniendo el código del Tipo de Servicio concurrente */
                this.lcodDAS =  this.l_currDAS;
                this.lcodDMS =  this.l_currDMS;
                this.lcodTS  =  this.l_currTipoS;

                let proxCodigo= ltotalEsteDepto + 1;
                proxCodigo= proxCodigo.toString().trim();
                if ( (ltotalEsteDepto + 1) <= 9){
                    proxCodigo= '0' + proxCodigo;
                }
                this.lcodigoSS= proxCodigo;
            },
            eliminar(elss){

                var confirma = confirm("Seguro de eliminar el Servicio de Salud "+elss.nombre+" ?");
                if (confirma === true){

                    this.$store.commit('eliminarSS',elss);

                    /* Decrementa el contador de municipios para el Tipo de Servicio concurrente */
                    this.$store.commit('actualizarCTS',{
                        cantss:  this.l_currTipoSCSS - 1,
                    });
                    /* Decrementa el contador de servicios de salud para el Distrito concurrente  () */
                    this.$store.commit('actualizarCSS_DMS',{
                        cantss:  l_currDMSCSS - 1,
                    });
                    /* Decrementa el contador de servicios de salud para el Distrito concurrente */
                    this.$store.commit('actualizarCSS_DAS',{
                        cantss:  this.l_currDASCSS - 1,
                    });
                } // if (confirma)
            }, // eliminar()
            agregar(){

                if (this.lcodDAS.trim().length > 0 && this.lcodDMS.trim().length > 0 &&  this.lcodTS.trim().length > 0 && this.lcodigoSS.trim().length >0 && this.lnombre.trim().length >0 ){

                    var confirma = confirm("Seguro de grabar el Servicio de Salud "+this.lnombre+ "? ");
                    if (confirma === true){

                        this.$store.commit('agregarSS',{
                            codDAS: this.das.st_DASCurr.codigo,
                            codDMS: this.dms.st_DMSCurr.codigo,
                            codTipoS: this.tipoS.st_TipoSCurr.codigo,
                            codigo: this.lcodigoSS,
                            nombre: this.lnombre,
                        });

                        /* Incrementa el contador de municipios para el Tipo de Servicio concurrente */
                        this.$store.commit('actualizarCTS',{
                            cantss:  this.l_currTipoSCSS + 1,
                        });

                        /* Incrementa el contador de servicios de salud para el Distrito concurrente ( this.l_currDMSCSS ) */
                        this.$store.commit('actualizarCSS_DMS',{
                            cantss:  this.l_currDMSCSS + 1,
                        });
                        /* Incrementa el contador de servicios de salud para el áREA concurrente */
                        this.$store.commit('actualizarCSS_DAS',{
                            cantss:  this.l_currDASCSS + 1,
                        });
                    } // if (confirma)

                    alert("Servicio de Salud "+ this.lnombre +" grabado con éxito");
                } // if (length >0)
                else {

                    let mensaje="";
                    if (this.lcodDAS.trim().length <= 0){
                        mensaje= mensaje + "\nDebe seleccionar una Área de Salud."
                    }
                    if (this.lcodDMS.trim().length <= 0){
                        mensaje= mensaje + "\nDebe seleccionar un Distrito de Servicio."
                    }
                    if (this.lcodTS.trim().length <= 0){
                        mensaje= mensaje + "\nDebe Seleccionar un Tipo de Servicio."
                    }
                    if (this.lnombre.trim().length <= 0){
                        mensaje= mensaje + "\nDebe ingresar un Nombre al Servicio de Salud."
                    }
                    alert(mensaje);
                }                

                this.limpiar()
            }, // agregar()
            limpiar(){

                this.lcodDAS    = "";
                this.lcodDMS    = "";
                this.lcodTS     = "";
                this.lcodigoSS  = "";
                this.lnombre    = "";
            }, // limpiar()
        } // methods
    }
</script>