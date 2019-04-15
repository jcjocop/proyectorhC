<template>
     <section>
          <div class="col s6">
               <graph-stackbar
                         :width="1000"
                         :height="350"
                         :labels="etiquetas"
                         :full-mode="true"
                         :show-text="true"
                         :names="names"
                         :values="values">
                    <legends :names="names"></legends>
                    <tooltip :names="names" :position="'right'"></tooltip>
               </graph-stackbar>                    
          </div>

     </section>     
</template>

<script>
     export default {
          props:['etiquetas','values','names']    
     }
</script>
