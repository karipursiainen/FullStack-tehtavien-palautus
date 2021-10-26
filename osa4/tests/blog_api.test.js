const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
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
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "Blogi 5",
        author: "Kari Pursi",
        url: "www.blogi5.fi",
        likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
      'Blogi 5'
    )
})

test('blog without likes -> likes = 0', async () => {
    const newBlog = {
        title: "Blogi 7",
        author: "Kari Pursi",
        url: "www.blogi7.fi"
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
  
    const response = await api.get('/api/blogs')

    const likes2 = response.body.map(r => r.likes)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(likes2).toContain(0)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })
  
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with statuscode 500 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(500)
  })

afterAll(() => {
  mongoose.connection.close()
})