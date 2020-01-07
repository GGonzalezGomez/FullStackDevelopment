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
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}