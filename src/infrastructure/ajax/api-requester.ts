import { NuxtHTTPInstance } from "@nuxt/http"

export class ApiRequester {
  protected httpInstance: NuxtHTTPInstance

  public constructor(http: NuxtHTTPInstance) {
    this.httpInstance = http
  }

  public async get<T>(path: string): Promise<T> {
    return this.request<T>("GET", path)
  }

  protected async request<T>(method: string, url: string): Promise<T> {
    // TODO： 現在GETしかないけどそのうちかわる
    return this.httpInstance.$get<T>(`https://nearnoah.net/api${url}`)
  }
}
