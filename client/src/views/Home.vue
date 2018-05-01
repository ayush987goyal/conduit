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
            <span v-if="!articles || articles.length <= 0" class="mt-5">
              No articles to display.
            </span>
          </v-tab-item>
        </v-tabs>
      </v-flex>
      <v-flex>
        <v-card class="ml-2">
          <v-card-title>Popular Tags</v-card-title>
          <div class="pl-2 pb-2">
            <v-chip 
              small 
              v-for="tag in ['asd','dsfv', 'sdfsf','dsfsdf','fwf']" 
              :key="tag"
              @click="addTagFilter(tag)">
              {{ tag }}
            </v-chip>
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
      articles: null,
      selectedTag: null
    };
  },
  watch: {
    active(val) {
      if (+val === 0) {
        this.tabs = this.tabs.slice(0, 2);
        this.populateArticles('/articles/feed');
      } else if (+val === 1) {
        this.tabs = this.tabs.slice(0, 2);
        this.populateArticles('/articles');
      }
    }
  },
  methods: {
    doStuff(i) {
      console.log('yo nig', i);
    },
    addTagFilter(tag) {
      this.tabs = [...this.tabs.slice(0, 2), `#${tag}`];
      this.active = '2';
      this.populateArticles('/articles', {
        params: { tag }
      });
    },
    populateArticles(endpoint, options = {}) {
      this.articles = null;
      this.$store.commit('setLoading', true);
      axios
        .get(endpoint, options)
        .then(res => {
          this.$store.commit('setLoading', false);
          this.articles = res.data.articles;
        })
        .catch(() => {
          this.$store.commit('setLoading', false);
        });
    }
  }
};
</script>
