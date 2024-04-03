import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import { faTwitter, faGooglePlus, faGoogle, faGooglePlusG, faGithub } from '@fortawesome/free-brands-svg-icons'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/* add icons to the library */
library.add(faUserSecret, faTwitter, faGooglePlus, faGoogle, faGooglePlusG, faGithub )

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.use(VueSweetalert2);
app.mount('#app')
