const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  if(blogs.length!=0)
    return blogs.reduce(reducer, 0)
  else
    return 0
}

const favoriteBlog = (blogs) => {
  const reducer = (fav, item) => {
    if(fav.likes<item.likes)
      return {'title': item.title, 'author': item.author, 'likes': item.likes}
    else
      return {'title': fav.title, 'author': fav.author, 'likes': fav.likes}
  }
  if(blogs.length!=0)
    return blogs.reduce(reducer,blogs[0])
  else
    return {}
}

const mostBlogs = (blogs => {
  /*
  const authorBlogs = lodash.groupBy(blogs, function(b) { return b.author})
  console.log( lodash.map(authorBlogs, function(b) {
    console.log(b)
    console.log(Object.keys(b))
    return 2}) )
  */
  //console.log(Object.keys(authorBlogs))
  const authorBlogs = lodash.countBy(blogs, function(b) { return b.author})
  //lodash.each(authorBlogs, b
  lodash.reduce(authorBlogs, function (result, value, key) {
    //if(value>result.)
    return 1
  },{'N/A': -1})
  return 1
})
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}