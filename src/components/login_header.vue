<!-- 
     //* login_header.vue
     //* Muestra la cabecera del collapsible
 -->
<template>
    <section>
          <div class="waves-effect waves-light collapsible-header">
               <span class="center tooltipped" 
                    data-tooltip="Haga click aquí para ingresar su e-mail y clave de acceso" 
                    data-position="top">
                    <i class="material-icons">screen_lock_rotation</i>ACCEDER A LA APLICACION.
               </span>
          </div>    
    </section>
</template>

<script>

    import 'materialize-css/dist/css/materialize.min.css'
    import M  from 'materialize-css'

    export default {
        name: 'cabecera',
        mounted(){

            var elems = document.querySelectorAll('.tooltipped');
            var instances = M.Tooltip.init(elems, {});            
        }, //* mounted()
    } //* export
</script>