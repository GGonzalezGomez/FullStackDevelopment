import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'This is a blog test',
    author: 'Guillermo Gonzalez',
    url: 'example.com',
    likes: 3
  }

  const mockHandler = jest.fn()
/*
  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
*/
  const { container, getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

  expect(container).toHaveTextContent(
    'This is a blog test'
  )

  expect(container).toHaveTextContent(
    'Guillermo Gonzalez'
  )

  expect(container).toHaveTextContent(
    'blog has 3 likes'
  )

})