let posts = [
  { id: 1, title: 'Welcome', body: 'This is a simple blog demo showing csrf-csrf.' },
]
let nextId = 2

export function listPosts(req, res) {
  res.json(posts)
}

export function createPost(req, res) {
  const { title, body } = req.body
  if (!title || !body) return res.status(400).json({ error: 'title and body required' })
  const p = { id: nextId++, title, body }
  posts.push(p)
  res.status(201).json(p)
}

export function deletePost(req, res) {
  const id = Number(req.params.id)
  const before = posts.length
  posts = posts.filter((p) => p.id !== id)
  if (posts.length === before) return res.status(404).json({ error: 'not found' })
  res.json({ ok: true })
}
