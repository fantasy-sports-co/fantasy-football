export const getInsertProperties = (rows: object[], columns: string[]) => {
  columns = columns || Object.keys(rows[0])
  // flatten all rows into single values array in columns order
  const values: string[] = [].concat(
    ...rows.map(r => columns.map(c => r[c]))
  )
  // create placeholders for each row, like ($1, $2, ...), ($1, $2, ...)
  const placeholders = rows.map((_, i) =>
    '(' + columns.map((_, j) => `$${i * columns.length + j + 1}`).join(', ') + ')'
  ).join(', ')

  return {
    columns: columns.join(', '),
    values,
    placeholders
  }
}

export const getPositionalArgs = (params: string[], joinVal = ' and ', offset = 1) => {
  return params.map((column, key) => `${column} = $${key + offset}`).join(joinVal)
}

export const getListArgs = (params: string[] | number[], offset = 1) => {
  let nextOffset = offset
  const args = params.map((_, key) => {
    nextOffset = key + offset
    return `$${nextOffset}`
  }
  ).join(' , ')
  return { args, nextOffset: nextOffset + 1 }
}

const args = getListArgs(['538', '544'])
console.log(args)
