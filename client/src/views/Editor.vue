<template>
  <v-container>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <v-form v-model="valid" @submit.prevent ref="form" lazy-validation>
          <v-text-field
            label="Article Title"
            v-model="title"
            :rules="titleRules"
            validate-on-blur>
          </v-text-field>
          <v-text-field
            label="What's this article about?"
            v-model="description"
            :rules="descriptionRules"
            validate-on-blur>
          </v-text-field>
          <v-text-field
            label="Write your article (in markdown)"
            v-model="body"
            :rules="bodyRules"
            multi-line>
          </v-text-field>
          <v-select
            label="Enter tags"
            chips
            tags
            solo
            append-icon=""
            clearable
            class="mt-3"
            v-model="tagList">
              <template slot="selection" slot-scope="data">
                <v-chip
                  close
                  @input="remove(data.item)"
                  :selected="data.selected">
                    {{ data.item }}
                </v-chip>
              </template>
          </v-select>
          <v-btn
            large
            type="submit"
            class="mt-5 ml-0"
            color="primary"
            @click="submit"
            :disabled="!valid">
            Publish Article
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
      title: '',
      titleRules: [v => !!v || 'Title is required'],
      description: '',
      descriptionRules: [v => !!v || 'Decsription is required'],
      body: '',
      bodyRules: [v => !!v || 'Body is required'],
      tagList: []
    };
  },
  methods: {
    remove(item) {
      this.tagList.splice(this.tagList.indexOf(item), 1);
      this.tagList = [...this.tagList];
    },
    submit() {
      const article = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList
      };
      this.$store
        .dispatch('createArticle', { article })
        .then(data => this.$router.push(`/article/${data.article.slug}`));
    }
  }
};
</script>
