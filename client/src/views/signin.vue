<template>
  <v-container>
    <v-layout row>
      <v-flex xs6 offset-xs3 class="text-xs-center">
        <h2 class="display-2 mb-2">Sign in</h2>
        <router-link to="/register" class="link subheading">Need an account?</router-link>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 offset-xs3 class="mt-3">
        <v-form v-model="valid" @submit.prevent ref="form" lazy-validation>
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            validate-on-blur>
          </v-text-field>
          <v-text-field
            label="Enter your password"
            v-model="password"
            :rules="passwordRules"
            type="password">
          </v-text-field>
          <v-btn
            type="submit"
            class="mt-4 ml-0"
            color="primary"
            @click="submit"
            :disabled="!valid">
            Sign in
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      password: '',
      passwordRules: [v => !!v || 'Password is required']
    };
  },
  computed: {
    ...mapState({ user: state => state.user.user })
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    submit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('signUserIn', { user });
      this.$refs.form.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: #66bb6a;

  &:hover {
    text-decoration: underline;
  }
}
</style>
