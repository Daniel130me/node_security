import NewPost from '../components/NewPost'
import BlogList from '../components/BlogList'

export default function PostsPage({ csrfToken, refreshSignal, onCreated }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Posts</h1>
      <NewPost csrfToken={csrfToken} onCreated={onCreated} />
      <BlogList csrfToken={csrfToken} refreshSignal={refreshSignal} />
    </div>
  )
}
