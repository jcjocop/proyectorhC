<!-- 
    //* ingreso.vue
    //* Permite el ingreso de fechas
-->
<template id="ingresoTemplate">
      <input
        type="date"
        ref="input"
        v-bind:value="dateToYYYYMMDD(value)"
        v-on:input="updateValue($event.target)"
        v-on:focus="selectAll"
      >            
</template>

<script>
    import eventBus from '../event-bus.js'

    export default {
        
        components:{
            'eventBus': eventBus
        },
        props: {
            value: {
                type: Date,
                default: new Date()
            }
        },        
        template: `#ingresoTemplate`,        
        methods: {
            dateToYYYYMMDD(date) {

                return date && date.toISOString().split('T')[0]
            }, //* datetoYYYMMDD()
            updateValue: function (target) {

                this.$emit('input', target.valueAsDate);
            }, //* updateValue()
            selectAll: function (event) {

                setTimeout(function () {
                    event.target.select()
                }, 0)
            } //* selectAll()
        } //* metodhs
    } //* export

</script>