<template>
<div>

  <b-jumbotron header="Blogsite" lead="Created with MongoDB, ExpressJS, VueJS and NodeJS (MEVN stack)">
    <p>Source code for this project can be found <a href="https://github.com/jamwalaman/vuejs-blogsite" target="_blank" title="Link to source code on GitHub">here</a></p>
    <b-button variant="primary" :to="{name: 'blogs'}">All blogs</b-button>
  </b-jumbotron>

  <b-row v-if="loading">
    <b-col>Loading blogs...</b-col>
  </b-row>

  <b-row v-if="blogs">
    <!-- Only show 6 blogs - most recent first -->
    <b-col md="4" v-for="blog in blogs.slice(0, 6)" :key="blog._id">

      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">
            <router-link :to="{ name: 'blogread', params: { id: blog._id } }">
              <span v-html="blog.title"></span>
            </router-link>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">by {{ blog.author.username }}, {{ blog.createdAt | timefromnow }}</h6>
          <p class="card-text"><span v-html="blog.content.slice(0, 250)"></span>...</p>
        </div>
      </div>

    </b-col>
  </b-row>

</div>
</template>

<script>
import * as blogService from "../services/BlogService"
export default {

  name: 'home',
  metaInfo: {
    title: 'Home'
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

}
</script>
