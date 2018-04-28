<template>
  <v-app>
    <TheHeader />

    <v-content>
      <v-progress-linear :indeterminate="true" style="margin-top: 1px" v-if="loading"></v-progress-linear>
      <Alert v-if="error" :text="error" @dismissed="clearError" />
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    
    <TheFooter />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';
import Alert from '@/components/Alert';

export default {
  components: {
    TheHeader,
    TheFooter,
    Alert
  },
  computed: {
    ...mapState({
      loading: state => state.shared.loading,
      error: state => state.shared.error
    })
  },
  methods: {
    clearError() {
      this.$store.commit('clearError');
    }
  },
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>
