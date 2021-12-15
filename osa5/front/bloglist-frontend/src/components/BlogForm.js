import React from 'react'

const BlogForm = ({
  title,
  author,
  url,
  likes,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleLikesChange,
  handleSubmit
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Title: <input id="input-title" value={title} onChange={handleTitleChange}/><br />
      Author: <input id="input-author" value={author} onChange={handleAuthorChange}/><br />
      Url: <input id="input-url" value={url} onChange={handleUrlChange}/><br />
      Likes: <input id="input-likes" value={likes} onChange={handleLikesChange}/><br />

          <button id="create-button" type="submit">create</button></p>
      </form>
    </div>
  )
}

export default BlogForm