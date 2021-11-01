<template>
  <div>
    <filter-header
      :loading="loading"
      @hoge="updateScores()"
    />
    <v-container>
      <v-data-table
        class="score-table"
        :headers="headers"
        :items="scores"
        :hide-default-footer="true"
        :options="{itemsPerPage: perPage}"
        mobile-breakpoint="0"
        fixed-header
      >
        <template v-slot:[`header.name`]="{header}">
          <div class="name-colomn">
            {{ header.text }}
          </div>
        </template>
      </v-data-table>
      <v-pagination
        :length="lastPage"
        :value="currentPage"
        @input="movePage"
      >
      </v-pagination>
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
import { FilterStore } from "~/store"

@Component({
  components:{
    FilterHeader,
  }
})
export default class ScorePage extends Vue {
  public readonly perPage: number =20
  public scores: any = []
  public currentPage: number = 1
  public lastPage: number = 1
  public loading: boolean = false

  public async asyncData(context: Context) {
    const data = await context.$axios.get(`/api/user-score`, {
      params: {
        userId: 1,
        // todo: クエリストリングを読む
        currentPage: 1,
        perPage: 20,
      }
    })
      .then((res) => {
        console.log(res.data)
        return res.data
      })
    return {
      scores: data.scores,
      currentPage: data.currentPage,
      lastPage: data.lastPage,
    }
  }

  public headers: Array<object> = [
    { text: "name", value: "name", align: "start"},
    { text: "difficulty", value: "difficulty"},
    { text: "level", value: "level"},
    { text: "clear_lamp", value: "clear_lamp"},
    { text: "score", value: "score"},
  ]

  public async movePage(event: number)
  {
    if (this.currentPage === event) {
      return
    }
    await this.updateScores(event)
  }

  public async updateScores(page: number = this.currentPage)
  {
    this.loading = true
    this.$axios.get(`/api/user-score`, {
      params: {
        userId: 1,
        // todo: paginatorもvuexに持たせる
        currentPage: page,
        perPage: this.perPage,
        ...FilterStore.parseUriQueryString,
      }
    }).then((res) => {
      // TODO: urlに情報を持たせる
      // this.$route.query(res.config.params as any)
      // this.reload()
      this.scores = res.data.scores
      this.currentPage = res.data.currentPage
    }).finally(() => {
      setTimeout(() => (this.loading = false), 3 * 1000) // TODO: submit
      // this.loading = false
    })
  }
}
</script>
