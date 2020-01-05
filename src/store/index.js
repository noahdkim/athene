import Vue from 'vue'
import Vuex from 'vuex'
import devotionalActions from '@/store/devotionalActions'
import readingActions from '@/store/readingActions'
import mutations from '@/store/mutations'
import getters from '@/store/getters'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userUID: null,
    token: null,
    devotionalsMetas: []
  },
  mutations: mutations,
  actions: { ...devotionalActions, ...readingActions },
  getters: getters,
  modules: {
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) =>
      // figure out secure
      // Cookies.set(key, value, { expires: 3, secure: true }),
        Cookies.set(key, value, { expires: 3 }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
