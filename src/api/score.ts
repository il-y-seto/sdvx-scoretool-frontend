import { Api } from "../infrastructure/ajax/api"

export class ScoreApi extends Api {
  public async getUserScore(userName: string) {
    return this.apiRequester.get(`/user/${userName}`)
  }
}
