import React, { useState, useEffect } from 'react'
import logo from './logo.png'
import Blog from './components/Blog'
import NewEntry from './components/NewEntry'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogsService from './services/blogs'
import {useField} from './hooks/index'

const App = () => {
  const [notmsg, setNotificationMessage] = useState({"message": null, "type": "errornotification"})
  const newEntryFormRef = React.createRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')


  // Effect Hooks
  // -----------------------------------------------------------------------------

  // Retrieve list of all blogs
  const effectHook = () => {
    console.log("Running Effect Hook")
    blogsService.getAll().then(blogs => {
      console.log('Response received')
      blogs.forEach(blog => {blog.expanded = false})
      // sort from most likes to less
      blogs.sort((a,b) => {
        if(a.likes < b.likes)
          return 1
        if(a.likes > b.likes)
          return -1
        return 0
      })
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

  // Handling functions
  // -----------------------------------------------------------------------------

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      console.log('logging in with', username, password)
      const user = await loginService.login({username, password})
      setNotificationMessage({"message": `Welcome '${user.name}'`, "type": "notification"})
      setTimeout( () => {
        setNotificationMessage({"message": null, "type": "errornotification"})
      },3000)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch(e){
      console.log(e)
      setNotificationMessage({"message": "Wrong username or password", "type": "errornotification"})
      setTimeout( () => {
        setNotificationMessage({"message": null, "type": "errornotification"})
      },3000)
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
      setNotificationMessage({"message": e.message, "type": "errornotification"})
      setTimeout( () => {
        setNotificationMessage({"message": null, "type": "errornotification"})
      },3000)
    }
  }

  const handleCreateNewEntry = async (event) => {
    event.preventDefault()
    try{
      newEntryFormRef.current.toggleVisibility()
      const response = await blogsService.createNewBlog({user,newTitle: newTitle.value,newAuthor: newAuthor.value,newUrl: newUrl.value})
      var tmpBlogs = [...blogs]
      tmpBlogs.push(response)
      setNotificationMessage({"message": `a new blog: '${newTitle.value}' by '${newAuthor.value}'`, "type": "notification"})
      setTimeout( () => {
        setNotificationMessage({"message": null, "type": "errornotification"})
      },3000)
      setBlogs(tmpBlogs)
      newTitle.reset()
      newUrl.reset()
      newAuthor.reset()
    } catch(e){
      console.log(e)
      setNotificationMessage({"message": e.message, "type": "errornotification"})
      setTimeout( () => {
        setNotificationMessage({"message": null, "type": "errornotification"})
      },3000)
    }
  }


  const handleExtendedBlog = (event) => {
    var tmpBlogs = [...blogs]
    tmpBlogs.forEach(blog => {
      if(blog.id === event.target.id)
        blog.expanded = !blog.expanded
    })
    setBlogs(tmpBlogs)
  }

  const handleBlogLike = async (event) => {
    event.preventDefault()
    try{
      var updatedBlog = {}
      var tmpBlogs = JSON.parse(JSON.stringify( blogs )) // Avoiding shallow copy to update the element
      tmpBlogs.forEach(blog => {
        if(blog.id === event.target.id){
          blog.likes = blog.likes+1
          updatedBlog = {...blog}
        }
      })
      await blogsService.updateBlog({user, 'title': updatedBlog.title, 
        'author': updatedBlog.author, 'url': updatedBlog.url, 'likes': updatedBlog.likes,
        'userid': updatedBlog.user.id, 'id': updatedBlog.id})
      tmpBlogs.sort((a,b) => {
        if(a.likes < b.likes)
          return 1
        if(a.likes > b.likes)
          return -1
        return 0
      })
      setBlogs(tmpBlogs)
    } catch(e){
      console.log(e)
      setNotificationMessage({"message": e.message, "type": "errornotification"})
      setTimeout( () => {
        setNotificationMessage({"message": null, "type": "errornotification"})
      },3000)
    }
  }

  const handleBlogDelete = async (event) => {
    event.preventDefault()
    try{
      const blogToDelete = blogs.filter(blog => blog.id === event.target.id)
      if(user.username !== blogToDelete[0].user.username){
        return null
      }
      if(!window.confirm(`remove '${blogToDelete[0].title}' by '${blogToDelete[0].author}'`)){
        return null
      }
      var tmpBlogs = []
      blogs.forEach(blog => {
        if(blog.id !== event.target.id){
          tmpBlogs.push(blog)
        }
      })
      await blogsService.removeBlog({'id': event.target.id, 'user': user})
      setBlogs(tmpBlogs)
    } catch(e){
      console.log(e)
      setNotificationMessage({"message": e.message, "type": "errornotification"})
      setTimeout( () => {
        setNotificationMessage({"message": null, "type": "errornotification"})
      },3000)
    }
  }


  // Main routine
  // -----------------------------------------------------------------------------

  if(user === null) {
    return (
      <div className="App">
        <header className="App-header">
         <Notification message={notmsg.message} type={notmsg.type} />
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
        <Notification message={notmsg.message} type={notmsg.type} />
        <h2>Blogs</h2>
        <div>
          <p>{user.name} logged in <button id='logout' onClick={handleLogout}>Logout</button></p>
        </div>
        <Togglable buttonLabel='create new' ref={newEntryFormRef}>
          <NewEntry newTitle={{...newTitle}} newAuthor={{...newAuthor}} newUrl={{...newUrl}} handleCreateNewEntry={handleCreateNewEntry} />
        </Togglable>
        <div>
          {blogs.map(blog =><Blog key={blog.id} blog={blog} handleClick={handleExtendedBlog} handleLikeClick={handleBlogLike} handleRemoveClick={handleBlogDelete} />)}
        </div>
      </div>
    )
  }
}

export default App;
