function FeedbackMessage({ type, title, message }) {
  if (!message) {
    return null
  }

  return (
    <div className={`feedback-message feedback-message--${type}`} role="status">
      <strong>{title}</strong>
      <span>{message}</span>
    </div>
  )
}

export default FeedbackMessage
