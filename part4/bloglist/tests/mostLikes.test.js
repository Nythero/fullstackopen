const { mostLikes } = require('../utils/list_helper.js')
const dummyBlogs = require('./dummyBlogs.js')

describe('most likes', () => {
  test('of an empty list should throw an exception', () => {
    const blogs = []
    
    expect(() => mostLikes(blogs)).toThrow()
  })
  test('of a list with one blog should be the author of that blog', () => {
    const author = { author: 'Michael Chan', likes: 7 }
    const blogs = [dummyBlogs[0]]

    const result = mostLikes(blogs)
    expect(result).toEqual(author)
  })
  test('of a list with multiple blogs should be the author with the most likes', () => {
    const author = { author: 'Edsger W. Dijkstra', likes: 17 }
    
    const result = mostLikes(dummyBlogs)
    expect(result).toEqual(author)
  })
  test('of a list where multiple authors have the most likes is the last one to appear for the first time when checking from the front of the list', () => {
    const author = { author: 'Edsger W. Dijkstra', likes: 17 }
    const blogs = dummyBlogs.concat({ 
      _id: "123456789012345678901234",
      title: "Sample Text",
      author: "Michael Chan",
      url: "http://sample.url/",
      likes: 5,
      __v: 0
    })
    
    const result = mostLikes(blogs)
    expect(result).toEqual(author)
  })
})
