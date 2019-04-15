<template>
     <section>
          <div class="col s6">
               <graph-bar
                         :width="1000"
                         :height="350"
                         :axis-min="0"
                         :axis-max="10"
                         :axis-reverse="false"
                         :labels="etiquetas"
                         :values="values">
                    <tooltip :names="names" :position="'left'"></tooltip>
                    <legends :names="names" :filter="true"></legends>
               </graph-bar>                       
          </div>

     </section>     
</template>

<script>
     export default {
          props:['etiquetas','values','names']    
     }
</script>
