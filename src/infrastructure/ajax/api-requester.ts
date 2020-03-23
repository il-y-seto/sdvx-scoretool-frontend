import { NuxtAxiosInstance } from "@nuxtjs/axios"

export class ApiRequester {
  protected AxiosInstance: NuxtAxiosInstance

  public constructor(axios: NuxtAxiosInstance) {
    this.AxiosInstance = axios
  }

  public async get(path: string): Promise<NuxtAxiosInstance> {
    return this.request("GET", path)
  }

  protected async request(
    method: string,
    url: string
  ): Promise<NuxtAxiosInstance> {
    return this.AxiosInstance.get(
      `https://pyzzle.herokuapp.com/api/sdvx/${url}`
    )
  }
}
