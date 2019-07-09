import Vue from 'vue'
import Vuex from 'vuex'
import categoryStore from './category'

Vue.use( Vuex );

const store = new Vuex.Store({
    modules: {
        categoryStore
    }
});

export default store