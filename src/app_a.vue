<!-- 
     //* app_a.vue
     //* Marzo 2019
     //* By Juan Carlos Jocop
-->
<template>     
     <a class="tooltipped" 
          :data-tooltip=dataTooltip
          :data-position=dataPosition
          style="font-size:22px;color:black;padding:1.5em">
          <fontawesomeicon :icon=icono />
     </a>
</template>

<script>

     import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

     export default {

          name: "appa",
          props:['dataTooltip','dataPosition','icono'],
          components:{
               fontawesomeicon: FontAwesomeIcon, 
          }
     }     
</script>

