<template>
  <v-btn-toggle :input-value="isEnabled">
    <v-btn outline color="green" @click="$emit('toggled')">
      {{ favorites }} &nbsp;
      <v-icon>favorite</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, required: true },
    favorites: { type: Number, required: true }
  },
  data() {
    return {
      isEnabled: 0
    };
  },
  mounted() {
    this.isEnabled = this.active ? 0 : 1;
  },
  watch: {
    active(value) {
      this.isEnabled = value ? 0 : 1;
    }
  }
};
</script>
