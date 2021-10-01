<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="scores"
    />
  </v-container>
</template>

<script lang="ts">
import { Context } from "@nuxt/types"
import { Component, Vue } from "nuxt-property-decorator"

@Component
export default class ScorePage extends Vue {
  public scores: any = []
  public async asyncData(context: Context) {
    // ssr時はコンテナ間通信になってめんどくさい
    const scores = await context.$axios.get(`http://laravel.test/api/user-score`)
      .then((res) => {
        return res.data.scores
      })
    return {
      scores,
    }
  }

  public headers: Array<object> = [
    { text: "name", value: "name"},
    { text: "difficulty", value: "difficulty"},
    { text: "level", value: "level"},
    { text: "clear_lamp", value: "clear_lamp"},
    { text: "score", value: "score"},
  ]
}
</script>
