function AppShell({ sidebar, children }) {
  return (
    <div className="app-shell">
      {sidebar}
      <main className="app-main">{children}</main>
    </div>
  )
}

export default AppShell
