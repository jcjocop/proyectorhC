<!-- 
     //* cvs_consultas.vue
     //* Marzo 2019
     //* by Juan Carlos Jocop
-->
<template>
     <div class="">
          <div class="brand-logo teal lighten-5 col s12 hoverable">
               <!--//? Help-->
               <div class="col s6">
                    <button @click="ayudaToast()" 
                              class="btn waves-effect btn-small btn-floating blue lighten-1 z-depth-4 pulse tooltipped"
                              data-position="top" 
                              data-tooltip="Ayuda">               
                              <!-- <i class="material-icons">message</i> -->
                              <a style="font-size:22px; color:white"><fontawesomeicon icon="question" />
                              </a>
                    </button>
               </div>
               <div class="col s6">
                    <span>BÚSQUEDAS</span>
               </div>
          </div>
          <!--//? Búsquedas -->
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
                    <label>por nombre</label>
                    <input class="input" type="text" v-model="busqueda">
               </div>
               <div class="input-field col s2">
                    <input class="input" type="text"  v-model="busquedaP">
                    <label>por profesión</label>
               </div> 
               <div class="input-field col s2">
                    <input class="input" type="text"  v-model="busquedaC">
                    <label>por Estado Civil</label>
               </div> 
               <div class="input-field col s2">
                    <input class="input" type="text"  v-model="busquedaA">
                    <label>por Puesto a Aplicar</label>
               </div> 
               <div class="input-field col s2">
                    <input class="input" type="text"  v-model="busquedaS">
                    <label style="font-size:13px">por Estatus= en curso/en aviso/vencido</label>
               </div> 
          </div> <!--//* brand-logo -->

          <!--//? Increment & Decrement; Next & Previous Page; mensajes para saber la ubicación -->   
          <div class="brand-logo teal lighten-5 col s12">
               <div class="col s2">
                    <button class="btn btn-small waves-effect waves-light blue lighten-1 z-depth-5 tooltipped" 
                              data-position="top" 
                              data-tooltip="Incrementar la lista en 5, 10 o 20 filas."    
                              style="padding: 1 1rem" 
                              @click="incremento()"><i class="material-icons">expand_more</i>
                    </button>
                    <button class="btn btn-small waves-effect waves-light blue lighten-1 z-depth-5 tooltipped" 
                              data-position="bottom" 
                              data-tooltip="Decrementar la lista en 5, 10 o 20 filas." 
                              style="padding: 1 1rem" 
                              @click="decremento()"><i class="material-icons">expand_less</i>
                    </button>
                    <a class="btn btn-small waves-effect btn-floating blue lighten-1 z-depth-4 tooltipped" 
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
               </div> <!--//* col s2 -->
               <div class="col s3">
                    <span>
                         Página <b>{{pagina}}: [ {{lini+1}} - {{lfin}}</b> ]
                    </span>
               </div> <!--//* col s3 -->
               <div class="col s7">
                    <span>[ Total de participantes registrados <b>{{$store.state.st_CVs.length}} </b>;
                              Total de participantes filtrados <b>{{filtrarlosCVs.length}}</b> ]
                    </span>
                    <a id="descargar" @click="descargartexto">Crear JSON</a>
               </div> <!--//* col s7 -->
          </div> <!--//* brand-logo -->

          <!--//? Lista de Participantes-->
          <div class="row">               
               <div class="col s12">                    
                    <div class="card horizontal">                         
                         <!--//? LADO IZQUIERDO: Tabla -->                         
                         <div class="col s7 blue lighten-3">
                              <div style="height: 11px;"></div>
                              <!--//? Campanitas-->
                              <!-- <div class="col s1" hidden>v: {{CVsVencidas.length}}; av: {{CVsEnAviso.length}}; c: {{CVsEnCurso.length}} </div> -->
                              <div class="col s8"></div>
                              <div class="col s1 tooltipped" data-position="top" data-tooltip="En curso" style="cursor: pointer">
                                   <el-badge :value="CVsEnCurso.length" class="item" type="success">
                                        <my-icon :estilo="notifi_enCurso ? 'color:#69C03D' : 'color:black'" 
                                                  :img="notifi_enCurso ? 'notifications_active' : 'notifications'">
                                        </my-icon>
                                   </el-badge>
                              </div>
                              <div class="col s1 tooltipped" data-position="top" data-tooltip="En aviso" style="cursor: pointer">
                                   <el-badge :value="CVsEnAviso.length" class="item" type="warning">
                                        <my-icon :estilo="notifi_enAviso ? 'color:yellow' : 'color:black'" 
                                                  :img="notifi_enAviso ? 'notifications_active' : 'notifications'" aria-hidden="true">
                                        </my-icon>
                                   </el-badge>
                              </div>
                              <div class="col s1 tooltipped" data-position="top" data-tooltip="Vencidos" @click="filtrarxEstatus('vencido')" style="cursor: pointer">
                                   <el-badge :value="CVsVencidas.length" class="item" type="danger">
                                        <my-icon :estilo="notifi_vencidos ? 'color:red' : 'color:black'" 
                                                  :img="notifi_vencidos ? 'notifications_active' : 'notifications'" aria-hidden="true">
                                        </my-icon>
                                   </el-badge>
                              </div>

                              <br>
                              <!--//? Tabla -->
                              <table class="responsive-table Striped hoverable white lighten-4">
                                   <thead>
                                        <tr>
                                             <!--//! <th style="padding: 5px 5px;" width="100"><app-icon img="notifications_active"></app-icon></th> -->
                                             <th style="font-size:11px">Aprobado</th>
                                             <th>#</th>
                                             <th style="font-size:12px">Foto</th>
                                             <th style="font-size:12px">Nombre</th>
                                             <th style="font-size:12px">Sexo</th>
                                             <th style="font-size:12px">Edad</th>
                                             <th style="font-size:12px">Profesión</th>
                                             <th style="font-size:12px">Aplica a</th>
                                             <th style="font-size:12px">E. Civil</th>
                                             <th style="font-size:12px">Estatus</th>
                                             <th style="font-size:12px">Ver Ficha</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <!--//! @click="senalarRegistro(cv)" -->
                                        <tr v-if="index>=lini && index <=lfin-1" v-for="(cv, index) in filtrarlosCVs">
                                             <td style="padding: 5px 5px;">
                                                  <a @click="cambiarEstado(cv)">
                                                       <i v-if="cv.aprobado" class="material-icons" style="color:blue">playlist_add_check</i>
                                                       <i v-else class="material-icons" style="color:red">close</i>
                                                       <a style="font-size:11px; font-weight:bold; color:black" v-text="cv.aprobado ? 'Sí' : 'No' "></a>
                                                  </a>
                                             </td>    
                                             <td style="padding: 5px 5px; font-size:14px" :bgcolor="cv.color">{{index+1}}</td>
                                             <td style="padding: 5px 5px;"> <img :src=cv.urlfoto height="48px" width="48px" class="circle responsive-img"> </td>
                                             <td style="padding: 5px 5px; font-size:14px" :bgcolor="cv.color">{{cv.nombre}}</td>
                                             <td style="padding: 5px 5px; font-size:14px" :bgcolor="cv.color">{{cv.sexo}}</td>                                             
                                             <td style="padding: 5px 5px; font-size:14px" :bgcolor="cv.color">{{cv.edad}}</td>
                                             <td style="padding: 5px 5px; font-size:14px" :bgcolor="cv.color">{{cv.profesion}}</td>
                                             <td style="padding: 5px 5px; font-size:14px" :bgcolor="cv.color">{{cv.puesto}}</td> 
                                             <td style="padding: 5px 5px; font-size:14px" :bgcolor="cv.color">{{cv.ecivil}}</td>
                                             <td style="padding: 5px 5px;" :bgcolor="cv.estatusbcolor">
                                                  <font :color="cv.estatusfcolor">{{cv.estatus}}</font>
                                             </td>
                                             <td style="padding: 5px 5px; font-size:14px" :bgcolor="cv.color">{{cv.hubocambio}}</td>

                                             <td style="padding: 5px 5px;">
                                                  <a class="btn btn-small darken-1 blue lighten-1 z-depth-3 tooltipped" 
                                                       data-position="top" 
                                                       data-tooltip="Ver Foto" 
                                                       @click="verFoto(cv, cv.nombre, cv.cfoto, cv.urlfoto, cv, cv.ccv, cv.urlcv)">
                                                       <i class="material-icons">assignment_ind picture_as_pdf</i>
                                                  </a>
                                             </td>                                             
                                             <td style="padding: 5px 5px;">
                                                  <a class="btn btn-small btn-floating darken-5 z-depth-4 red tooltipped" 
                                                       data-position="top" 
                                                       data-tooltip="Eliminar" 
                                                       @click="deleteCV(cv.nombre,cv.llave,cv.urlcv,cv.ccv,cv.urlfoto,cv.cfoto)">
                                                       <i class="material-icons">delete</i>
                                                  </a>
                                             </td>                    
                                        </tr> 
                                   </tbody>
                              </table> <!--//* table -->
                              <br>
                         </div> <!--//* col s7 -->

                         <!--//? LADO DERECHO: foto y PDF -->
                         <!--//? height="200" width="180" -->
                         <div class="col s5 hoverable teal lighten-5">
                              <div class="center white lighten-4">
                                   <span class="center" style="font-size:14px"><b> {{ this.currNombre }} </b></span><br>
                                   <span style="font-size:16.5px;font-family:cambria; font-size:13px"> <b>* {{ this.currProfe }}</b> </span><br>
                                   <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* Aplica para {{ this.currAplica }}</b></span><br>
                              </div>
                              <div class="card horizontal white lighten-4">

                                   <div class="col s5 row valign-wrapper">
                                        <br>
                                        <img :src="this.currFotoT"
                                             height="210" 
                                             width="210"
                                             class="circle responsive-img">
                                   </div>
                                   <div class="card-stacked col s7">
                                        <div class="card-content">
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currECivil }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currEdad }} años</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currSexo }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currMovil }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* Vive en {{ this.currDire }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currfingreso }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currfaviso }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currfrevision }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currdiasvencidos }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currestatus }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currColorB }}</b></span><br>
                                             <span style="font-size:16px;font-family:cambria; font-size:13px"> <b>* {{ this.currColorF }}</b></span><br>

                                        </div>
                                        <div class="card-action">
                                             <button @click="verjspdf(currNombre, src)" 
                                                       class="btn waves-effect waves-light btn-small blue lighten-1 z-depth-4 tooltipped" 
                                                       data-position="top" 
                                                       data-tooltip="Ver Curriculum en otra pestaña del navegador para imprimir"
                                                  >
                                                  <!-- <i class="material-icons">search</i>Ver Curriculum -->
                                                  <a style="font-size:22px; color:white"><fontawesomeicon icon="file-pdf" />
                                                  </a>
                                             </button>                                                
                                        </div>
                                        <br>
                                   </div>
                              </div> <!--//* card horizontal -->                            
                         </div> <!--//* col s5 hoverable -->
                    </div> <!--//* card-horizontal -->
               </div> <!--//* col s12 -->
          </div> <!--//* row -->
     </div> <!--//* class="row" -->
</template>

<script src='./cvs_consultas.js'></script>
