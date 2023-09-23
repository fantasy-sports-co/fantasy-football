import axios, { AxiosError, AxiosResponse } from 'axios'

export default class RestAdapter {
  baseUrl: string
  token: string
  header: object

  constructor(baseUrl: string, token: string, header?: object) {
    this.baseUrl = baseUrl
    this.token = token
    this.header = header || { 'Authorization': this.token }
  }

  // throw cleaner response from integrating rest api
  private _errorHandle(error: unknown) {
    if (error instanceof AxiosError) {
      const err = { ...error.response?.data, code: error.response?.status }
      throw err
    }
  }

  create(resource: string, payload: object) {
    try {
      return axios.post(`${this.baseUrl}${resource}`, payload, {
        headers: this.header
      })
    } catch (error) {
      this._errorHandle(error)
      throw error
    }
  }

  read<T>(resource: string, params?: object): Promise<AxiosResponse<T, T>> {
    try {
      return axios.get(`${this.baseUrl}${resource}`, {
        params: params,
        headers: this.header
      })
    } catch (error) {
      console.log(error)
      this._errorHandle(error)
      throw error
    }
  }

  update(resource: string, params?: object) {
    try {
      return axios.patch(`${this.baseUrl}${resource}`, {
        params: params,
        headers: this.header
      })
    } catch (error) {
      this._errorHandle(error)
      throw error
    }

  }

  delete(resource: string, params?: object) {
    try {
      return axios.delete(`${this.baseUrl}${resource}`, {
        params: params,
        headers: this.header
      })
    } catch (error) {
      this._errorHandle(error)
      throw error
    }
  }

  put(resource: string, params?: object) {
    try {
      return axios.put(`${this.baseUrl}${resource}`, {
        params: params,
        headers: this.header
      })
    } catch (error) {
      this._errorHandle(error)
      throw error
    }
  }
}
