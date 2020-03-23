import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Api } from "../infrastructure/ajax/api"

export class ScoreApi extends Api {
  public async getUserScore(userName: string): Promise<NuxtAxiosInstance> {
    return this.apiRequester.get(`/user/${userName}`)
  }
}
