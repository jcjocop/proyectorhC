<!-- 
     //* cvs.vue
     //* Marzo 2019
     //* By Juan Carlos Jocop
-->
<template>
     <div class="row">
          <div class="col s12">
               <h5 class="center">Reclutamiento de Personal</h5>
               <!--//? Definicion de los TABS -->
               <ul class="tabs">
                    <li @click="addbitacora(1)" class="tab col s4">
                         <a href="#testt22" class="active">Aplicar</a>
                    </li>
                    <li @click="addbitacora(2)" class="tab col s4">
                         <a href="#testt23" class="teal-text teal-background">Consultas</a>
                    </li>
                    <li @click="addbitacora(3)" class="tab col s4">
                         <a href="#testt24" class="teal-text teal-background">Estadísticas</a>
                    </li>
                    <div class="indicator indigo darken-4" style="z-index:1"></div>
               </ul>

               <!--//? CONSULTAS -->
               <div id="testt22">

                    <cvsingreso>                         
                    </cvsingreso>
               </div>

               <!--//? APLICAR -->
               <div id="testt23">

                    <cvsconsultas>
                    </cvsconsultas>                      
               </div>

               <!--//? ESTADISTICAS -->
               <div id="testt24">

                    <cvsgraficas>                         
                    </cvsgraficas>
               </div>
          </div> <!--//* col s12-->
     </div> <!--//* row-->
</template>

<script src='./cvs.js'></script>

