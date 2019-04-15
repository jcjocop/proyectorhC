/** //* main.js
    //* Marzo 2019
    //* by Juan Carlos Jocop

    //* Prepara el uso de rutas, firebase, vuex, así como el instanciamiento de App.vue
    //* Desarrollado por JC Yocop
 */

/*//? Importaciones  */
import Vue          from 'vue';
import App          from './App.vue';

import {store}      from './store/store';    // Definido en /scr/store.js como una constante
import {routes}     from './routes.js';        // {{routes}} importa lo que está en 

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

import firebase     from 'firebase';
import VueRouter    from 'vue-router';

/*// ? Manejador de rutas */
Vue.use(VueRouter);
const router = new VueRouter({

    // mode: 'history', /** El hashtag desaparece */
    routes,

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});
router.beforeEach( (to, from, next) => {

    /*// * Al utilizar "store.state.auth" variable, cuando está en true
       * se obtiene bien el TRACE, cuando cambia a false, pierde la ruta
       * del "from" dejando la última ruta del "f rom".     */
    let currentUser = firebase.auth().currentUser;
    let requiresAuth= to.matched.some( record => record.meta.requiresAuth );
    // ! let currentUser = true;
    // ! let requiresAuth= true;

    if (requiresAuth && !currentUser) {

        next('login');
    } else{
        if (!requiresAuth && currentUser){

            next('home');
        } else {

            next(); //* falso y falso, debiera irse a home
        }
    }
});

/*//! review: Para utilizar los íconos */
/*//! <span aria-hidden="true"> <i class="material-icons">{{img}}</i></span> */
Vue.component('app-icon',{
    template: `
              <span aria-hidden="true"> <i class="material-icons">{{img}}</i></span>
              `,
    props: ['img'],
});  
  
Vue.component('my-icon', {
    template: `
              <i class="material-icons"> <span :style="estilo">{{img}}</span> </i>
              `,
    props: ['img','estilo'],
}); 
/* //? 1. router hacer referencia a la constante definida arriba */
new Vue({

    el: '#app',
    router,
    store,              //* incluye vuex ya que es usado en "next()"
    mounted(){
    
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
            
        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems, {});     

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {dismissible: false});

        var elem = document.querySelectorAll('.tabs'); 
        var instances = M.Tabs.init(elem, {});            
        
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});
        
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems, {show:true});
        });                

        var elem = document.querySelectorAll('.dropdown-trigger'); 
        var instances = M.Dropdown.init(elem, {});
    },

    render: h => h(App)
})