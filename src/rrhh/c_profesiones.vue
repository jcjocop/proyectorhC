<!--
     //* c_profesiones.vue
     //* Marzo 7, 2019
     //* by Juan Carlos JOcop

-->
<template>
    <section>
         <div class="container">

               <div class="row">     

                    <!-- modal -->
                    <div id="modal1" class="modal">
                         <div class="modal-content">
                              <span class="center">Para ingresar Nueva Profesión, complete los datos con asterisco 
                                   <span style="font-weight: bold; color: #9d0006">rojo</span>.
                              </span><br>
                              <form @submit.prevent="">                
                                   <div class="row">
                                        <div class="col s2">
                                             <span>ID</span>
                                             <input type="text" v-model="id" max="5">
                                        </div>
                                        <div class="col s10">
                                             <span><span style="font-size:17px; font-weight: bold; color: #9d0006">*</span>Descripción</span>
                                             <input type="text" v-model="descripcion">
                                        </div>
                                        <div class="col s12 center">
                                             <p></p>
                                             <button class="modal-close waves-effect waves-light btn-floating darken-5 z-depth-3 green btn tooltipped" 
                                                  data-position="top" 
                                                  data-tooltip="Grabar Profesión"
                                                  @click="agregarProfesion([{'laID':id,'laDescripcion':descripcion}])"> 
                                                  <i class="material-icons">check</i>
                                             </button>
                                             <button class="modal-close waves-effect waves-light btn-floating darken-5 z-depth-3 red btn tooltipped" 
                                                       data-position="right" 
                                                       data-tooltip="Cancelar"> 
                                                  <i class="material-icons">close</i>
                                             </button>
                                        </div>
                                   </div> <!-- row --> 
                              </form> <!-- form -->                                
                         </div> <!-- modal-content -->
                    </div> 
                    <!-- modal1 -->        

                    <!-- Lista de Profesiones -->
                    <div class="center hoverable">
                         <h5 class="center">Profesiones</h5>
                         <a class="btn btn-medium btn-floating darken-5 z-depth-3 blue tooltipped modal-trigger" 
                              data-position="top" 
                              data-tooltip="Nueva Profesión"
                              href="#modal1"
                              @click="limpiar"
                              >
                              <i class="material-icons">playlist_add</i>
                         </a>                        
                    </div>

                    <!-- busqueda de puestos por nombre -->
                    <div class="col s12">
                         <div class="col s2">
                              <div style="height: 18px;"></div>
                              <button @click="limpiar" 
                                   class="btn btn-small btn-floating darken-5 z-depth-3 orange tooltipped"
                                   data-position="bottom" 
                                   data-tooltip="Limpiar texto de búsqueda">
                                   <i class="material-icons">brush</i>
                              </button>
                         </div>
                         <div class="input-field col s10">
                              <label>Buscar una Profesión por su descripción.</label>
                              <input class="input" type="text" v-model="busqueda">
                         </div>
                    </div>                       
               </div>

               <!-- Lista de Profesiones -->
               <b>Total registros: {{totaldeRegistros}}. Total Filtrados: {{filtrar.length}} </b>
               <table class="responsive-table striped hoverable">
                    <thead>
                         <tr>
                              <!-- <th style="padding: 5px 5px;" width="100"><app-icon img="notifications_active"></app-icon></th> -->
                              <th>#</th>
                              <th>ID</th>
                              <th>Profesion</th>
                         </tr>
                    </thead>
                    <!-- //! v-if="usuario.email!=='admin@gmail.com'" -->
                    <tbody>
                         <tr v-for="(profesion, index) in filtrar">
                              <td style="padding: 5px 5px;">{{index+1}}</td>
                              <td style="padding: 5px 5px;">{{profesion.id}}</td>
                              <td style="padding: 5px 5px;">{{profesion.descripcion}}</td>

                              <td style="padding: 5px 5px;">
                                   <a class="btn btn-small btn-floating darken-5 z-depth-3 red tooltipped" data-position="top" data-tooltip="Eliminar" 
                                        @click="borrarProfesion([{'laDescripcion':profesion.descripcion,'laLlave':profesion.llave}])">
                                        <i class="material-icons">delete</i>
                                   </a>
                              </td>                    
                         </tr> 
                    </tbody>
               </table> 
               <!-- Lista de Profesiones -->
         </div>
    </section>
</template>

<script src="./c_profesiones.js"></script>