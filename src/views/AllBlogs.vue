<template>
<div>

  <h1 class="display-4 mb-4 text-center">All Blogs</h1>

  <b-row>
    <!-- Show error if no blog found -->
    <b-col v-if="err" md="auto">
      <b-alert show variant="danger">
        <h5>Error displaying all blogs</h5>
        <pre>{{ err }}</pre>
      </b-alert>
    </b-col>
    <!-- Loading blogs -->
    <b-col v-if="loading">Loading blogs...</b-col>
  </b-row>

  <!-- Blog loop -->
  <b-row class="my-4 blog_border" v-for="blog in blogs" :key="blog._id">
    <b-col class="py-4" md="10" offset-md="1">
      <h5>
        <router-link :to="{ name: 'blogread', params: { id: blog._id } }">
          <span v-html="blog.title"></span>
        </router-link>
      </h5>
      <p class="font-italic">by {{ blog.author.username }}, {{ blog.createdAt | timefromnow }}</p>
      <span v-html="blog.content.slice(0, 630)"></span>...
    </b-col>
  </b-row>

</div>
</template>

<script>
import * as blogService from "../services/BlogService"
export default {

  name: "blogs",
  metaInfo: {
    title: 'All Blogs'
  },
  data: function() {
    return {
      loading: false,
      blogs: null,
      err: null
    };
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
      blogService.getAllBlogs()
      .then(res => {
          this.blogs = res.data;
      })
      .finally(() => this.loading = false)
    }
  }

};
</script>
