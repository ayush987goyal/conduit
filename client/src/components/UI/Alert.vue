<template>
    <v-alert color="error" icon="error" dismissible @input="onClose" :value="true">
      {{ text }}
    </v-alert>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    onClose() {
      this.$emit('dismissed');
    }
  }
};
</script>
