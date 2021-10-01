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
import { Component, Vue } from "nuxt-property-decorator"
import axios from "axios"
import _ from "lodash"
import ScoreTable from "~/components/ScoreTable.vue"
import ScoreFilter from "~/components/Filter.vue"

@Component({
  components: {
    ScoreTable,
    LevelFilter: ScoreFilter,
  },
})
export default class IndexPage extends Vue {
  playerName1 = ""
  playerName2 = ""
  playerData1 = {}
  playerData2 = {}
  data: any = []
  isProduction = true
  levelFilter: Array<string> = []

  public get hasData(): boolean {
    return !_.isEmpty(this.playerData1)
  }

  public async created(): Promise<void> {
    // if (this.$route.params.name) {
    //   // ページにアクセスして遅いの嫌だからSSRにしたい感
    //   this.playerName1 = this.$route.params.name
    //   this.playerData1 = this.formatScore(await this.callApi(this.playerName1))
    // }
  }

  public async action(): Promise<any> {
    if (this.isProduction) {
      if (Object.keys(this.playerData1).length) {
        this.playerData2 = this.formatScore(
          await this.callApi(this.playerName2)
        )
        this.data = this.setRivelScore(this.playerData1, this.playerData2)
      } else {
        Promise.all([
          this.callApi(this.playerName1),
          this.callApi(this.playerName2),
        ]).then((result) => {
          this.playerData1 = this.formatScore(result[0])
          this.playerData2 = this.formatScore(result[1])
          this.data = this.setRivelScore(this.playerData1, this.playerData2)
        })
      }
    } else {
      // this.playerData1 = this.formatScore(json)
      // this.playerData2 = this.formatScore(rivalJson)
      // this.data = this.setRivelScore(this.playerData1, this.playerData2)
    }
  }

  public async callApi(playerName: any): Promise<any> {
    let response = {}
    await axios
      .get(`http://localhost:8081/api/test`)
      .then((res) => {
        if (res.data.profile) {
          response = res.data.profile.tracks
        }
      })
    // TODO: 取得できなかったときのハンドリング
    return response
  }

  // {id_(難易度): {スコア等}....} の形に変換する
  // 絶対もっとどうにかなるけどJSむずかしい
  public formatScore(scoreData: any): any {
    return _(scoreData)
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

  public updateFilter(filter: any): void {
    this.levelFilter = filter
  }

  // ライバルのスコアと比較して譜面ごとの差分要素を追加する
  public setRivelScore(hoge: any, rivalScores: any): any {
    return _(hoge)
      .map((score, id) => {
        const rival = rivalScores[id]
        return {
          ...score,
          rivalScore: rival.score,
          diff: score.score - rival.score,
        }
      })
      .value()
  }
}
</script>
