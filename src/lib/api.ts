import axios from 'axios'



export type Resource =
  | 'files'
  | 'signing-data'
  | 'containers'

class ApiClient {
  readonly base = '/api/v1'
  private readonly http = axios.create()

  async get(resource: Resource, pathSegments: any | Array<string> = [], params = {}) {
    let path = [this.base, resource, ...[].concat(pathSegments)].join('/')
    let res = await this.http.get(path, { params })

    return res?.data
  }

  async post(path: Resource, body?) {
    let ret = await this.http.post(`${this.base}/${path}`, body)
    return ret.data
  }

  async uploadFile(file: File) {
    let formData = new FormData()
    formData.append('file', file)

    let ret = await this.http.post(`${this.base}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return ret.data
  }

  deleteFile(id) {
    return this.http.delete(`${this.base}/files/${id}`)
  }

  getContainerDownloadLink(id: string) {
    return `${this.base}/containers/${id}`
  }
}

export const api = new ApiClient()
