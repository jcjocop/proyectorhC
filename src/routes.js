/** //* routes.js  
 *  //* Marzo 2019
 *  //* By Juan Carlos Jocop
 
    //* Define las rutas (paths) que accederá el programa, definiciendo las opciones que requieren autenticación.
*/    

/*//? Importaciones */
import chgpass      from './components/chgpass.vue'
import home         from './components/home.vue'
import login        from './components/login.vue'
import logout       from './components/logout.vue'
import geoguate     from './components/geograficos.vue'
import otroscat     from './components/otroscat.vue'

/*//? Las opciones de RRHH */
import cv           from './rrhh/cvs.vue'
import profesiones  from './rrhh/c_profesiones.vue'
import puestos      from './rrhh/c_puestos.vue'
import ecivil       from './rrhh/c_ecivil.vue'
import catalogos    from './rrhh/cvs_catalogos.vue'

/*//? La Bitacora */
import configuracion from './rrhh/configuracion.vue'
import bitacora      from './rrhh/bitacora.vue'

/*//? Opciones sin desarrollar */
import nomina       from './rrhh/modulosrh/nomina.vue'
import asistencia   from './rrhh/modulosrh/asistencia.vue'
import climaorg     from './rrhh/modulosrh/climaorg'
import desempeno    from './rrhh/modulosrh/capacitacion.vue'
import activosfijos from './rrhh/modulosrh/activosfijos.vue'

/*//? Exportaciones */
export const routes = [
   
    {path: '/',             name: 'home',        component: home,        meta: { requiresAuth: true }},
    {path: '/login',        name: 'login',       component: login,},    
    {path: '/chgpass',      name: 'chgpass',     component: chgpass,     meta: { requiresAuth: true }},
    {path: '/geoguate',     name: 'geoguate',    component: geoguate,    meta: { requiresAuth: true }},    
    {path: '/otroscat',     name: 'otroscat',    component: otroscat,    meta: { requiresAuth: true }},    
    {path: '/profesiones',  name: 'profesiones', component: profesiones, meta: { requiresAuth: true } },    
    {path: '/puestos',      name: 'puestos',     component: puestos,     meta: { requiresAuth: true } },
    {path: '/ecivil',       name: 'ecivil',      component: ecivil,      meta: { requiresAuth: true } },

    {path: '/catalogos',    name: 'catalogos',   component: catalogos,   meta: { requiresAuth: true } },
    {path: '/bitacora',     name: 'bitacora',    component: bitacora,    meta: { requiresAuth: true } },
    {path: '/configuracion', name: 'configuracion', component: configuracion, meta: { requiresAuth: true } },

    { path: '/cv',           name: 'cv',         component: cv,          meta: { requiresAuth: true } },    
    { path: '/nomina',       name: 'nomina',     component: nomina,      meta: { requiresAuth: true } },    
    { path: '/asistencia',   name: 'asistencia', component: asistencia,  meta: { requiresAuth: true } },    
    { path: '/climaorg',     name: 'climaorg',   component: climaorg,    meta: { requiresAuth: true } },    
    { path: '/desempeno',    name: 'desempeno',  component: desempeno,   meta: { requiresAuth: true } },    
    { path: '/activosfijos', name: 'activosfijos', component: activosfijos, meta: { requiresAuth: true } },    

    {path: '/logout', component: logout, name: 'logout',            meta: { requiresAuth: true }},

    {path: '*', redirect: '/login'},       
];