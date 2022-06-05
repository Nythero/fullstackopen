import Blog from './Blog'

const blogComponent = blog => <Blog key={blog.id} blog={blog} />

const BlogList = ({ blogs }) => blogs.map(blogComponent)

export default BlogList
