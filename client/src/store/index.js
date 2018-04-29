import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import shared from './shared';
import articles from './articles';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    shared,
    articles
  }
});
