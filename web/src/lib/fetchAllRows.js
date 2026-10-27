// Lê todas as linhas de uma consulta paginando em blocos de pageSize.
// buildQuery(from, to) deve devolver a consulta já ordenada de forma estável com .range(from, to).
export async function fetchAllRows(buildQuery, pageSize = 1000) {
  const rows = []
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await buildQuery(from, from + pageSize - 1)
    if (error) throw error
    const page = data ?? []
    rows.push(...page)
    if (page.length < pageSize) return rows
  }
}
