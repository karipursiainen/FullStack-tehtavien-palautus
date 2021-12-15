import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
//import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll] = useState(false)
  //const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)
  const [blogVisible, setBlogVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs(initialBlogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setNewBlog('')
    //setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes(0)
  }

  const toggleImportanceOf = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, important: !blog.important }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      //.catch(error => {
    setErrorMessage(
      `Note '${blog.content}' was already removed from server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    //})
  }

  /*
  const handleBlogChange = (event) => {
    console.log(event.target.value)
    setNewBlog(event.target.value)
  }
  */
  /*
  const handleNewAuthor = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleNewLikes = (event) => {
    console.log(event.target.value)
    setNewLikes(event.target.value)
  }
  */

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogsToShow = showAll
    ? blogs
    : blogs.sort((a, b) => {
      let fa = a.likes,
        fb = b.likes

      if (fa > fb) {
        return -1
      }
      if (fa < fb) {
        return 1
      }
      return 0
    })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    //console.log('logging in with', username, password)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id='login-1st' onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id="login-button-cnb"  onClick={() => setBlogVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={newBlog}
            author={newAuthor}
            url={newUrl}
            likes={newLikes}
            handleTitleChange={({ target }) => setNewBlog(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            handleLikesChange={({ target }) => setNewLikes(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  /*
  const sortedBlog = blogs.sort((a, b) => {
    let fa = a.likes,
        fb = b.likes;

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });
  */

  /*
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <p>Title: <input value={newBlog} onChange={handleBlogChange}/><br />
      Author: <input value={newAuthor} onChange={handleNewAuthor}/><br />
      Url: <input value={newUrl} onChange={handleNewUrl}/><br />
      Likes: <input value={newLikes} onChange={handleNewLikes}/><br />

      <button type="submit">create</button></p>
    </form>
  )
  */
  /****/
  if (user === null) {
    return(
      <div>
        <h2>Log in application</h2>

        <Notification message={errorMessage} color='red'/>

        {loginForm()}
      </div>
    )
  }
  /**/

  return (

    <div>
      <h2>Blogs</h2>

      <Notification message={errorMessage} color='green'/>

      <div>
        <form onSubmit={handleLogout}>
          <p>{user.name} logged in
            <button type="submit">logout</button></p>
        </form>
        {blogForm()}
      </div>

      {blogsToShow.map(blog =>
        <Blog
          key={blog.i}
          blog={blog}
          toggleImportance={() => toggleImportanceOf(blog.id)}/>
      )}
    </div>
  )
}

export default App