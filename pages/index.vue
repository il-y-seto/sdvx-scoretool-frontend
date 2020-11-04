<template>
  <v-container>
    <v-form>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <v-text-field v-model="playerName1" label="Player 1" required />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="playerName2" label="Player 2" required />
          </v-col>
          <v-col cols="12" md="1">
            <v-btn color="primary" rounded outlined @click="action">
              Compare
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <level-filter @updateFilter="updateFilter" />
    <score-table
      v-if="hasData"
      :data="data"
      :player-score="playerData1"
      :player-name="playerName1"
      :rival-score="playerData2"
      :rival-name="playerName2"
      :level-filter="levelFilter"
    />
  </v-container>
</template>

<style>
.container {
  font-size: 12px;
}
</style>

<script lang="ts">
import { Context } from "@nuxt/types"
import { Component } from "nuxt-property-decorator"
import { Base } from "../src/vue"
import _ from "lodash"
import ScoreTable from "~/components/ScoreTable.vue"
import ScoreFilter from "~/components/Filter.vue"
import { UserScoreHoge } from "../src/api/score"

export interface UserScoreView extends UserScoreHoge {
  rivalScore: number
  diff: number
}

@Component({
  components: {
    ScoreTable,
    LevelFilter: ScoreFilter,
  },
})
export default class IndexPage extends Base {
  playerName1 = ""
  playerName2 = ""
  playerData1: any = {}
  playerData2: any = {}
  data: UserScoreView[] = []
  isProduction = true
  levelFilter: Array<string> = []

  public get hasData(): boolean {
    return !_.isEmpty(this.playerData1)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async asyncData(context: Context) {
    const playerData1 = await context.app
      .$hoge()
      .api.score.getUserData("trike1236")
    return {
      playerData1,
    }
  }

  // public async created(): Promise<void> {
  //   if (this.$route.params.name) {
  //     // ページにアクセスして遅いの嫌だからSSRにしたい感
  //     this.playerName1 = this.$route.params.name
  //     this.playerData1 = await this.getUserData(this.playerName1, 1)
  //   }
  // }

  public async action(): Promise<any> {
    if (this.isProduction) {
      if (Object.keys(this.playerData1).length) {
        this.playerData2 = await this.getUserData(this.playerName2, 2)
        this.data = this.setRivelScore(this.playerData1, this.playerData2)
      } else {
        Promise.all([
          this.getUserData(this.playerName1, 1),
          this.getUserData(this.playerName2, 2),
        ])
          .then(([playerData1, playerData2]) => {
            this.playerData1 = playerData1
            this.playerData2 = playerData2
            console.log(this.playerData1)
            this.data = this.setRivelScore(this.playerData1, this.playerData2)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } else {
      // this.playerData1 = this.formatScore(json)
      // this.playerData2 = this.formatScore(rivalJson)
      // this.data = this.setRivelScore(this.playerData1, this.playerData2)
    }
  }

  public async getUserData(
    playerName: string,
    area: number
  ): Promise<UserScoreHoge[]> {
    // TODO: promiseの解決から欲しいデータの取得までapiクラスでやるべき
    return await this.$hoge()
      .api.score.getUserData(playerName)
      .catch((err) => {
        console.log(`area: ${area}, msg: ${err}`)
        // this.clearNameField(area)
        throw err
      })
  }

  public updateFilter(filter: any): void {
    this.levelFilter = filter
  }

  // ライバルのスコアと比較して譜面ごとの差分要素を追加する
  public setRivelScore(
    userScores: UserScoreHoge[],
    rivalScores: UserScoreHoge[]
  ): UserScoreView[] {
    return userScores.map((scoreData) => {
      const rival = rivalScores.find((rival) => scoreData.id === rival.id)
      const playerScore = scoreData?.score ?? 0
      const rivalScore = rival?.score ?? 0
      return {
        ...scoreData,
        rivalScore: rivalScore,
        diff: playerScore - rivalScore,
      }
    })
  }
}
</script>
