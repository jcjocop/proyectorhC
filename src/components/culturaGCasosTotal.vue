<!-- 
    culturaGCasosTotal.vue
        Muestra el total de casos registrados.

        {{casosxEmpresa.length}} casos para {{laEmpresa}}        
-->
<template>
    <span>{{totaldeCasos}} casos en Total.  </span>
</template>

<script>

    import {store}          from './../store/store'  
    import {mapState}       from 'vuex'    
    import {mapGetters}     from 'vuex'
    
    export default {
        props: ['busqueda'],
        computed:
        {
            casosxEmpresa(){
                return store.state.st_casos.filter( (caso) => {

                    if ( caso.empresa.toUpperCase().includes(this.busqueda.toUpperCase() ) ){
                        return caso
                    }
                })
            }, // * CasosxEmpresa()
            laEmpresa(){
                var ltexto= ""
                if (this.busqueda.length>0){
                    ltexto= this.casosxEmpresa.length +" casos para " + this.busqueda + "."
                }
                return ltexto;
            }, // *laEmpresa()
            totaldeCasos(){
                return store.getters.totalCasos;
            }, // * totaldeCasos()
        }, // * computed
    }
</script>