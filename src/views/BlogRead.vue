<template>
<div>
  <b-row>

    <!-- Show error if no blog found -->
    <b-col v-if="err" md="auto">
      <b-alert show variant="danger">
        <pre>{{ err }}</pre>
      </b-alert>
    </b-col>

    <b-col class="blog_border p-5" v-else>

      <!-- Show loading... -->
      <div v-if="loading">
        Loading blog...
      </div>
      <div v-else>
        <!-- Blog title -->
        <h1><span v-html="blog.title"></span></h1>
        <!-- username / blog author -->
        <div class="username_border pl-3">
          <p class="m-0">By: {{ blog.author.username }}</p>
          <p class="font-italic font-weight-light">
            {{ blog.createdAt }}
            <u><span v-if="blog.createdAt < blog.updatedAt" v-b-tooltip.hover :title="blog.updatedAt"> (updated {{ updateDiff }}) </span></u>
          </p>
        </div>
        <!-- Blog content -->
        <p class="content"><span v-html="blog.content"></span></p>

        <div v-if="blog.author._id === $store.state.userId">
          <!-- Delete button -->
          <b-button variant="danger" class="mr-3" @click="$bvModal.show('delete')">Delete</b-button>
          <b-modal id="delete" hide-footer>
            <template v-slot:modal-title>Confirm blog delete</template>
            <div class="d-block text-center">
              <p>You're about to delete the blog "{{ blog.title }}"</p>
            </div>
            <b-button variant="danger" class="mr-3" @click="deleteBlog">Delete</b-button>
            <b-button @click="$bvModal.hide('delete')">Cancel</b-button>
          </b-modal>
          <!-- Update button -->
          <b-button variant="primary" :to="{name: 'blogupdate'}">Update</b-button>
        </div>
      </div>

    </b-col>

  </b-row>
</div>
</template>

<script>
import * as blogService from '../services/BlogService'
import moment from 'moment'

export default {

  name: "blogread",
  data: function() {
    return {
      loading: false,
      blog: {
        author: {}
      },
      err: null,
      updateDiff: null
    };
  },
  metaInfo() {
    return {
      title: this.blog.title
    }
  },
  created: function() {
    // fetch the data when the view is created and the data is already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function() {
      this.loading = true,
      blogService.getBlogById(this.$route.params.id)
      .then(res => {
          this.blog = res.data;
          this.updateDiff = moment(moment(this.blog.updatedAt).toArray()).fromNow();
          this.blog.createdAt = moment(this.blog.createdAt).format('Do MMMM YYYY, h:mm:ss a');
          this.blog.updatedAt = moment(this.blog.updatedAt).format('Do MMMM YYYY, h:mm:ss a');
      })
      .finally(() => this.loading = false)
    },
    deleteBlog: async function() {
      await blogService
        .deleteBlog(this.blog._id)
        .then(() => {
          this.$router.push({
            name: "blogs"
          });
          this.flash("Blog deleted", "success");
        })
        .catch(error => {
          this.$bvModal.hide('delete');
          this.err = error.response.data;
        });
    }
  }

};
</script>
