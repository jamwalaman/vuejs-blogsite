<template>

  <b-row>
    <b-col md="9" class="m-md-auto shadow rounded p-4 white_bg">

      <h1 class="display-4 mb-4">Create Blog</h1>
      <b-form v-on:submit.prevent="onSubmit">
        <!-- Title -->
        <b-form-group label="Title:" label-for="title">
          <b-form-input id="title" v-model="blog.title" :class="[err && err.errors.title ? 'is-invalid' : '']" placeholder="Enter blog title"></b-form-input>
          <!-- Show error if title field is blank -->
          <div v-if="err && err.errors.title" class="invalid-feedback">
            {{ err.errors.title }}
          </div>
        </b-form-group>
        <!-- Content -->
        <b-form-group label="Content:" label-for="content">
          <b-form-textarea id="content" v-model="blog.content" :class="[err && err.errors.content ? 'is-invalid' : '']" rows="9" max-rows="9" placeholder="Enter blog content"></b-form-textarea>
          <!-- Show error if content field is blank -->
          <div v-if="err && err.errors.content" class="invalid-feedback">
            {{ err.errors.content }}
          </div>
        </b-form-group>

        <!-- Submit -->
        <b-button type="submit" class="mb-3">Submit</b-button>
      </b-form>

    </b-col>
  </b-row>
</template>
<script>
import * as blogService from "../services/BlogService";
export default {
  name: "blogcreate",
  data: function() {
    return {
      blog: {
        title: "",
        content: ""
      },
      err: ""
    };
  },
  methods: {
    onSubmit: async function() {
      await blogService
        .createBlog(this.blog)
        .then(res => {
          if (res) {
            this.$router.push({
              name: "blogread",
              params: { id: res.data._id }
            });
            this.flash("Blog created successfully", "success");
          }
        })
        .catch(error => {
          this.err = error.response.data;
        });
    }
  }
};
</script>
