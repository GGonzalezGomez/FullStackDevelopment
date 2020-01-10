import React from 'react'

const Blog = ({ blog,handleClick }) => {
  //const hideWhenVisible = { display: blog.expanded ? 'none' : '' }
  const showWhenVisible = { display: blog.expanded ? '' : 'none' }
  return (
    <div onClick={handleClick} style={{'color': 'black', 'background': 'lightgrey', 'fontSize': '10px', 'borderStyle': 'solid', 'borderRadius': '5px', 'padding': '3px', 'marginBottom': '3px', 'marginTop': '3px'}}>
      <p id={blog.id} style={{'marginTop': '0px','marginBottom': '0px'}}>{blog.title} {blog.author}</p>
      <div style={showWhenVisible}>
        <p id={blog.id} style={{'marginTop': '0px','marginBottom': '0px'}}><a href={blog.url}>{blog.url}</a></p>
        <p id={blog.id} style={{'marginTop': '0px','marginBottom': '0px'}}>{blog.likes} likes</p>
        <p id={blog.id} style={{'marginTop': '0px','marginBottom': '0px'}}>added by {blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog