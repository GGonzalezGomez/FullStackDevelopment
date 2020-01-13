import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: () => {
    savedItems = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    // Check that login screen is rendered
    expect(component.container).toHaveTextContent(
      'Login to application'
    )

    // If login is rendered, blogs cannot be shown
    expect(component.container).not.toHaveTextContent(
      'Browser can execute only javascript'
    )
  })


  test('if no user logged, blogs are not rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    localStorage.setItem('user', JSON.stringify(user))

    console.log(localStorage.getItem('user'))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Logout')
    )

    //component.debug()

    // Check that login screen is rendered
    expect(component.container).not.toHaveTextContent(
      'Login to application'
    )
    
    // If login is rendered, blogs cannot be shown
    expect(component.container).toHaveTextContent(
      'Browser can execute only javascript'
    )
  })

})