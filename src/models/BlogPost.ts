import mongoose, { Schema, FilterQuery } from "mongoose";

export interface BlogPostSchema {
  title: String;
  body: String;
  datePosted: Date;
}

export function isBlogPost(value: any): value is BlogPostSchema {
  return typeof value.title == "string" && typeof value.body == "string";
}

const blogPostSchema = new Schema<BlogPostSchema>({
  title: String,
  body: String,
  datePosted: { type: Date, default: Date.now },
});

export const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export function findBlogPost(filter: FilterQuery<BlogPostSchema>) {
  return BlogPost.find(filter);
}

export function findBlogPostById(postId: string) {
  return BlogPost.findById(postId);
}
export function createBlogPost(blogPost: BlogPostSchema) {
  return BlogPost.create(blogPost);
}
