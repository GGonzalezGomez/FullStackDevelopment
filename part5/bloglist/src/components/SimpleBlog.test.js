import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'This is a blog test',
    author: 'Guillermo Gonzalez',
    url: 'example.com',
    likes: 3
  }

  const handleClick = (event) => {
      console.log(event.target)
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={handleClick} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'This is a blog test'
  )

  expect(component.container).toHaveTextContent(
    'Guillermo Gonzalez'
  )

  expect(component.container).toHaveTextContent(
    'blog has 3 likes'
  )

})