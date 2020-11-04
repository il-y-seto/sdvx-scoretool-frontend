import { UserData, UserScore, UserScoreHoge } from "./api/score"

/**
 * ほんとはサーバー側でやるべきだけど現状生データしかないので変換クラスつくった
 */
export class UserdataService {
  private readonly userData: UserData

  public constructor(userData: UserData) {
    this.userData = userData
  }

  // {id_(難易度): {スコア等}....} の形に変換する
  public formatScore(): UserScoreHoge[] {
    let scoreData: UserScoreHoge[] = []
    this.userData.profile.tracks.forEach((item: UserScore) => {
      const id = item.id
      const title = item.title
      for (const [difficulty, score] of Object.entries(item)) {
        if (difficulty !== "id" && difficulty !== "title") {
          scoreData.push({
            ...score,
            id: `${id}_${difficulty}`,
            title: title,
            musicId: id,
            difficulty: difficulty,
          })
        }
      }
    })
    return scoreData
  }
}
