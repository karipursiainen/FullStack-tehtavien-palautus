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

/*
  //component.debug()
  const dev = component.container.querySelector('dev')
  console.log(prettyDOM(dev))
  */
  // tapa 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library kp'
  )
  // tapa 2
  const element = component.getAllByText(
    'Component testing is done with react-testing-library kp www.blog.fi 2'
  )
  expect(element).toBeDefined()


  // tapa 3
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

})