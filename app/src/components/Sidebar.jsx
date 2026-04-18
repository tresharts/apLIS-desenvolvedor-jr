function Sidebar({
  appName,
  appSubtitle,
  sectionsLabel,
  localeLabel,
  items,
  activeItem,
  onNavigate,
  locale,
  localeOptions,
  onLocaleChange,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__eyebrow">React SPA</span>
        <h1>{appName}</h1>
        <p>{appSubtitle}</p>
      </div>

      <div className="sidebar__group">
        <span className="sidebar__label">{sectionsLabel}</span>
        <nav className="sidebar__nav" aria-label={sectionsLabel}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar__nav-item ${
                activeItem === item.id ? 'is-active' : ''
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="sidebar__nav-title">{item.label}</span>
              <span className="sidebar__nav-description">{item.description}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar__group sidebar__group--locale">
        <span className="sidebar__label">{localeLabel}</span>
        <div className="sidebar__locale-switcher" role="group" aria-label={localeLabel}>
          {localeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`sidebar__locale-button ${
                locale === option.value ? 'is-active' : ''
              }`}
              onClick={() => onLocaleChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
