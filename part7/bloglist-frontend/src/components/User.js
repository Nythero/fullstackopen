import { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const blogLiMap = (blog) => <li className='list-group-item list-group-item-dark' key={blog.id}>{blog.title}</li>

const User = () => {
  const [user, setUser] = useState(null)
  const id = useParams().id

  useEffect(() => {
    const effect = async () => {
      const u = await userService.get(id)
      setUser(u)
    }
    effect()
  }, [])

  if(user) {
    return (
      <div className='px-3'>
        <h2 className='text-light'>{user.name}</h2>
        <h3 className='text-light'>added blogs</h3>
        <ul className='list-group'>
          {user.blogs.map(blogLiMap)}
        </ul>
      </div>
    )
  }
  else {
    return <div>Loading...</div>
  }
}

export default User
