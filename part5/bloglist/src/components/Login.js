import React from 'react'

const Login = (props) => {
    return(
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

export default Login