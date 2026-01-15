import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function NewPost({ csrfToken, onCreated }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const create = async () => {
    const token = csrfToken
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': token },
      body: JSON.stringify({ title, body }),
    })
    if (res.ok) {
      setTitle('')
      setBody('')
      onCreated()
    } else {
      alert('failed to create')
    }
  }

  return (
    <div>
      <h3>New Post</h3>
      <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <textarea placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
      <br />
      <button onClick={create}>Create</button>
    </div>
  )
}
