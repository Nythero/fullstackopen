import { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const blogLiMap = (blog) => <li key={blog.id}>{blog.title}</li>

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
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
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
