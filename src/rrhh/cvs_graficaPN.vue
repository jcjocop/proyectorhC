<template>
     <section>
          <div class="col s6">
               <graph-pie
                         :width="1500"
                         :height="550"
                              :padding-top="100"
                              :padding-bottom="100"
                              :padding-left="100"
                              :padding-right="100"
                         :values="values_pie"
                         :names="names_pie"
                         :active-index="[ 0, 2 ]"
                         :active-event="'click'"
                         :show-text-type="'outside'"
                         :data-format="dataFormat">
                    <legends :names="names_pie"></legends>
                    <tooltip :names="names_pie"></tooltip>
               </graph-pie>                  
          </div>
     </section>     
</template>

<script>
     export default {
          props:['values_pie','names_pie','dataFormat'] 
     }
</script>
