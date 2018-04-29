import axios from '@/axios-auth';

export default {
  state: {},
  mutations: {},
  actions: {
    createArticle({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      return axios
        .post('/articles', payload)
        .then(res => {
          commit('setLoading', false);
          return res.data;
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err.response.data.message);
        });
    }
  }
};
