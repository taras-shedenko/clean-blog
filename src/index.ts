import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {
  isBlogPost,
  findBlogPost,
  findBlogPostById,
  createBlogPost,
} from "./models/BlogPost";

const app = express();

app.use(express.static("public"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const searchQuery = (req.query["search-query"] as string) ?? "";
  const filter = {} as any;
  if (searchQuery) filter.title = new RegExp(searchQuery, "i");
  const blogPosts = await findBlogPost(filter);

  res.render("index", { blogPosts, searchQuery });
});

app.get("/about", (...[, res]) => res.render("about"));

app.get("/post/new", (...[, res]) => res.render("create"));

app.get("/post/:postId", async ({ params }, res) => {
  const post = await findBlogPostById(params.postId);
  res.render("post", { post });
});

app.post("/post/new", async ({ body }, res) => {
  if (isBlogPost(body) && body.title.length) {
    await createBlogPost(body);
  }
  res.redirect("/");
});

mongoose.connect(
  "mongodb://localhost/clean-blog-db",
  (err) => err && console.log("Error during connecting to DB", err)
);

app.listen(3000, () => "Clean Blog is up and running at port 3000");
