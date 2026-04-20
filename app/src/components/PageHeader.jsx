function PageHeader({ eyebrow, title, description, badge }) {
  return (
    <header className="page-header">
      <div>
        <span className="page-header__eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="page-header__badge">{badge}</div>
    </header>
  )
}

export default PageHeader
