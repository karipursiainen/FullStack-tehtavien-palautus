const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Blogi 1",
        author: "Kari P",
        url: "www.blogi1.fi",
        likes: 1
      },
      {
        title: "Blogi 2",
        author: "Kari Pursi",
        url: "www.blogi2.fi",
        likes: 5
      }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}