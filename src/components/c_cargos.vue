<!--*
 *      c_cargos.vue
 *          Lista de Cargos
 */
======================================================================================================== -->
<template>
    <section>
        <div class="center">
            <!-- {{filtrar}} -->
            <!-- {{lCG_ini}}, {{lCG_fin}} -->
            <a style="font-size:18px;">Cargos</a><br>
        </div>

        <!-- Card con la identificación del catálogo y opción para grabar -->
        <div class="row">
            <div class="col s12">                
                <div class="card grey lighten-3 black-text z-depth-4">
                    <div class="card-tabs">
                        <ul class="tabs tabs-fixed-width">
                            <li class="tab"><a href="#test1" class="active">Buscar Cargo</a></li>
                            <li class="tab"><a href="#test2">Agregar Cargo</a></li>
                        </ul>
                    </div>
                    <div class="">
                        <div id="test1">
                            <div class="input-field">
                                <input type="text" v-model="buscar" placeholder="">
                                <label class="black-text">Escriba el nombre del Cargo que desea encontrar.</label>
                            </div>
                        </div> <!-- text4 -->
                        <div id="test2">
                            <div class="center">
                                <div style="height: 18px;"></div>
                                <span>Oprima este botón </span>
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger" data-position="top" data-tooltip="Nuevo Cargo"  
                                    @click="nuevo()" href="#modal1">
                                    <i class="material-icons">edit</i>
                                </a>                        
                                <span>para gregar un Cargo</span>
                                <div style="height: 18px;"></div>
                            </div>
                        </div> <!-- text5 -->
                    </div> <!-- card-content -->
                </div>
            </div>

            <div class="col s12">
                <pagineo 
                    :lista='xcargos' 
                    :listaf='filtrar'
                    :mensaje='lmensaje'
                    :liminf='lCG_ini' 
                    :limsup='lCG_fin'
                    :npagina='CG_pagina'
                    :fuente='lfuente'>
                </pagineo>
            </div>            

            <!-- Tabla con la lista de los Cargos del pais -->
            <div class="col s12">
                <table class="responsive-table striped hoverable z-depth-3">
                    <thead  style="font-size:13px">
                        <tr>
                            <th>Código</th>
                            <th>Descripción</th>
                            <th># Resp.</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="index>=lCG_ini && index <=lCG_fin-1" v-for="(cargo,index) in filtrar"  @click="activarcargo(cargo)">
                            <td style="padding: 1px 5px;" :bgcolor="cargo.color"> {{cargo.codigo}} </td>
                            <td style="padding: 1px 5px;" :bgcolor="cargo.color"> {{cargo.nombre}} </td>
                            <td style="padding: 1px 5px;" :bgcolor="cargo.color"> {{cargo.cantrespons}} </td>
                            <td style="padding: 5px 5px;" :bgcolor="cargo.color">
                                <a class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped" data-position="top" data-tooltip="Eliminar cargo"
                                    @click="eliminar(cargo)">
                                        <i class="material-icons">delete</i>                                
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table> <!-- Tabla con la lista de los Cargos del pais -->

                <!-- modal -->
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <span class="center">Para ingresar Nuevo Cargo, complete los datos con asterisco <span style="font-weight: bold; color: #9d0006">rojo</span>.</span><br>
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
                                    <button class="modal-close waves-effect waves-light btn-floating darken-5 z-depth-3 red btn tooltipped" data-position="right" data-tooltip="Cancelar"> 
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
        name: 'cargos',
        data(){
            return {
                xcargos: [], correlativo: 0, lfuente: "CG",
                lcodigo: "", lnombre: "", lmensaje: "Cargos",
                lcantrespons: 0, buscar: "",
            }
        },
        mounted(){

            var elems = document.querySelectorAll('.tooltipped');
            var instances = M.Tooltip.init(elems, {});
            
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {dismissible: false});

            var elem = document.querySelectorAll('.tabs'); 
            var instances = M.Tabs.init(elem, {});  // swipeable:true
                        
            this.cargandocargos();
        },
        components:{
            moment,
            pagineo,            
        },
        computed: { 
            ...mapState(['cargos']),  // ,'responsables'
            lCG_ini(){  return store.state.CGlini;  },
            lCG_fin(){  return store.state.CGlfin;  },
            CG_pagina(){  return store.state.CGpagina;  },      
            filtrar: function() {

                let token=      this.buscar;
                return this.xcargos.filter( (cargo,index) => {                    
                    if (cargo.nombre.toUpperCase().includes(token.toUpperCase()) ) {
                        return cargo
                    } // if()
                }) // return
            }, // filtar()
        },
        methods:{
            ...mapMutations(['agregarcargo','eliminarcargo']),
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
            activarcargo(currcargo){

                /* Refresca todos los registros con el color default: black  */
                var i=0;
                for (i = 0; i < this.xcargos.length; i++) { 

                    this.xcargos[i].color="#FFFFFF";
                    if (this.posicion(i+1) === "impar") {
                        this.xcargos[i].color="#F2F2F2";
                    }
                    this.xcargos[i].tamano="3";
                }
                /* Cambia el color del registro concurrente */
                currcargo.color = "#0DA8E5"; // verde: 21960C; celeste: 13C3FF; verde claro: 12FF88; verde obs: 0EBF66, azul obscuro: 0932E5
                currcargo.tamano = "3"; 

                this.cargos.st_cargoCurr.codigo    = currcargo.codigo;
                this.cargos.st_cargoCurr.nombre    = currcargo.nombre;
                this.cargos.st_cargoCurr.llave     = currcargo.llave;
                this.cargos.st_cargoCurr.cantrespons = currcargo.cantrespons;
            },
            /* ================================================================================================================================== */            
                getcargos(loscargos){

                    this.xcargos = [];        
                    for (let key in loscargos){

                        this.xcargos.push({

                            llave: key,                                             // 1
                            codigo: loscargos[key].codigo, 
                            nombre: loscargos[key].nombre, 
                            cantrespons: loscargos[key].cantrespons,
                            color: loscargos[key].color,
                            tamano: loscargos[key].tamano,
                            color: "",
                            tamano: "3",
                        })
                    } // for

                    this.cargos.cargos= this.xcargos;
                    this.correlativo=   this.xcargos.length;
                },                     
            cargandocargos() {

                var dummy= this.cargos.st_dbCargos
                            .on('value',snapshot=> this.getcargos( snapshot.val() ) );
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
            eliminar(elcargo){

                if (elcargo.cantrespons > 0 ){

                    alert("No es posible eliminar el Cargo "+elcargo.nombre+
                           ". \nTiene relación con "+elcargo.cantrespons+" responsables");
                } else{
                    var confirma = confirm("Seguro de eliminar el Cargo de "+elcargo.nombre+" ?");
                    if (confirma === true){
                    
                        this.$store.commit('eliminarcargo',elcargo);
                    }// if(confirma)
                } // if > 0
            },            
            agregar(){

                if (this.lcodigo.trim().length >0 && this.lnombre.trim().length >0 ){

                    var confirma = confirm("Seguro de grabar el Cargo "+this.lnombre+ "? ");
                    if (confirma === true){
                
                        this.$store.commit('agregarcargo',{
                            codigo: this.lcodigo,
                            nombre: this.lnombre,
                            cantrespons: this.lcantrespons,
                            color: "",
                            tamano: "3",
                        })
                        this.limpiar()

                        alert("Cargo "+ this.lnombre +" grabado con éxito");
                    }// confirma()
                }// if (length)
                else {

                    alert("Debe ingresar un código y nombre para grabar.");
                }                
            },
            limpiar(){

                this.lcodigo= "";
                this.lnombre= "";
                this.lcantrespons= 0;
            },
        } // methods
    }
</script>