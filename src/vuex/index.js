import Vuex from 'vuex';
import Vue from 'vue';

import mutations from './mutation';
import actions from './action';
import getters from './getter';
import state from  './state';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
