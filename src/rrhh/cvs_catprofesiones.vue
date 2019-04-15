<!--
     cvs_catprofesiones.vue
     Marzo 7, 2019
     by Juan Carlos JOcop

-->
<template>
    <section>
          <div class="center">

               <a style="font-size:18px;">Profesionesss</a><br>
          </div>

        <!-- Card con la identificación del catálogo y opción para grabar -->
          <div class="row">
               <div class="col s12">                
                    <div class="card grey lighten-3 black-text z-depth-4">
                         <div class="card-tabs">
                              <ul class="tabs tabs-fixed-width">
                                   <li class="tab"><a href="#test1" class="active">Buscar Profesion</a></li>
                                   <li class="tab"><a href="#test2">Agregar Profesion</a></li>
                              </ul>
                         </div> <!-- card-tabs -->
                         <div>
                              <div id="test1">
                                   <div class="input-field">
                                        <input type="text" v-model="lbuscar" placeholder="">
                                        <label class="black-text">Escriba la Descripción	 de la Profesion que desea encontrar.</label>
                                   </div>
                              </div> <!-- text1 -->
                              <div id="test2">
                                   <div class="center">
                                        <div style="height: 18px;"></div>
                                        <span>Oprima este botón </span>
                                        <a class="btn btn-small btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger" data-position="top" data-tooltip="Nueva Profesion"  
                                             @click="nuevo()" href="#modal1">
                                             <i class="material-icons">edit</i>
                                        </a>                        
                                        <span>para gregar una Profesion</span>
                                        <div style="height: 18px;"></div>
                                   </div>
                              </div> <!-- text2 -->
                         </div> <!--  -->
                    </div> <!-- card grey ... -->
               </div> <!-- col s12 -->

               <!-- Muestra el pagineo (# página, # registro inicial, # registro final del grupo en la vista) -->
               <div class="col s12">
                    <pagineo 
                         :lista='lProfesiones' 
                         :listaf='filtrar'
                         :mensaje='lmensaje'
                         :liminf='lPr_ini' 
                         :limsup='lPr_fin'
                         :npagina='lPr_pagina'
                         :fuente='lfuente'>
                    </pagineo>
               </div>            

               <!-- Tabla con la lista de los Profesions del pais -->
               <div class="col s12">
                    <table class="responsive-table striped hoverable z-depth-3">
                         <thead  style="font-size:13px">
                         <tr>
                              <th>Código</th>
                              <th>Descripción</th>
                              <th>ID</th>                            
                         </tr>
                         </thead>
                         <tbody>
                         <tr v-if="index>=lPr_ini && index <=lPr_fin-1" v-for="(Profesion,index) in filtrar"  @click="resaltarProfesion(Profesion)">
                              <td style="padding: 1px 5px;"> {{Profesion.codigo}} </td>
                              <td style="padding: 1px 5px;"> {{Profesion.descripcion}} </td>
                              <td style="padding: 1px 5px;"> {{Profesion.id}} </td>
                              <td style="padding: 5px 5px;">
                                   <a class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped" data-position="top" data-tooltip="Eliminar Profesion"
                                        @click="eliminar(Profesion)">
                                             <i class="material-icons">delete</i>                                
                                   </a>
                              </td>
                         </tr>
                         </tbody>
                    </table> <!-- Tabla con la lista de los Profesions del pais -->

                    <!-- modal -->
                    <div id="modal1" class="modal">
                         <div class="modal-content">
                         <span class="center">Para ingresar Nuevo Profesion, complete los datos con asterisco <span style="font-weight: bold; color: #9d0006">rojo</span>.</span><br>
                         <form @submit.prevent="">                
                              <div class="row">
                                   <div class="col s2">
                                        <span>Código</span>
                                        <input type="text" v-model="lcodigo" max="2" disabled>                            
                                   </div>
                                   <div class="col s10">
                                        <span><span style="font-size:17px; font-weight: bold; color: #9d0006">*</span>descripcion</span>
                                        <input type="text" v-model="ldescripcion">
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