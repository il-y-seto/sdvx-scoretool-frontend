import { UserData } from "./api/score"
import _ from "lodash"

/**
 * ほんとはサーバー側でやるべきだけど現状生データしかないので変換クラスつくった
 */
export class UserdataService {
  private readonly userData: UserData

  public constructor(userData: UserData) {
    this.userData = userData
  }

  // {id_(難易度): {スコア等}....} の形に変換する
  public formatScore(): any {
    return _(this.userData.profile.tracks)
      .map((item) => {
        const title = item.title
        const id = item.id
        return _(item)
          .omit(["title", "id"])
          .map((score, difficulty) => {
            return {
              ...score,
              id: `${id}_${difficulty}`,
              title: title,
              musicId: id,
              difficulty: difficulty,
            }
          })
          .value()
      })
      .flatten()
      .mapKeys((v) => v.id)
      .value()
  }
}
