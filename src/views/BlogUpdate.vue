<template>

  <b-row>
    <b-col md="9" class="m-md-auto shadow rounded p-4 white_bg">

      <h1 class="display-4 mb-4">Update Blog</h1>
      <pre v-if="err"></pre>
      <b-form v-on:submit.prevent="onSubmit">
        <!-- Title -->
        <b-form-group label="Title:" label-for="title">
          <b-form-input id="title" v-model="blog.title" :class="[err && err.errors.title ? 'is-invalid' : '']" placeholder="Enter blog title"></b-form-input>
        </b-form-group>
        <!-- Content -->
        <b-form-group label="Content:" label-for="content">
          <b-form-textarea id="content" v-model="blog.content" :class="[err && err.errors.content ? 'is-invalid' : '']" rows="9" max-rows="9" placeholder="Enter blog content"></b-form-textarea>
        </b-form-group>
        <!-- Update -->
        <b-button variant="primary" type="submit" class="mr-3">Save</b-button>
        <b-button variant="secondary" @click="goBack">Go back</b-button>
      </b-form>

    </b-col>
  </b-row>
</template>
<script>
import * as blogService from "../services/BlogService";
export default {
  name: "blogupdate",
  data: function() {
    return {
      blog: {
        title: "",
        content: ""
      },
      err: ""
    };
  },
  metaInfo() {
    return { title: `Update blog: ${this.blog.title}` }
  },
  beforeRouteEnter(to, from, next) {
    blogService.getBlogById(to.params.id).then(res => {
      next(vm => {
        vm.blog = res.data;
      })
    });
  },
  methods: {
    onSubmit: async function() {
      await blogService.updateBlog(this.blog, this.blog._id);
      this.$router.push({
        name: "blogread",
        params: { id: this.blog._id }
      });
      this.flash("Blog updated successfully", "success");
    },
    goBack: function() {
      this.$router.push({ name: 'blogread', params: {id: this.blog._id} });
    }
  }
};
</script>
