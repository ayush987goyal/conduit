import axios from 'axios';

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    signUserUp({ commit }, payload) {
      axios
        .post('http://localhost:3000/api/users', payload)
        .then(res => {
          commit('setUser', res.data.user);
        })
        .catch(err => console.log(err));
    },
    signUserIn({ commit }, payload) {
      axios
        .post('http://localhost:3000/api/users/login', payload)
        .then(res => {
          commit('setUser', res.data.user);
        })
        .catch(err => console.log(err));
    }
  }
};
