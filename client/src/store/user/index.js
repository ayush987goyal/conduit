import axios from 'axios';

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      localStorage.setItem('token', payload.token);
    }
  },
  actions: {
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      axios
        .post('http://localhost:3000/api/users', payload)
        .then(res => {
          commit('setLoading', false);
          commit('setUser', res.data.user);
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err.response.data.message);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      axios
        .post('http://localhost:3000/api/users/login', payload)
        .then(res => {
          commit('setLoading', false);
          commit('setUser', res.data.user);
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err.response.data.message);
        });
    }
  }
};
