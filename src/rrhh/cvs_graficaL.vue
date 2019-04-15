<template>
     <section>
          <div class="col s6">
               <graph-line
                         :width="800"
                         :height="400"
                         :shape="'normal'"
                         :axis-min="0"
                         :axis-max="15"
                         :axis-full-mode="true"
                         :labels="names_linea"
                         :names="etiquetas_linea"
                         :values="values_linea">
                    <tooltip :names="etiquetas_linea" :position="'right'"></tooltip>
                    <legends :names="etiquetas_linea"></legends>
                    <guideline :tooltip-y="true"></guideline>
               </graph-line>        
          </div>
     </section>     
</template>

<script>
     export default {
          props:['etiquetas_linea','values_linea','names_linea'] 
     }
</script>
