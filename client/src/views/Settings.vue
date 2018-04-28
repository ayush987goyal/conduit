<template>
  <v-container>
    <v-layout row>
      <v-flex xs6 offset-xs3 class="text-xs-center">
        <h2 class="display-2 mb-2">Your Settings</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 offset-xs3 class="mt-3">
        <v-form v-model="valid" @submit.prevent ref="form" lazy-validation>
          <v-text-field
            label="URL of profile picture"
            v-model="image">
          </v-text-field>
          <v-text-field
            label="Username"
            v-model="username"
            :rules="usernameRules"
            validate-on-blur>
          </v-text-field>
          <v-text-field
            label="Short bio about you"
            v-model="bio"
            multi-line>
          </v-text-field>
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            validate-on-blur>
          </v-text-field>
          <v-text-field
            label="New password"
            v-model="password"
            type="password">
          </v-text-field>
          <v-btn
            type="submit"
            class="mt-4 ml-0"
            color="primary"
            @click="submit"
            :disabled="!valid">
            Update Settings
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6 offset-xs3 class="mt-3">
        <hr>
        <v-btn
          outline
          small
          color="error"
          class="mt-4 ml-0"
          @click="logout">
          Or click here to logout
          </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      image: '',
      username: '',
      usernameRules: [v => !!v || 'Username is required'],
      bio: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      password: ''
    };
  },
  methods: {
    submit() {},
    logout() {
      this.$store.dispatch('logUserOut');
      this.$router.push('/login');
    }
  }
};
</script>
