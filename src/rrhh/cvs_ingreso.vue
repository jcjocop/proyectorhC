<!-- 
     //* cvs_ingreso.vue
     //* Marzo 12, 2019
     //* by Juan Carlos Jocop
-->
<template>
     <div class="container">
          <div class="row">

               <!--//? Help y referencia de los días de vencimiento y de revisión -->
               <div class="col s12">
                    <div class="col s2">
                         <button @click="ayudaToast()" 
                                   class="btn waves-effect btn-small btn-floating blue lighten-1 z-depth-4 tooltipped"
                                   data-position="top" 
                                   data-tooltip="Ayuda">               
                                   <!-- <i class="material-icons">message</i> -->
                                   <a style="font-size:22px; color:white"><fontawesomeicon icon="question" />
                                   </a>
                         </button>
                    </div>
                    <div class="col s5">
                         <a># Días máximo para la revisión ? </a> <b> {{diasrevision}} </b>
                    </div>
                    <div class="col s5">
                         <a># Días de aviso antes de la revisión ?</a> <b> {{diasaviso}} </b>
                    </div>
               </div>
               <!--//? SECCION IZQUIERDA: INGRESO DE DATOS -->
               <div class="hoverable col s12">
                    <!--//? FILA 1 -->
                    <div class="input-field col s6">
                         <input type="text" v-model="nombre" autofocus>
                         <label>1. Nombre completo ?</label>
                    </div> <!--//* input-field col s6 -->
                    <div class="input-field col s6">
                         <input type="text" v-model="direccion" autofocus>
                         <label>2. Dirección</label>
                    </div> <!--//* input-field col s6 -->         

                    <!--//? FILA 2 -->
                    <div class="input-field col s3">
                         <input type="text" v-model="movil" autofocus>
                         <label>3. # Tel. Móvil</label>
                    </div> <!--//* input-field col s3 -->
                    <div class="input-field col s4">
                         <input type="email" v-model="email" autofocus>
                         <label>4. E-mail</label>
                    </div> <!--//* input-field col s3 -->
                    <div class="input-field col s2">
                         <input type="number" v-model="edad" autofocus>
                         <label>5. Edad</label>
                    </div> <!--//* input-field col s4 -->               
                    <div class="input-field col s3">
                         <span>6. Sexo</span><br>
                         <a><label>
                              <input v-model="sexo" 
                                        value="M" 
                                        name="group1" 
                                        type="radio" 
                                        checked />
                              <span>(a) Masculino</span><br>
                         </label></a>
                         <a><label>
                              <input v-model="sexo" 
                                        value="F" 
                                        name="group1" 
                                        type="radio" />
                              <span>(b) Femenino</span>
                         </label></a>
                    </div> <!--//* input-field col s3 -->
                    <!--//? FILA 3: selects para ESTADO CIVIL PROFESION Y PUESTO AL QUE APLICA -->
                    <div class="col s3">
                         <span>7. Estado Civil:</span>
                         <vue-single-select
                              v-model="ecivil"
                              :options="$store.state.st_ECiviles"
                              option-key="descripcion"
                              :required="true"
                              option-label="descripcion"
                              :getOptionDescription="getCustomDescription"
                              name="ecivil"                                   
                         ></vue-single-select>
                    </div> <!--//* col s3 -->
                    <div class="col s5">
                         <span>8. Profesion:</span>
                         <vue-single-select
                              v-model="profesion"
                              :options="$store.state.st_profesiones"
                              option-key="descripcion"
                              :required="true"
                              option-label="descripcion"
                              :getOptionDescription="getCustomDescription"
                              name="profesion"
                         ></vue-single-select>
                    </div> <!--//* col s5 -->
                    <div class="col s4">
                         <span>9. Puesto al que aplica:</span>
                         <vue-single-select
                              v-model="puesto"
                              :options="$store.state.st_puestos"
                              :required="true"
                              option-label="descripcion"
                              :getOptionDescription="getCustomDescription"
                              option-key="descripcion"
                              name="puesto"
                         ></vue-single-select>
                    </div> <!--//* col s4 -->
                    <!--//? FILA 4: Obtención de foto y pdf para subirlos después al FB-Storage -->
                    <div class="input-field col s6">
                         <span>10. Foto:</span>
                         <input type="file" 
                                   @change="onFileSelectedF"><br>
                    </div>
                    <div class="input-field col s6">
                         <span>11. C.V.:</span>
                         <input type="file" 
                                   @change="onFileSelected"><br>
                    </div>
                    <!--//? FILA 5: Fecha de Ingreso, fecha de aviso y fecha de revisión -->
                    <div class="col s4">
                         <input type="text" v-model="fingresoT" disables>
                         <label>12. Fecha de ingreso ?</label>                         
                    </div>
                    <div class="col s4">
                         <input type="text" v-model="favisoT" disables>
                         <label>13. Fecha de aviso ?</label>                         
                    </div>
                    <div class="col s4">
                         <input type="text" v-model="frevisionT" disables>
                         <label>14. Fecha de revisión ?</label>                         
                    </div>

                    <!--//? FILA 6: Obtención de foto y pdf para subirlos después al FB-Storage -->
                    <div class="col s4 center" v-if="$store.state.st_mostrarCargador===true">
                         <!-- <span>{{porcentaje}}</span> -->
                         <div class="spinner">
                              <div class="bounce1"></div>
                              <div class="bounce2"></div>
                              <div class="bounce3"></div>                           
                         </div>
                         <b>Espere un momento por favor</b>
                    </div>
                    <!--//? Botón para agregar la información a la FB-Database y FB-Storage -->
                    <div class="col s12 card-action center">
                         <div v-if="!$store.state.st_mostrarCargador">
                              <!-- <button class="btn waves-effect waves-light btn-small green tooltipped" 
                                        data-position="top" 
                                        data-tooltip="Grabar Participante"  
                                        @click="agregaCV">
                                   <i class="material-icons">😊 check</i>
                              </button> -->
                              <el-popover
                                   placement="top"
                                   width="350"
                                   v-model="visibleDel"
                              >
                                   <p>Está usted seguro de grabar el CV de</p>
                                   <p>{{nombre }} ?</p>
                                   <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="visibleDel = false">cancel</el-button>
                                        <el-button type="primary" size="mini" @click="agregaCV">confirm</el-button>
                                   </div>
                                   <el-button class="btn waves-effect waves-light btn-small green" 
                                                  slot="reference">
                                                  <i class="material-icons">😊 check</i>Grabar
                                   </el-button>                                   
                              </el-popover>
                         </div>
                    </div> <!--//* div para ocultar el botón de grabación mientras está grabando y luego mostrarlo -->
                    <br><br>
               </div> <!--//* Div para el ingreso de la información -->
          </div> <!--//* Div containter -->         
     </div> <!--//* Div row-->
</template>

<script src='./cvs_ingreso.js'></script>
