import { Api } from "../infrastructure/ajax/api"
import { UserdataService } from "../userdata-service"

export class ScoreApi extends Api {
  public async getUserData(userName: string): Promise<UserScoreHoge[]> {
    return this.apiRequester
      .get<UserData>(`/showUserData.json?username=${userName}`)
      .then((res) => {
        if (!res.profile) {
          // TODO: apiRequestクラスつくってそっちでエラー処理したい(型の都合)
          throw Error("hogehoge")
        }
        return new UserdataService(res).formatScore()
      })
  }
}
export interface UserData {
  profile: Profile
  name: string
  created_at: string
  updated_at: string
  player_id: string
  player_name: string
  skill_lv: number
  skill_frame: number
  volforce: number
  playnum: number
  block: number
}

export interface Profile {
  tracks: UserScore[]
}

export interface UserScore {
  id: number
  title: string
  novice: UserScoreDetail
  advanced: UserScoreDetail
  exhaust: UserScoreDetail
  maximum?: UserScoreDetail
  infinite?: UserScoreDetail
  gravity?: UserScoreDetail
  heavenly?: UserScoreDetail
  vivid?: UserScoreDetail
}

// enumつくる
export interface UserScoreDetail {
  level: number
  clearlamp?: string
  grade?: string
  score?: number
  volforce?: number
  played_count?: number
  cleared_count?: number
  uc_count?: number
  perfect_count?: number
}

export interface UserScoreHoge extends UserScoreDetail {
  id: string
  title: string
  musicId: number
  dificulty: Dificulty
}

export type Dificulty =
  | "novice"
  | "advanced"
  | "exhaust"
  | "maximum"
  | "infinite"
  | "grabity"
  | "hevenly"
  | "vivid"

export function getDefaultUserScoreDetail(): UserScoreDetail {
  return {
    level: 0,
  }
}

export function getDefaultUserScore(): UserScore {
  return {
    id: 0,
    title: "",
    novice: getDefaultUserScoreDetail(),
    advanced: getDefaultUserScoreDetail(),
    exhaust: getDefaultUserScoreDetail(),
  }
}
