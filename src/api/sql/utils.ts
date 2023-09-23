import { getPositionalArgs } from "../tools/sql-tools"
export const MAX_LIMIT = 50

export const parseOffsetLimit = (limit: any, page: any) => {
  let offset = 0
  let pageInt = parseInt(page || 0)
  const limitInt = parseInt(limit || 0)
  let lim = limitInt > MAX_LIMIT || !limitInt ? MAX_LIMIT : limitInt
  if (pageInt) {
    offset = lim * (pageInt - 1)
  }
  return {
    limit: lim,
    offset
  }
}

export const parseQueryColumns = (filterColumns: string[], params: any | object) => {
  const filters = filterColumns.filter(c => Object.keys(params).includes(c))
  const args = getPositionalArgs(filters)
  const values = filters.map(filter => params[filter])
  return {
    args,
    values
  }
}
