<template>
     <section>
          <div class="col s6">
               <graph-pie
                         :width="1500"
                         :height="500"
                         :padding-top="75"
                         :padding-right="75"
                         :padding-bottom="75"
                         :padding-left="75"
                         :values="values_donut"
                         :names="names_donut"
                         :active-index="[ 0, 2 ]"
                         :active-event="'click'"
                         :show-text-type="'outside'"
                         :data-format="dataFormat"
                         :shape="'donut'"
                         :show-total-value="true">
                    <legends :names="names_donut"></legends>
                    <tooltip :names="names_donut"></tooltip>
               </graph-pie>               
          </div>
     </section>     
</template>

<script>
     export default {
          props:['values_donut','names_donut','dataFormat']
     }
</script>
