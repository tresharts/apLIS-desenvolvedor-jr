import EmptyState from './EmptyState'

function DataTable({ columns, rows, loading, emptyState, loadingLabel }) {
  if (loading) {
    return <p className="table-loading">{loadingLabel}</p>
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        title={emptyState.title}
        description={emptyState.description}
      />
    )
  }

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key} data-label={column.label}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
