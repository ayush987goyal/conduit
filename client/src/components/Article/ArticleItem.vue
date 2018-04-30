<template>
  <v-container class="elevation-2">
    <v-layout align-center>
      <v-flex xs3>
        <UserAvatar 
          :username="username" 
          :image="userImage" 
          :date="articleDate" 
          @clicked="$emit('userClicked')" 
        />
      </v-flex>
      <v-flex xs1 offset-xs8 class="mr-0">
        <FavoriteButton 
          :active="isFavorite" 
          :favorites="articleFavCount" 
          @toggled="$emit('favToggled')" 
        />
      </v-flex>
    </v-layout>
    <v-layout column class="mt-3 ml-1">
      <h2>{{ articleTitle }}</h2>
      <p class="grey--text">{{ articleDescription }}</p>
    </v-layout>
    <v-layout align-center class="ml-1 pr-2">
      <span class="grey--text" style="cursor: pointer" @click="$emit('readClicked')">Read more...</span>
      <v-spacer></v-spacer>
      <v-chip small v-for="tag in articleTagList" :key="tag">{{ tag }}</v-chip>
    </v-layout>
  </v-container>
</template>

<script>
import UserAvatar from '@/components/User/UserAvatar';
import FavoriteButton from '@/components/UI/FavoriteButton';

export default {
  components: {
    UserAvatar,
    FavoriteButton
  },
  props: {
    username: { type: String, required: true },
    userImage: { type: String },
    articleDate: { type: Date, required: true },
    articleTitle: { type: String, required: true },
    articleDescription: { type: String, required: true },
    articleFavCount: { type: Number, required: true },
    articleTagList: { type: Array },
    isFavorite: { type: Boolean, required: true }
  }
};
</script>
