const { mostBlogs } = require('../utils/list_helper.js')
const dummyBlogs = require('./dummyBlogs.js')

describe('most blogs', () => {
  test('of an empty list should throw an exception', () => {
    const blogs = []
    
    expect(() => mostBlogs(blogs)).toThrow()
  })
  test('of a list with one blog should be the author of that blog', () => {
    const author = { author: 'Michael Chan', blogs: 1 }
    const blogs = [dummyBlogs[0]]

    const result = mostBlogs(blogs)
    expect(result).toEqual(author)
  })
  test('of a list with multiple blogs should be the author with the most blogs', () => {
    const author = { author: 'Robert C. Martin', blogs: 3 }
    
    const result = mostBlogs(dummyBlogs)
    expect(result).toEqual(author)
  })
  test('of a list with multiple blogs with the most blogs is the last one to appear for the first time when checking from the front of the list', () => {
    const author = { author: 'Robert C. Martin', blogs: 3 }
    const blogs = dummyBlogs.concat({ 
      _id: "123456789012345678901234",
      title: "Sample Text",
      author: "Edsger W. Dijkstra",
      url: "http://sample.url/",
      likes: 10,
      __v: 0
    })
    
    const result = mostBlogs(blogs)
    expect(result).toEqual(author)
  })
})
