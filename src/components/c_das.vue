<!--*
 *      c_das.vue
 *          Lista de direcciones de áreas de salud
 */
======================================================================================================== -->
<template>
    <section>
        <div class="center">
            <a v-if="l_currDepto.trim().length > 0">
                <span style="font-size:18px;">DAS en el Departamento de <span style="font-size:16px; font-weight:bold; font-style:italic">{{l_currDeptoN}}</span></span>
            </a>
            <a v-else>
                <span style="font-size:18px;">Direcciones de Area de Salud del País</span>
            </a>
        </div>

        <!-- Card con la identificación del catálogo y opción para grabar -->
        <div class="row">
            <div class="col s12">                
                <div class="card grey lighten-3 black-text z-depth-4">
                    <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab"><a href="#test5" class="active">Buscar Área de Salud</a></li>
                            <li class="tab"><a href="#test6">Agregar Área de Salud</a></li>
                        </ul>
                    </div>
                    <div class="">
                        <div id="test5">
                            <div class="input-field">
                                <input type="text" v-model="buscar" placeholder="">
                                <label class="black-text">Escriba el nombre de la Área de Salud que desea encontrar.</label>
                            </div>                            
                        </div> <!-- text4 -->
                        <div id="test6">
                            <div class="center">
                                <div style="height: 18px;"></div>
                                <span>Oprima este botón </span>
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger" data-position="top" data-tooltip="Nueva Área de Salud"  
                                    @click="nuevoDAS()" href="#modal3">
                                    <i class="material-icons">edit</i>
                                </a>                        
                                <span>para gregar una Área de Salud</span>
                                <div style="height: 18px;"></div>
                            </div>
                        </div> <!-- text5 -->
                    </div> <!-- card-content -->
                </div>
            </div>

            <div class="col s12">
                <!-- dasxDepto -->
                <pagineo 
                    :lista='filtrarDAS'
                    :listaf= 'dasxDepto'
                    :mensaje= 'lmensaje'
                    :liminf='ldas_ini' 
                    :limsup='ldas_fin'
                    :npagina='das_pagina'
                    :fuente='lfuente'>
                </pagineo>
            </div>            

            <!-- Tabla con la lista de los departamentos del pais -->
            <div class="col s12">
                <!-- deptos: {{deptos.deptos}} -->
                <table class="responsive-table striped hoverable z-depth-3">
                    <thead  style="font-size:13px">
                        <tr>
                            <th>Cod.</th>
                            <th>Nombre</th>
                            <th>Cod. SIGSA</th>
                            <th>#DMS</th>                            
                            <th>#SS</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <!-- @click="activarDAS(das)" -->
                    <tbody>
                        <tr v-if="index>=ldas_ini && index <=ldas_fin-1" v-for="(das,index) in filtrarDAS" @click="activarDAS(das)">
                
                            <td style="padding: 5px 5px;" :bgcolor="das.color"> {{das.codigo}}</td>
                            <td style="padding: 5px 5px;" :bgcolor="das.color"> {{das.nombre}}</td>
                            <td style="padding: 5px 5px;" :bgcolor="das.color"> {{das.codsigsa}} </td>
                            <td style="padding: 5px 5px;" :bgcolor="das.color"> {{das.cantdms}} </td>
                            <td style="padding: 5px 5px;" :bgcolor="das.color"> {{das.cantss}} </td>

                            <td style="padding: 5px 5px;" :bgcolor="das.color">
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped" data-position="top" data-tooltip="Eliminar Área de Salud"
                                    @click="eliminar(das)">
                                        <i class="material-icons">delete</i>                                
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table> <!-- Tabla con la lista de los departamentos del pais -->

                <!-- modal -->
                <div id="modal3" class="modal">
                    <div class="modal-content">
                        <!-- currDepto: {{lcodDepto}} proxcod: {{lcodigoM}}  -->
                        <span class="center">Para ingresar una nueva Área de Salud al Departamento: {{l_currDeptoN}}, complete los datos con asterisco <span style="font-weight: bold; color: #9d0006">rojo</span>. </span><br>
                        <form @submit.prevent="">                
                            <div class="row">
                                <div class="col s1">
                                    <span>Depto</span>
                                    <input type="text" v-model="lcodDepto" max="2" disabled>
                                </div>
                                <div class="col s1">
                                    <span>Código</span>
                                    <input type="text" v-model="lcodigoDAS" max="2" disabled>
                                </div>
                                <div class="col s6">
                                    <span><span style="font-size:17px; font-weight: bold; color: #9d0006">*</span>Nombre</span>
                                    <input type="text" v-model="lnombre">
                                </div>
                                <div class="col s4">
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

    import pagineo                  from './culturaGPagineo.vue'

    import {store}                  from './../store/store'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: 'munis',
        data(){
            return {
                xdas: [], correlativo: 0, lfuente: "DAS",
                lcodDepto: "", lcodigoDAS: "", lnombre: "", 
                lcantdms: 0, lcantss:0, lcodsigsa: "",
                buscar: "",
                lini: 0, lfin: 5, lmensaje: "DAS",
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
                        
            this.cargandoDAS();
        },
        components:{
            moment,
            pagineo,
        },
        computed: { 
            ...mapState(['deptos','das']),
            ldas_ini(){  return store.state.DASlini;  },
            ldas_fin(){  return store.state.DASlfin;  },
            das_pagina(){  return store.state.DASpagina;  },                  
            dasxDepto(){
                return this.xdas.filter( (das) => {

                    if ( das.codDepto.toUpperCase().includes(this.l_currDepto.toUpperCase() ) ){
                        return das
                    }
                })
            }, 
            filtrarDAS: function() {

                let token = this.buscar;
                return this.xdas.filter( (das, index) => {         

                    if (this.l_currDepto.length === 0){
                        if (das.nombre.toUpperCase().includes(token.toUpperCase()) ) {
                            return das
                        } // if()
                    } else {
                        if (das.nombre.toUpperCase().includes(token.toUpperCase()) && this.l_currDepto===das.codDepto ) {
                            return das
                        } // if()
                    }
                }) // return
            }, // filtar()
            l_currDepto(){  return this.deptos.st_DeptoCurr.codigo; },
            l_currDeptoN(){ return this.deptos.st_DeptoCurr.nombre; },
            l_currDeptoK(){ return this.deptos.st_DeptoCurr.llave;  },
            l_currDeptoCDAS(){ return this.deptos.st_DeptoCurr.cantdas; },
        },
        methods:{
            ...mapMutations(['agregar','eliminar','actualizarCDMS']),
                posicion(valor){
                    var ldiv1 = (valor) / 2;
                    var ldiv2 = Math.trunc(ldiv1);
                    let resultado = "impar";
                    if (ldiv1 === ldiv2){
                        resultado = "par";
                    }
                    return resultado;
                },            
            activarDAS(currDAS){

                /* Refresca todos los registros con el color default: black  */
                var i=0;
                for (i = 0; i < this.dasxDepto.length; i++) { 

                    this.dasxDepto[i].color="#FFFFFF";
                    if (this.posicion(i+1) === "impar") {
                        this.dasxDepto[i].color="#F2F2F2";
                    }
                    this.dasxDepto[i].tamano="3";
                }
                /* Cambia el color del registro concurrente (FFDD00)*/
                currDAS.color = "#0DA8E5"; // verde: 21960C; celeste: 13C3FF; verde claro: 12FF88
                currDAS.tamano = "3"; 

                this.das.st_DASCurr.codigo    = currDAS.codigo;
                this.das.st_DASCurr.nombre    = currDAS.nombre;
                this.das.st_DASCurr.llave     = currDAS.llave;
                this.das.st_DASCurr.cantdms   = currDAS.cantdms;
                this.das.st_DASCurr.cantss    = currDAS.cantss;

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
            /* ================================================================================================================================== */            
            getDAS(losDAS){

                this.xdas = [];        
                for (let key in losDAS){

                    this.xdas.push({

                        llave: key,
                        codDepto: losDAS[key].codDepto,
                        codigo: losDAS[key].codigo, 
                        nombre: losDAS[key].nombre, 
                        codsigsa: losDAS[key].codsigsa,
                        cantdms: losDAS[key].cantdms,
                        cantss: losDAS[key].cantss,
                        color: "",
                        tamano: "3",                        
                    })
                } // for

                this.das.das= this.xdas;
                this.correlativo= this.xdas.length;
            },                     
            cargandoDAS() {

                var dummy= this.das.st_dbDAS
                            .on('value',snapshot=> this.getDAS( snapshot.val() ) );
            },

            /* ============================================================================================================================ */
            /* OJO: VER COMO ES LA CORRELATIVIDAD DE LOS DAS */
            nuevoDAS(){

                let ltotalEsteDepto= this.xdas.length;

                /* Obteniendo el código del departamento concurrente */
                this.lcodDepto=  this.l_currDepto;

                let proxCodigo= ltotalEsteDepto + 1;
                proxCodigo= proxCodigo.toString().trim();
                if ( (ltotalEsteDepto + 1) <= 9){
                    proxCodigo= '0' + proxCodigo;
                }
                this.lcodigoDAS= proxCodigo;
            },
            eliminar(eldas){

                if (eldas.cantdms > 0){

                    alert("No es posible eliminar el Área de Salud "+eldas.nombre+
                           ". \nTiene relación con "+eldas.cantdms+" distritos");
                } else{
                    
                    var confirma = confirm("Seguro de eliminar el área de salud "+eldas.nombre+" ?");
                    if (confirma === true){

                        this.$store.commit('eliminar',eldas);

                        /* Decrementa el contador de municipios para el departamento concurrente */
                        this.$store.commit('actualizarCDDepto',{
                            cantdas:  this.l_currDeptoCDAS - 1,
                        })                        
                    } // * if (confirma)
                } // * if ( > 0)
            },            
            agregar(){

                if (this.lcodDepto.trim().length > 0 && this.lcodigoDAS.trim().length >0 && this.lnombre.trim().length >0 ){

                    var confirma = confirm("Seguro de grabar el Área de Salud "+this.lnombre+ "? ");
                    if (confirma === true){

                        this.$store.commit('agregar',{
                            codDepto: this.deptos.st_DeptoCurr.codigo,
                            codigo: this.lcodigoDAS,
                            nombre: this.lnombre,
                            cantdms: this.lcantdms,
                            cantss: this.lcantss,
                            codsigsa: this.lcodsigsa,
                        });

                        /* OJO: Verificar si con este update no se borra el update de cantmunis. Hacer backup antes en FIREBASE */
                        /* Incrementa el contador de municipios para el departamento concurrente */
                        this.$store.commit('actualizarCDDepto',{
                            cantdas:  this.l_currDeptoCDAS + 1,
                        })                        

                        alert("Área de Salud "+ this.lnombre +" grabado con éxito");                                    
                    } // * if (confirma)
                } // * if (length >0)
                else {
                    let mensaje="";
                    if (this.lcodDepto.trim().length <= 0){
                        mensaje="Debe Seleccionar un Departamento."
                    }
                    if (this.lnombre.trim().length <= 0){
                        mensaje= mensaje + "\nDebe ingresar un Nombre al Área de Salud."
                    }
                    alert(mensaje);
                }                

                this.limpiar()
            },
            limpiar(){

                this.lcodigoDAS= "";
                this.lnombre= "";
                this.lcantdms= 0;
                this.lcodsigsa= "";                
            },
        } // * methods
    }
</script>