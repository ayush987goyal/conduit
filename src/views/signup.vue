<template>
  <v-container>
    <v-layout row>
      <v-flex xs6 offset-xs3 class="text-xs-center">
          <h2 class="display-2 mb-2">Sign up</h2>
          <router-link to="/login" class="link subheading">Have an account?</router-link>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 offset-xs3 class="mt-3">
        <v-form v-model="valid" @submit.prevent ref="form" lazy-validation>
          <v-text-field
            label="Username"
            v-model="username"
            :rules="usernameRules"
            validate-on-blur>
          </v-text-field>
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
            style="color: white"
            color="green lighten-1"
            @click="submit"
            :disabled="!valid">
            Sign up
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      username: '',
      usernameRules: [v => !!v || 'Username is required'],
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
  methods: {
    submit() {
      console.log(this.username, this.email, this.password);
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
