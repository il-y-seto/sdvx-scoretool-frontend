import { ScoreApi } from "./api/score"
import { ApiRequester } from "./infrastructure/ajax/api-requester"

export class Api {
  public readonly score: ScoreApi

  public constructor(apiRequester: ApiRequester) {
    this.score = new ScoreApi(apiRequester)
  }
}
