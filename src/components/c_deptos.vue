<!--*
 *      c_deptos.vue
 *          Lista de Departamentos
 */
======================================================================================================== -->
<template>
    <section>
        <div class="center">

            <a style="font-size:18px;">Departamentos del País </a><br>
        </div>

        <!-- Card con la identificación del catálogo y opción para grabar -->
        <div class="row">
            <div class="col s12">                
                <div class="card grey lighten-3 black-text z-depth-4">
                    <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab"><a href="#test1" class="active">Buscar Departamento</a></li>
                            <li class="tab"><a href="#test2">Agregar Departamento</a></li>
                        </ul>
                    </div>
                    <div class="">
                        <div id="test1">
                            <div class="input-field">
                                <input type="text" v-model="buscar" placeholder="">
                                <label class="black-text">Escriba el nombre del departamento que desea encontrar.</label>
                            </div>
                        </div> <!-- text4 -->
                        <div id="test2">
                            <div class="center">
                                <div style="height: 18px;"></div>
                                <span>Oprima este botón </span>
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger" data-position="top" data-tooltip="Nuevo Departamento"  
                                    @click="nuevo()" href="#modal1">
                                    <i class="material-icons">edit</i>
                                </a>                        
                                <span>para gregar un Departamento</span>
                                <div style="height: 18px;"></div>
                            </div>
                        </div> <!-- text5 -->
                    </div> <!-- card-content -->
                </div>
            </div>

            <div class="col s12">
                <pagineo 
                    :lista='xdeptos' 
                    :listaf='filtrar'
                    :mensaje='lmensaje'
                    :liminf='ld_ini' 
                    :limsup='ld_fin'
                    :npagina='d_pagina'
                    :fuente='lfuente'>
                </pagineo>
            </div>            

            <!-- Tabla con la lista de los departamentos del pais -->
            <div class="col s12">
                <table id="table_deptos" class="responsive-table striped hoverable z-depth-3">
                    <thead  style="font-size:13px">
                        <tr>
                            <th>Cod.</th>
                            <th>Nombre</th>
                            <th># Municipios</th>
                            <th>#DAS</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="tr_deptos" v-if="index>=ld_ini && index <=ld_fin-1" v-for="(depto,index) in filtrar"  @click="activarDepto(depto)">

                            <td style="padding: 1px 5px;" :bgcolor="depto.color"> {{depto.codigo}} </td>
                            <td style="padding: 1px 5px;" :bgcolor="depto.color"> {{depto.nombre}} </td>
                            <td style="padding: 1px 5px;" :bgcolor="depto.color"> {{depto.cantmunis}} </td>
                            <td style="padding: 1px 5px;" :bgcolor="depto.color"> {{depto.cantdas}} </td>
                            <td style="padding: 5px 5px;" :bgcolor="depto.color">
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped" data-position="top" data-tooltip="Eliminar Depto"
                                    @click="eliminar(depto)">
                                        <i class="material-icons">delete</i>                                
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table> <!-- Tabla con la lista de los departamentos del pais -->

                <!-- modal -->
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <span class="center">Para ingresar Nuevo Departamento, complete los datos con asterisco <span style="font-weight: bold; color: #9d0006">rojo</span>.</span><br>
                        <form @submit.prevent="">                
                            <div class="row">
                                <div class="col s2">
                                    <span>Código</span>
                                    <input type="text" v-model="lcodigo" max="2" disabled>                            
                                </div>
                                <div class="col s10">
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

    import pagineo                  from './culturaGPagineo.vue'
    
    import {store}                  from './../store/store'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: 'deptos',
        data(){
            return {
                xdeptos: [], correlativo: 0, lfuente: "D",
                lcodigo: "", lnombre: "", lmensaje: "Departamentos",
                lcantmunis: 0, lcantdas: 0, buscar: "",
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
            var instances = M.Tabs.init(elem, {});  // swipeable:true
                        
            this.cargandoDeptos();
        },
        components:{
            moment,
            pagineo,            
        },
        computed: { 
            ...mapState(['deptos']),
            ld_ini(){  return store.state.Dlini;  },
            ld_fin(){  return store.state.Dlfin;  },
            d_pagina(){  return store.state.Dpagina;  },      
            filtrar: function() {

                let token=      this.buscar;
                return this.xdeptos.filter( (depto,index) => {                    
                    if (depto.nombre.toUpperCase().includes(token.toUpperCase()) ) {
                        return depto
                    } // if()
                }) // return
            }, // filtar()
            cFondo(i){
                return store.getters.posClick(i);
            },
        },
        methods:{
            ...mapMutations(['agregarDepto','eliminarDepto']), //,'filtrarDistritos'
                posicion(valor){
                    var ldiv1 = (valor) / 2;
                    var ldiv2 = Math.trunc(ldiv1);
                    let resultado = "impar";
                    if (ldiv1 === ldiv2){
                        resultado = "par";
                    }
                    return resultado;
                },
            activarDepto(currDepto){

                /* Refresca todos los registros con el color default: black  */
                var i=0;
                for (i = 0; i < this.xdeptos.length; i++) {
                    
                    this.xdeptos[i].color="#FFFFFF";
                    if (this.posicion(i+1) === "impar") {
                        this.xdeptos[i].color="#F2F2F2";
                    }
                    this.xdeptos[i].tamano="3";
                }
                /* Cambia el color del registro concurrente (#FFDD00)*/
                currDepto.color = "#0DA8E5"; // verde: 21960C; celeste: 13C3FF; verde claro: 12FF88; verde obs: 0EBF66, azul obscuro: 0932E5
                currDepto.tamano = "3"; 

                this.deptos.st_DeptoCurr.codigo    = currDepto.codigo;
                this.deptos.st_DeptoCurr.nombre    = currDepto.nombre;
                this.deptos.st_DeptoCurr.llave     = currDepto.llave;
                this.deptos.st_DeptoCurr.cantmunis = currDepto.cantmunis;
                this.deptos.st_DeptoCurr.cantdas   = currDepto.cantdas;

                /* Incializando contadores para los municipios del Departamento Concurrente */
                store.state.Mlini   = 0;
                store.state.Mlfin   = 5;
                store.state.Mpagina = 1;
                store.state.MesLimiteInf= true;
                store.state.MesLimiteSup= false;

                /* Incializando contadores para las áreas de salud del Departamento Concurrente */
                store.state.DASlini   = 0;
                store.state.DASlfin   = 5;
                store.state.DASpagina = 1;
                store.state.DASesLimiteInf= true;
                store.state.DASesLimiteSup= false;
            },
            /* ================================================================================================================================== */            
            getDeptos(losDeptos){

                this.xdeptos = [];        
                for (let key in losDeptos){

                    this.xdeptos.push({

                        llave: key,                                             // 1
                        codigo: losDeptos[key].codigo, 
                        nombre: losDeptos[key].nombre, 
                        cantmunis: losDeptos[key].cantmunis,
                        cantdas: losDeptos[key].cantdas,
                        color: "",
                        tamano: "3",
                    })
                } // for

                this.deptos.deptos= this.xdeptos;
                this.correlativo=   this.xdeptos.length;
            },                     
            cargandoDeptos() {

                var dummy= this.deptos.st_dbDeptos
                            .on('value',snapshot=> this.getDeptos( snapshot.val() ) );
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
            eliminar(eldepto){

                if (eldepto.cantmunis > 0 || eldepto.cantdas >0 ){

                    alert("No es posible eliminar el Departamento "+eldepto.nombre+
                           ". \nTiene relación con "+eldepto.cantmunis+" municipios"+
                           ". \ny con "+eldepto.cantdas+" áreas de dalud");
                } else{
                    var confirma = confirm("Seguro de eliminar el departamento de "+eldepto.nombre+" ?");
                    if (confirma === true){
                    
                        this.$store.commit('eliminarDepto',eldepto);
                    }// * if(confirma)
                } // * if > 0
            },            
            agregar(){
                if (this.lcodigo.trim().length >0 && this.lnombre.trim().length >0 ){

                    var confirma = confirm("Seguro de grabar el departamento "+this.lnombre+ "? ");
                    if (confirma === true){
                
                        this.$store.commit('agregarDepto',{
                            codigo: this.lcodigo,
                            nombre: this.lnombre,
                            cantmunis: this.lcantmunis,
                            cantdas: this.lcantdas,
                        })
                        this.limpiar()

                        alert("Departamento "+ this.lnombre +" grabado con éxito");
                    }// * confirma()
                }// * if (length)
                else {

                    alert("Debe ingresar un código y nombre para grabar.");
                }                
            },
            limpiar(){

                this.lcodigo= "";
                this.lnombre= "";
                this.lcantmunis= 0;
                this.lcantdas= 0;
            },
        } // * methods
    }
</script>