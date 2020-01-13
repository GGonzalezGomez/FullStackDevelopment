import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


let component

const blog = {
    title: 'This is a blog test',
    author: 'Guillermo Gonzalez',
    url: 'example.com',
    likes: 3,
    user: {
        name: "GG",
        username: "ggonzalez"
    },
    expanded: false
  }

const mockHandler = jest.fn(() => {blog.expanded = true})
const mockLikeHandler = jest.fn()
const mockRemoveHandler = jest.fn()

describe('<Togglable />', () => {
    
    test('at start the children are not displayed', () => {
      component = render(
        <Blog blog={blog} handleClick={mockHandler} handleLikeClick={mockLikeHandler} handleRemoveClick={mockRemoveHandler} />
      )
      const div = component.container.querySelector('.togglableContent')    
      expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
      component = render(
        <Blog blog={blog} handleClick={mockHandler} handleLikeClick={mockLikeHandler} handleRemoveClick={mockRemoveHandler} />
      )
      const main = component.container.querySelector('.mainSection')
      const button = main
      fireEvent.click(button)

      component = render(
        <Blog blog={blog} handleClick={mockHandler} handleLikeClick={mockLikeHandler} handleRemoveClick={mockRemoveHandler} />
      )
    
      const div = component.container.querySelector('.togglableContent')
      expect(div).not.toHaveStyle('display: none')
    })

})