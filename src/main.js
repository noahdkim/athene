import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import firebase from 'firebase'
import firebaseConfig from '@/firebase-config'

Vue.config.productionTip = false

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
