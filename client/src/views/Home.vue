<template>
  <v-container>
    <v-layout justify-space-between>
      <v-flex xs9>
        <v-tabs v-model="active" slider-color="green">
          <v-tab v-for="tab in tabs" :key="tab">
            {{ tab }}
          </v-tab>
          <v-tab-item v-for="tab in tabs" :key="tab">
            <ArticleItem 
              v-if="articles"
              v-for="article in articles"
              :key="article.slug"
              :username="article.author.username"
              :articleDate="new Date(article.createdAt)" 
              :articleTitle="article.title"
              :articleDescription="article.description"
              :articleFavCount="article.favoritesCount"
              :articleTagList="article.tagList"
              :isFavorite="article.favorited"
              @userClicked="doStuff(article)"
              @favToggled="doStuff(article)"
              @readClicked="doStuff(article)" 
            />
          </v-tab-item>
        </v-tabs>
      </v-flex>
      <v-flex>
        <v-card class="ml-2">
          <v-card-title>Popular Tags</v-card-title>
          <div class="pl-2 pb-2">
            <v-chip small v-for="tag in ['asd','dsfv', 'sdfsf','dsfsdf','fwf']" :key="tag">{{ tag }}</v-chip>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '@/axios-auth';
import ArticleItem from '@/components/Article/ArticleItem';

export default {
  components: {
    ArticleItem
  },
  data() {
    return {
      active: null,
      tabs: ['Your Feed', 'Global Feed'],
      articles: null
    };
  },
  watch: {
    active(val) {
      console.log(val);
    }
  },
  mounted() {
    this.$store.commit('setLoading', true);
    axios
      .get('/articles')
      .then(res => {
        this.$store.commit('setLoading', false);
        this.articles = res.data.articles;
      })
      .catch(() => {
        this.$store.commit('setLoading', false);
      });
  },
  methods: {
    doStuff(i) {
      console.log('yo nig', i);
    }
  }
};
</script>
