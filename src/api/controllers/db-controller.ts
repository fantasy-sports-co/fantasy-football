import { supabaseClient, supabaseAdmin } from '../../db/supabase-clients'
import { SupabaseClient } from '@supabase/supabase-js'
import ErrorObject from '../tools/error'
import { PoolClient } from 'pg'
import { pgInstance } from '../../db/pg'

export default class DBController {
  private tableName: string
  private pgInstance?: PoolClient
  nameSpace: string
  supabase: SupabaseClient

  constructor(tableName: string, pgInstance?: PoolClient, nameSpace?: string,) {
    this.tableName = tableName
    this.nameSpace = nameSpace || tableName
    this.pgInstance = pgInstance
    this.supabase = this.nameSpace === 'user' ? supabaseAdmin : supabaseClient
  }

  async runQuery<T>(query: string, args?: string[]): Promise<T[]> {
    try {
      const { rows } = await pgInstance.query(query, args || [])
      return rows
    } catch (error: any) {
      throw { code: 500, error: `${error}` } as ErrorObject
    }
  }

  async get<T>(selectColumns: string[], whereClause: object, maxLimit = 1000) {
    const { data, error } = await this.supabase.from(this.tableName)
      .select(selectColumns.toString())
      .match(whereClause)
      .limit(maxLimit)
    if (error) throw { code: 500, error: error } as ErrorObject
    return data as T[]
  }

  async create<S, T>(insertRows: S[]) {
    const { data, error } = await this.supabase.from(this.tableName)
      .insert(insertRows)
      .select('*')
    console.log(error)
    console.log(data)


    if (error) throw { code: 500, error: error } as ErrorObject
    return data as T[]
  }

  async update<S, T>(updateParams: S, column: string, id: string | number) {
    const { data, error } = await this.supabase.from(this.tableName)
      .update(updateParams)
      .eq(column, id)
      .select()
    if (error) throw { code: 500, error: error } as ErrorObject
    return data as T[]
  }

  async delete<T>(column: string, id: string | number) {
    const { data, error } = await this.supabase.from(this.tableName)
      .delete()
      .eq(column, id)
      .select()
    if (error) throw { code: 500, error: error } as ErrorObject
    return data as T[]
  }
}
