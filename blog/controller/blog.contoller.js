const blog = require("../models/blog.schema");
const user = require("../models/user.schema");
const Fuse = require("fuse.js")

const blogui = (req, res) => {
  res.render("post");
}

const addblog = async (req, res) => {
  let userdata = await user.findById(req.cookies.id);
  let { title, content, image, category } = req.body;
  let data = await blog.create({
    title, content, image, category, author: userdata.username,
  });
  res.cookie("blogId", data.id).send(`blog created by ${userdata.username} `);
}
const getblog = async (req, res) => {
  data = await blog.find();
  res.send(data);
}
const uiblog = (req, res) => {
  res.render("blog")
}
const blogdelete = async (req, res) => {
  let { id } = req.params

  let data = await blog.findByIdAndDelete(id)
  res.send(data)
}

const blogupadate = async (req, res) => {
  let { id } = req.params

  let data = await blog.findByIdAndUpdate(id, req.body)
  res.send(data)
}

const singleblog = async (req, res) => {
  let { id } = req.params

  let singleBlog = await blog.findById(id)
  res.render("singleBlogPage", { singleBlog })
}

const likeupdate = async (req, res) => {
  let { id } = req.cookies
  let { bid } = req.params

  let users = await user.findById(id)

  let blogs = await blog.findById(bid)

  blogs.likedBy.push({ username: users.username })
  await blogs.save()

  res.status(200).cookie("id", users.id)
  res.status(200).cookie("role", users.role).send(blogs)

}

const addcomment = async (req, res) => {
  let { bid } = req.params

  let blogs = await blog.findById(bid)

  blogs.comments.push({ username: user.username, text: req.body.text })
  await blogs.save()

  res.send(blogs)
}
const blogsearch = async (req, res) => {

  let query = req.query.blogs;
  const blogs = await blog.find();

  const options = {
    keys: ["author", "category", "title"],
  };
  const fuse = new Fuse(blogs, options);
  const result = fuse.search(query);
  res.send(result)
}
module.exports = { blogui, addblog, getblog, uiblog, blogdelete, blogupadate, singleblog, likeupdate, addcomment, blogsearch }