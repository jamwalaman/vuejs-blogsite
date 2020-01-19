import { http } from "./HttpService";
// Get list of all blogs
export function getAllBlogs() {
  return http().get("/blogs");
}
// Create blog
export function createBlog(blog) {
  return http().post("/blogs/create", blog);
}
// Read blog
export function getBlogById(id) {
  return http().get(`/blogs/${id}`);
}
// Update blog
export function updateBlog(blog, id) {
  return http().put(`/blogs/${id}`, blog);
}
// Delete blog
export function deleteBlog(id) {
  return http().delete(`/blogs/${id}`);
}
