import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function BlogList({ csrfToken, refreshSignal }) {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const res = await fetch(`${API_BASE}/posts`, { credentials: 'include' })
    const data = await res.json()
    setPosts(data)
  }

  const deletePost = async (id) => {
    const token = csrfToken
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'x-csrf-token': token },
    })
    if (res.ok) fetchPosts()
    else alert('failed to delete')
  }

  useEffect(() => {
    fetchPosts()
  }, [refreshSignal])

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <div>{p.body}</div>
            <button onClick={() => deletePost(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
