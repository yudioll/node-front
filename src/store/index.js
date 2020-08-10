import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import login from './login'

const vuexLocal = new VuexPersistence({
    key:'yudioll',
    storage: window.localStorage
})
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        login
    },
    plugins: [vuexLocal.plugin]
})

export default store
