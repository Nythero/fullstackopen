import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const isSameUser = (u1) => (u2) => u1.id === u2.id

const includes = (list, elem, equalityFunction) => {
  return list.find(equalityFunction(elem))
}

const usersRowMap = (user) => {
  return (
    <tr key={user.id}>
      <td>
        <Link className='link link-light'to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </td>
      <td>{user.blogs}</td>
    </tr>
  )
}

const ocurrences = (elem, list, equalityFunction) => list.reduce(
  (o, e) => equalityFunction(elem)(e)? o + 1 : o,
  0
)

const Users = () => {
  const blogs = useSelector(state => state.blogs)
  const users = blogs.map(blog => blog.user)
  const usersNoRepeated = users.reduce(
    (us, u) => (includes(us, u, isSameUser))? us : us.concat(u),
    []
  )
  const userWithBlogsQty = user => {
    return { ...user, blogs: ocurrences(user, users, isSameUser) }
  }
  const usersWithBlogs = usersNoRepeated.map(userWithBlogsQty)

  return (
    <div className='px-3'>
      <h2 className='text-light'>users</h2>
      <table className='table table-striped table-dark'>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
          {usersWithBlogs.map(usersRowMap)}
        </tbody>
      </table>
    </div>
  )
}

export default Users
