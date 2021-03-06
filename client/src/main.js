import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from './router';
import store from './store';
import DateFilter from './filters/date';
// import './registerServiceWorker';

Vue.use(Vuetify, {
  theme: {
    primary: colors.green.lighten1
  }
});
Vue.config.productionTip = false;

Vue.filter('date', DateFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
