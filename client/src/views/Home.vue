<template>
  <v-container>
    <v-layout justify-space-between>
      <v-flex xs9>
        <v-tabs v-model="active" slider-color="green">
          <v-tab v-for="tab in tabs" :key="tab">
            {{ tab }}
          </v-tab>
          <v-tab-item v-for="tab in tabs" :key="tab" :class="{'mt-3': !articles || articles.length <= 0}">
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
            <span v-if="loading">
              Loading...
            </span>
            <span v-if="!loading && (!articles || articles.length <= 0)">
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
              v-for="tag in tagList" 
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
import { mapState } from 'vuex';
import axios from '@/axios-auth';
import ArticleItem from '@/components/Article/ArticleItem';

export default {
  components: {
    ArticleItem
  },
  computed: {
    ...mapState({
      loading: state => state.shared.loading
    })
  },
  data() {
    return {
      active: null,
      tabs: ['Your Feed', 'Global Feed'],
      articles: null,
      tagList: null
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
  mounted() {
    axios.get('/tags').then(res => (this.tagList = res.data.tags));
  },
  methods: {
    doStuff(i) {
      console.log('yo', i);
    },
    addTagFilter(tag) {
      if (this.tabs.length > 2) {
        this.tabs = this.tabs.slice(0, 2);
        this.active = `${+this.active - 1}`;
        setTimeout(() => {
          this.tabs.push(`#${tag}`);
          this.active = `${this.tabs.length - 1}`;
          this.populateArticles('/articles', {
            params: { tag }
          });
        }, 1);
        return;
      }
      this.tabs.push(`#${tag}`);
      this.active = `${this.tabs.length - 1}`;
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
