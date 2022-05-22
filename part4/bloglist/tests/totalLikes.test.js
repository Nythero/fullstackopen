const { totalLikes } = require('../utils/list_helper.js')
const dummyBlogs = require('../tests/dummyBlogs.js')

describe('total likes', ()  => {
  test('of empty list is 0', () => {
    const blogs = []

    const result  = totalLikes(blogs)
    expect(result).toBe(0)
  })
  test('of list with only one element is equals the likes of that', () => {
    const likes = 7
    const blogs = [dummyBlogs[0]]

    const result  = totalLikes(blogs)
    expect(result).toBe(likes)
  })
  test('of list with multiple elements is esquals the sum of each element\' likes', () => {
    const likes = 7+5+12+10+0+2

    const result  = totalLikes(dummyBlogs)
    expect(result).toBe(likes)
  })
})
