// vue
import { createApp } from 'vue'

// Element-plus UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Vue components
import App from './App.vue'
import CollapseSidePanel from "./components/CollapseSidePanel.vue"
import Fragments from "./components/Fragments.vue" 
import BaseMapTab from "./components/fragments/BaseMapTab.vue"
import ServiceTab from "./components/fragments/ServiceTab.vue"
import AboutTab from "./components/fragments/AboutTab.vue"
import BaseMapChoice from "./components/widgets/BaseMapChoice.vue"

// Vue app initialize
app = createApp(App)
app.use(ElementPlus)
app.component("CollapseSidePanel", CollapseSidePanel)
app.component("Fragments", Fragments)
app.component("BaseMapTab", BaseMapTab)
app.component("ServiceTab", ServiceTab)
app.component("AboutTab", AboutTab)
app.component("BaseMapChoice", BaseMapChoice)
app.mount('#app')
