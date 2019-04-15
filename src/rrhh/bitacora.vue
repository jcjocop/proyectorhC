<template>
     <div class="container row">

          <div class="col s4">
               <!-- Help-->
               <button @click="ayudaToast()" 
                         class="btn waves-effect btn-small btn-floating blue lighten-1 z-depth-4 pulse tooltipped"
                         data-position="top" 
                         data-tooltip="Ayuda">               
                         <!-- <i class="material-icons">message</i> -->
                         <a style="font-size:22px; color:white"><fontawesomeicon icon="question" />
                         </a>
               </button>
          </div>

          <div class="col s4 center">
               <h5>Bitácora</h5>
          </div>
          <div class="col s4"></div>
          <!-- Búsquedas -->
          <div class="brand-logo teal lighten-5 col s12 hoverable">

               <!-- Cabecera para buscar información-->
               <div class="input-field col s0.5">
                    <div style="height: 11px;"></div>
                    <a class="btn waves-effect waves-light btn-small btn-floating blue lighten-1 z-depth-4 tooltipped" 
                         data-position="top" 
                         data-tooltip="Borrar textos de búsqueda" 
                         @click="limpiarBusquedas()">
                         <i class="material-icons">delete_sweep</i>
                    </a>
                    <div style="height: 11px;"></div>
               </div>
               <!-- Textos de busquedas -->
               <div class="input-field col s3">
                    <label>Búqueda por usuario</label>
                    <input class="input" type="text" v-model="busqueda">
               </div>
               <div class="input-field col s2.5">
                    <input class="input" type="text"  v-model="busquedaF">
                    <label>Búsqueda por fecha</label>
               </div> 
               <div class="input-field col s3">
                    <input class="input" type="text"  v-model="busquedaA">
                    <label>Búsqueda por acción</label>
               </div> 
          </div>
          <!-- Increment & Decrement; Next & Previous Page -->   
          <div class="brand-logo teal lighten-5 col s12">
               <div class="col s3">
                    <button class="btn btn-small waves-effect waves-light blue lighten-1 z-depth-5 tooltipped" 
                              data-position="top" 
                              data-tooltip="Incrementar la lista en 5, 10 o 20 filas."    
                              style="padding: 1 1rem" 
                              @click="incremento()"><i class="material-icons">expand_more</i></button>
                    <button class="btn btn-small waves-effect waves-light blue lighten-1 z-depth-5 tooltipped" 
                              data-position="bottom" 
                              data-tooltip="Decrementar la lista en 5, 10 o 20 filas." 
                              style="padding: 1 1rem" 
                              @click="decremento()"><i class="material-icons">expand_less</i></button>
                    <a      class="btn btn-small waves-effect btn-floating blue lighten-1 z-depth-4 tooltipped" 
                         :class="pagina>1 ? 'pulse': ''" 
                         data-position="top" 
                         data-tooltip="Página anterior" 
                         @click="anterior()">
                         <i class="material-icons">navigate_before</i></a>
                    <a class="btn waves-effect waves-light btn-small btn-floating blue lighten-1 z-depth-4 tooltipped" 
                         :class="pagina===1 ? 'pulse': ''" 
                         data-position="top" 
                         data-tooltip="Página siguiente" 
                         @click="siguiente()">
                         <i class="material-icons">navigate_next</i></a>
               </div>
               <div class="col s3">
                    <span>
                         Página <b>{{pagina}}: [ {{lini+1}} - {{lfin}}</b> ]
                    </span>
               </div>
               <!--                               Total de participantes filtrados <b>{{filtrarlaBitacora.length}}</b> ]
 -->
               <div class="col s6">
                    <span>[ Total registros <b>{{$store.state.st_bitacora.length}} </b>; Total registros filtrados <b>{{filtrarlaBitacora.length}}</b> ]
                    </span>
               </div>
          </div> 

          <!-- bitácora ? <span>{{$store.state.st_bitacora}}</span> -->
          <!-- busqueda ? {{busqueda}}; busquedaF ? {{busquedaF}}; busquedaA ? {{busquedaA}} -->
          <!-- Lista de Participantes-->
          <div class="row">
               <div class="col s12">
                    <div class="card horizontal">
                         <!-- Tabla -->
                         <table class="responsive-table Striped hoverable">
                              <thead>
                                   <tr>
                                        <!-- <th style="padding: 5px 5px;" width="100"><app-icon img="notifications_active"></app-icon></th> -->
                                        <th>#</th>
                                        <th>Usuario</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Estuvo en</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   <tr v-if="index>=lini && index <=lfin-1" v-for="(bita, index) in filtrarlaBitacora" @click="senalarRegistro(bita)">
                                        <td style="padding: 5px 5px;" :bgcolor="bita.color">{{index+1}}</td>
                                        <td style="padding: 5px 5px;" :bgcolor="bita.color">{{bita.usuario}}</td>
                                        <td style="padding: 5px 5px;" :bgcolor="bita.color">{{bita.fecha}}</td>                                             
                                        <td style="padding: 5px 5px;" :bgcolor="bita.color">{{bita.hora}}</td>
                                        <td style="padding: 5px 5px;" :bgcolor="bita.color">{{bita.accion}}</td>
                                        <td style="padding: 5px 5px;" :bgcolor="bita.color">{{bita.color}}</td>
                                   </tr> 
                              </tbody>
                         </table> <!--//* table -->
                    </div> <!--//* card-horizontal -->
               </div> <!--//* col s12 -->
          </div> <!--//* class="row" -->
     </div> <!--//* class="row" -->
</template>

<script src='./bitacora.js'></script>

