<template>
  <ArticleItem 
    :username="'test'"
    :articleDate="new Date()" 
    :articleTitle="'Yo mama'"
    :articleDescription="'so fat'"
    :articleFavCount="4"
    :isFavorite="false"
    @userClicked="doStuff"
    @favToggled="doStuff"
    @readClicked="doStuff" />
</template>

<script>
import ArticleItem from '@/components/Article/ArticleItem';

export default {
  components: {
    ArticleItem
  },
  methods: {
    doStuff() {
      console.log('yo nig');
    }
  }
};
</script>
