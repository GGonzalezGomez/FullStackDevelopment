const notes = [
    {
      id: '5a451df7571c224a31b5c8ce',
      title: 'HTML is easy',
      author: 'Chiquito',
      url: 'example.com/chiquito',
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      },
      likes: 32
    },
    {
      id: '5a451e21e0b8b04a45638211',
      title: 'Browser can execute only javascript',
      author: 'Perico el de los palotes',
      url: 'example.com/perico',
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      },
      likes: 15
    },
    {
      id: '5a451e30b5ffd44a58fa79ab',
      title: 'The most important methods of HTTP are GET and POST',
      author: 'Marianico el corto',
      url: 'example.com/marianico',
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      },
      likes: 27
    }
  ]
  
  const getAll = () => {
    return Promise.resolve(notes)
  }
  
  export default { getAll }