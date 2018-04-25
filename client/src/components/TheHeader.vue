<template>
  <v-toolbar app>
    <v-toolbar-title class="headline ml-5 main-title" @click="$router.push('/')">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/">
        <v-icon left>home</v-icon>
        Home
      </v-btn>
      <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
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
    ...mapState(['user']),
    menuItems() {
      let menuItems = [
        { icon: 'touch_app', title: 'Sign in', link: '/login' },
        { icon: 'group_add', title: 'Sign up', link: '/register' }
      ];

      if (this.user) {
        menuItems = [
          { icon: 'note_add', title: 'New Article', link: '/login' },
          { icon: 'settings', title: 'Settings', link: '/register' },
          {
            icon: 'account_circle',
            title: this.user.username,
            link: '/register'
          }
        ];
      }

      return menuItems;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-title {
  color: #66bb6a;
  cursor: pointer;
}
</style>
