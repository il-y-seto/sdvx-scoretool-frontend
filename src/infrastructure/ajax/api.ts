import { ApiRequester } from "./api-requester"

export class Api {
  protected apiRequester: ApiRequester

  public constructor(apiRequester: ApiRequester) {
    this.apiRequester = apiRequester
  }
}
