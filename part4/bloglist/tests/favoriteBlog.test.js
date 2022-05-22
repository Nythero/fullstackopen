const { favoriteBlog } = require('../utils/list_helper.js')
const dummyBlogs = require('../tests/dummyBlogs.js')

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    const blogs = []

    const result = favoriteBlog(blogs)
    expect(result).toEqual(undefined)
  })
  test('of a blog list with only one blog is that blog', () => {
    const blog  = dummyBlogs[0]
    const blogs = [blog]

    const result = favoriteBlog(blogs)
    expect(result).toEqual(blog)
  })
  test('of a blog list with multiple blogs is the blog with most likes', () => {
    const blog  = dummyBlogs[2]

    const result = favoriteBlog(dummyBlogs)
    expect(result).toEqual(blog)
  })
  test('of a blog list with multiple blogs with the most likes is the one with a lower position in the list', () => {
    const blog  = {
      _id: '123456789012345678901234',
      title: 'Sample Text',
      author: 'Sample Text',
      url: 'http://www.sample.url',
      likes: 12,
      __v: 0
    }
    const blogs = [blog].concat(dummyBlogs)

    const result = favoriteBlog(blogs)
    expect(result).toEqual(blog)
  })
})
