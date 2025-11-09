import './Loader.css'

export const Loader = () => {
  return (
    <div className="loader" role="status" aria-label="Loading">
      <div className="spinner"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
