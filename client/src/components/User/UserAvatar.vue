<template>
  <v-layout>
    <a @click="$emit('clicked')">
      <v-avatar class="mr-2">
        <img :src="image" alt="User Avatar">
      </v-avatar>
    </a>
    <v-layout column>
      <a @click="$emit('clicked')"><h3 class="green--text text--lighten-1">{{ username }}</h3></a>
      <span class="grey--text"> {{ date | date }} </span>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://static.productionready.io/images/smiley-cyrus.jpg'
    },
    date: {
      type: Date,
      required: true
    }
  }
};
</script>
