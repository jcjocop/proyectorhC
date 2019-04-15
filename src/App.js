/* //* App.js 
   //*    Instancia Principal para referenciarla en index.html
   //*    Desarrollado por JC Yocop       
*/    

import creditos from './app_creditos.vue'
import menusis  from './app_menu.vue'
import la       from './app_a.vue'

import { library }         from '@fortawesome/fontawesome-svg-core'
import { faGraduationCap, faBookReader, 
          faUserGraduate, faCopy, faAddressCard, 
          faGlobe, faPersonBooth, faKey,
          faFolderOpen, faHome, faUserLock,
          faCog }       from '@fortawesome/free-solid-svg-icons'

library.add(faGraduationCap, faBookReader, faUserGraduate, 
            faCopy, faAddressCard, faGlobe, faPersonBooth, 
            faKey, faFolderOpen, faHome, faUserLock,
            faCog)

export default {
  
    name: 'app',
    components: {

      creditos,
      menusis,
      la,
    },  
    data(){
        return{
          show: false,
        }
    },
} //* export