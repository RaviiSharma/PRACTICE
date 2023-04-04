const Blog = require("../model/Blog");

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    console.log(error);
  }
  if (!blogs) return res.status(404).json({ message: "No product found" });
  return res.status(200).json({ blogs });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!blog) return res.status(404).json({ message: "No blog found" });
  return res.status(200).json({ blog });
};

const addBlog = async (req, res, next) => {
  const { name, auther, description, body } = req.body;
  let blog;
  try {
    blog = new Blog({
      name,
      auther,
      description,
      body,
    });
    await blog.save();
  } catch (error) {
    console.log(error);
  }
  if (!blog) return res.status(500).json({ message: "unable to add" });
  return res.status(201).json({ blog });
};

const updateBlog = async (req, res, next) => {
  const id = req.params.id;
  const { name, auther, description, body } = req.body;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(id, {
      name,
      auther,
      description,
      body,
    });
    blog = await blog.save();
  } catch (error) {
    console.log(error);
  }
  if (!blog)
    return res.status(404).json({ message: "unable to update by this id" });
  return res.status(200).json({ blog });
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!blog) return res.status(404).json({ message: "unable to delete by id" });
  return res.status(200).json({ message: "Blog successfully deleted" });
};

exports.getAllBlogs = getAllBlogs;
exports.addBlog = addBlog;
exports.getById = getById;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;