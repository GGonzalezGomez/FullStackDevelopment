import React, { useState, useEffect } from 'react'
import logo from './logo.png'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  // Retrieve list of all blogs
  const effectHook = () => {
    console.log("Running Effect Hook")
    blogsService.getAll().then(blogs => {
      console.log('Response received')
      setBlogs(blogs)
    })
  }

  useEffect(effectHook,[])

  // Check if the user is still logged in through local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      console.log('logging in with', username, password)
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch(e){
      console.log(e)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try{
      console.log('logging ' + user.name + ' out...')
      setUser(null)
      window.localStorage.removeItem('user')
    } catch(e){
      console.log(e)
    }
  }

  if(user === null) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Login to application</h2>
        </header>      

        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  else {
    return(
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button id='logout' onClick={handleLogout}>Logout</button></p>
        <div>
          {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
        </div>
      </div>
    )
  }
}

export default App;
