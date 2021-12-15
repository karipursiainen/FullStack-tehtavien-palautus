import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'kp',
    url: 'www.blog.fi',
    likes: 2
  }

  const component = render(
    <Blog blog={blog} />
  )

  // teht 5.13
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library kp'
  )

})