<template>
  <v-container>
    <div id="charts" />
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :items-per-page="100"
    />
  </v-container>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator"
import _ from "lodash"
//import ApexCharts from 'apexcharts'

@Component
export default class ScoreTable extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  playerScore!: object

  @Prop({
    type: String,
    required: true,
  })
  playerName!: string

  @Prop({
    type: Array,
    required: true,
  })
  levelFilter!: Array<string>

  @Prop({
    type: Object,
    required: true,
  })
  rivalScore!: object

  @Prop({
    type: String,
    required: true,
  })
  public rivalName!: string

  public search = ""

  public itemsPerPage = 100

  public footerProps: object = {
    "items-per-page-options": [10, 50, 100],
  }

  public defaultHeaders: Array<object> = [
    { text: "title", value: "title" },
    { text: "level", value: "level" },
    { text: "difficulty", value: "difficulty" },
    { text: "clearlamp", value: "clearlamp" },
    { text: "grade", value: "grade" },
    // TODO: playerName表示
    { text: "playerScore", value: "score" },
  ]

  // TODO: v-data-tableのfilter機能を使う
  public get filteredItems(): any {
    let hoge
    if (!this.levelFilter.length) {
      hoge = _.values(this.score)
    } else {
      hoge = _(this.score)
        .filter((score: any) => _.includes(this.levelFilter, score.level))
        .value()
    }

    // とりあえずスコア差ある曲だけ表示
    return !this.hasRivalScore
      ? _(hoge)
          .filter((uni: any) => uni.score)
          .value()
      : _(hoge)
          .filter((uni: any) => uni.diff)
          .value()
    //return _(hoge).filter((uni) => uni.diff).value()
  }

  public get score(): object {
    if (!this.hasRivalScore) {
      return this.playerScore
    }
    return this.setRivelScore(this.playerScore, this.rivalScore)
  }

  public get hasRivalScore(): boolean {
    return Object.keys(this.rivalScore).length >= 0
  }

  public get headers(): Array<object> {
    if (!this.hasRivalScore) {
      return this.defaultHeaders
    } else {
      return this.defaultHeaders.concat([
        { text: this.rivalName, value: "rivalScore" },
        { text: "diff", value: "diff" },
      ])
    }
  }

  /**
   * ライバルのスコアと比較して譜面ごとの差分要素を追加する
   */
  public setRivelScore(playerScore: any, rivalScore: any): any {
    return _(playerScore)
      .map((score, id) => {
        const rival = rivalScore[id]
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
