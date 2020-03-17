<template>
	<v-container>
		<div id="charts">
		</div>
		<v-data-table
			:headers="headers"
			:items="filteredItems"
			:items-per-page="100"
		>
		</v-data-table>
	</v-container>
</template>

<style scoped lang="scss">
</style>

<script>
import Vue from 'vue'
import _ from 'lodash'
//import ApexCharts from 'apexcharts'

export default {
  props: ['playerScore', 'playerName', 'levelFilter', 'rivalScore', 'rivalName'],
  data: () => ({
    search: '',
    itemsPerPage: 100,
    footerProps: {
      'items-per-page-options': [10, 50, 100],
    },
    defaultHeaders: [
      { text: 'title', value: 'title' },
      { text: 'level', value: 'level' },
      { text: 'difficulty', value: 'difficulty' },
      { text: 'clearlamp', value: 'clearlamp' },
      { text: 'grade', value: 'grade' },
      // TODO: playerName表示
      { text: 'playerScore', value: 'score' },
    ],
  }),
  computed: {
    filteredItems: function () {
      let hoge
      if (!this.levelFilter.length) {
        hoge = _.values(this.score)
      } else {
      // TODO: v-data-tableのfilter機能を使う
        hoge = _(this.score).filter(score => _.includes(this.levelFilter, score.level)).values().value()
      }

      // とりあえずスコア差ある曲だけ表示
      return !this.hasRivalScore ? _(hoge).filter((uni) => uni.score).value() : _(hoge).filter((uni) => uni.diff).value()
      //return _(hoge).filter((uni) => uni.diff).value()
    },
    score: function () {
      if (!this.hasRivalScore) {
        return this.playerScore
      }
      return this.setRivelScore(this.playerScore, this.rivalScore)
    },
    hasRivalScore: function () {
      return Object.keys(this.rivalScore).length >= 0
    },
    headers: function () {
      if (!this.hasRivalScore) {
        return this.defaultHeaders
      } else {
        return this.defaultHeaders.concat([
          {text: this.rivalName, value: 'rivalScore'},
          {text: 'diff', value: 'diff'}
        ])
      }
    }
  },
  methods: {
    // ライバルのスコアと比較して譜面ごとの差分要素を追加する
    setRivelScore (playerScore, rivalScore) {
      return _(playerScore).map((score, id) => {
        const rival = rivalScore[id]
        return {...score, rivalScore: rival.score, diff: score.score - rival.score}
      }).value()
    },
  }
}
</script>