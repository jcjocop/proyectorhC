<template>
     <section>
          <div class="col s6">
               <graph-bar3d
                         :width="700"
                         :height="450"
                         :axis-min="0"
                         :axis-max="10"
                         :padding-top="100"
                         :padding-bottom="100"
                         :depth="230"
                         :labels="etiquetas"
                         :names="names"
                         :values="values">
                    <note :text="'Gráfico de Barras 3D'" :align="'left'"></note>
                    <tooltip :names="names" :position="'left'"></tooltip>
                    <legends :names="names"></legends>
                    <rotate3d></rotate3d>
               </graph-bar3d>                 
          </div>
     </section>     
</template>

<script>
     export default {
          props:['etiquetas','values','names'] 
     }
</script>
