<template>
  <v-toolbar app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
            <v-icon left>home</v-icon>
            Home
        </v-btn>
        <template v-if="user">
            <v-btn flat>
                <v-icon left>note_add</v-icon>
                New Article
            </v-btn>
            <v-btn flat>
                <v-icon left>settings</v-icon>
                Settings
            </v-btn>
            <v-btn flat>
                <v-icon left>account_circle</v-icon>
                {{ user.username }}
            </v-btn>
        </template>
        <template v-else>
            <v-btn flat>
                <v-icon left>touch_app</v-icon>
                Sign in
            </v-btn>
            <v-btn flat>
                <v-icon left>group_add</v-icon>
                Sign up
            </v-btn>
        </template>
      </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      title: 'Conduit'
    };
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>
