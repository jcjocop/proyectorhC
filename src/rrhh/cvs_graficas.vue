<!-- 
     //* cvs_graficas.vue
     //* Marzo 2019
     //* by Juan Carlos Jocop
-->
<template>
     <section>
         <!--//? LAS GRAFICAS -->
          <div class="row">
               <div class="col s12 hoverable teal lighten-5">
                    <div style="height: 14px;"></div>
                    <!--//? BOTON DE AYUDA -->
                    <div class="col s6 center">
                         <button @click="ayudaToast()" 
                                   class="btn waves-effect btn-small btn-floating blue lighten-1 z-depth-3 tooltipped"
                                   data-position="top" 
                                   data-tooltip="Ayuda">               
                                   <!-- <i class="material-icons">message</i> -->
                                   <a style="font-size:22px; color:white"><fontawesomeicon icon="question" />
                                   </a>
                         </button>
                    </div> <!--//* col s6 center -->

                    <!--//! Por si hubiera necesidad que las gráficas de muestren con un botón y no con el temporizador -->
                    <!-- <div class="center col s6 ">
                         <h5>Refresca las imagenes con valores de los Participantes</h5>
                         <button class="btn waves-effect waves-light btn-small green" 
                                 @click="cargarValoresGraficas">
                              Actualizar Gráficas
                         </button>
                         <br>
                    </div> -->
                    <!--//? BOTON PARA EXPORTAR LA INFORMACION A CSV -->
                    <div class="center col s6">
                         <download-excel
                              class   = "btn btn-default"
                              :data   = "CVs"
                              :fields = "json_fields"
                              type    = "cvs"
                              button_text= "Exportar Participantes a EXCEL"
                              name    = "Participantes.xls">
                         </download-excel>
                         <div style="height: 18px;"></div>
                    </div> <!--//* center col s6 -->
               </div> <!--//* container col s12 -->

               <!--//? PRIMERA FILA DE GRAFICAS -->
               <div class="center col s12">
                    <h5>Galería de Gráficas</h5>
               </div> <!--//* center col s12 -->
               <div class="row center">
                    <div class="col s12">
                         <!--//? Menú de Distintos tipos de Gráficos -->
                         <el-button-group v-model="tabPosition">

                              <el-button type="primary" @click="graficas('left')" round>Estados Civiles</el-button>
                              <el-button type="primary" @click="graficas('right')">Profesiones</el-button>
                              <el-button type="primary" @click="graficas('top')">Puestos al que aplica</el-button>
                              <el-button type="primary" @click="graficas('bottom')" round>Fechas de aplicación</el-button>

                         </el-button-group>

                         <!--//? Gráficos Para Estados civiles -->
                         <el-tabs @tab-click="handleClick" v-show="tabPosition==='left'" tab-position="left" style="height: 465px;">
                              <el-tab-pane label="Comparado por Sexo" name="BN">Estado Civil agrupado por Sexo
                                   <graficaBN 
                                        :etiquetas="etiquetas"
                                        :values="values"
                                        :names="names"
                                   ></graficaBN>
                              </el-tab-pane>
                              <el-tab-pane label="Apilados por Sexo" name="BP">Estado Civil apilado por Sexo
                                   <graficaBP
                                        :etiquetas="etiquetas"
                                        :values="values"
                                        :names="names"
                                   ></graficaBP>
                              </el-tab-pane>
                              <el-tab-pane label="3D" name="3D">Estados Civiles agrupados por Sexo
                                   <grafica3D
                                        :etiquetas="etiquetas"
                                        :values="values"
                                        :names="names"
                                   ></grafica3D>
                              </el-tab-pane>                         
                         </el-tabs>
                         <!--//? Graficas para Profesiones -->
                         <el-tabs @tab-click="handleClick" v-show="tabPosition==='right'" tab-position="right" style="height: 575px;">
                              <el-tab-pane label="Pie" name="PN">Profesiones
                                   <graficaPN
                                        :values_pie="values_pie"
                                        :names_pie="names_pie"
                                        :dataFormat="dataFormat"
                                   ></graficaPN>
                              </el-tab-pane>
                         </el-tabs>
                         <el-tabs @tab-click="handleClick" class="center" v-show="tabPosition==='top'" tab-position="left" style="height: 550px;">
                              <el-tab-pane label="Donut" name="PD">Puesto al que aplica
                                   <graficaPD
                                        :values_donut="values_donut"
                                        :names_donut="names_donut"
                                        :dataFormat="dataFormat"
                                   ></graficaPD>
                              </el-tab-pane>
                         </el-tabs>
                         <el-tabs @tab-click="handleClick" v-show="tabPosition==='bottom'" tab-position="right" style="height: 450px;">
                              <el-tab-pane label="Línea" name="L">Fechas de Aplicación
                                   <graficaL
                                        :etiquetas_linea="etiquetas_linea"
                                        :values_linea="values_linea"
                                        :names_linea="names_linea"
                                   ></graficaL>
                              </el-tab-pane>
                         </el-tabs>
                    </div>
               </div> <!--//* row center -->

               <!--//! Por si hubiera necesidad de una gráfica de población -->
               <!-- <div class="row">
                    <graph-comparison-bar
                              :width="500"
                              :height="400"
                              :labels="labels_comp"
                              :values="values_comp"
                              :axis-step="7">
                         <note :text="title_comp"></note>
                         <tooltip :names="names_comp"></tooltip>
                         <legends :names="names_comp"></legends>
                    </graph-comparison-bar>
               </div> -->
          </div> <!--//* row -->
     </section>          
</template>

<script src='./cvs_graficas.js'></script>
