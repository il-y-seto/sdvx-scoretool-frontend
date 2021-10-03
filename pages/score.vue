<template>
  <div>
    <filter-header />
    <v-container>
      <v-data-table
        class="score-table"
        :headers="headers"
        :items="scores"
        mobile-breakpoint="0"
        fixed-header
      >
        <template v-slot:header.name="{header}">
          <div class="name-colomn">
            {{ header.text }}
          </div>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
  .score-table {
    .name-colomn {
      min-width: 200px;
    }
  }
</style>

<script lang="ts">
import { Context } from "@nuxt/types"
import { Component, Vue } from "nuxt-property-decorator"
import FilterHeader from "~/components/filter/Filter.vue"

@Component({
  components:{
    FilterHeader,
  }
})
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
    { text: "name", value: "name", align: "start"},
    { text: "difficulty", value: "difficulty"},
    { text: "level", value: "level"},
    { text: "clear_lamp", value: "clear_lamp"},
    { text: "score", value: "score"},
  ]
}
</script>
