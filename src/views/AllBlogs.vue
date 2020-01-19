<template>
<div>

  <h1 class="display-4 mb-4 text-center">All Blogs</h1>

  <!-- Show error if no blog found -->
  <b-row>
    <b-col v-if="err" md="auto">
      <b-alert show variant="danger">
        <h5>Error displaying all blogs</h5>
        <pre>{{ err }}</pre>
      </b-alert>
    </b-col>
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
      blogs: null,
      err: false
    };
  },
  beforeRouteEnter(to, from, next) {
    blogService.getAllBlogs()
      .then(res => {
        next(vm => {
          vm.blogs = res.data;
        });
      })
      .catch(error => {
        this.err = error;
      });
  }
};
</script>
