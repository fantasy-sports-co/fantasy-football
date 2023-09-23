export default interface ErrorObject {
  message?: string
  code?: number
  error?: string | Object | Array<any>
}

// Postgrest Error mapper, not all codes are covered though.
// Just ones we encounter for now during development
// in case you encounter any, please add here
export const codeMapper = new Map<string, number>([
  ['23505', 409],
  ['23502', 409],
])
