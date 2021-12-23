<template>
  <v-card
    class="statistics-filter"
    width="400px"
  >
    <v-toolbar
      flat
      color="deep-purple accent-4"
      dark
    >
      <v-toolbar-title>統計</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn
          icon
          @click="$emit('toggleIsShow')"
        >
          <v-icon>{{ isShow ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-toolbar>
    <v-expand-transition>
      <div v-show="isShow">
        <v-card-text class="card-text">
          <div class="filters">
            <multiple-toggle-filter
              v-for="filter in filters" :key="filter.name"
              :paramName="filter.name"
              :title="filter.getTitle()"
              :targets="filter.getTargets()"
              :width="filter.getWidth()"
              :isShow="filter.getIsShow()"
              @toggleIsShow="toggleIsShow(filter.name)"
            />
          </div>
          <div class="diff-btn-wrap">
            <v-btn class="diff-btn" color="primary" @click="displayDiff = !displayDiff" :outlined="!displayDiff">
              平均差分を表示
            </v-btn>
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped lang="scss">
  .statistics-filter {
    margin: 10px;
    .filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .diff-btn-wrap {
      width: 100%;
      text-align: right;
    }
  }
  @media (max-width: 768px) {
    .card-text {
      padding: 0 !important;
    }
  }
</style>


<script lang="ts">
import { Context } from "@nuxt/types"
import { Component, Prop, Vue } from "nuxt-property-decorator"
import MultipleToggleFilter from "~/components/filter/MultipleToggle.vue"
import FilterComponentParams from "~/components/filter/FilterComponentParams"

@Component({
  components: {
    MultipleToggleFilter,
  }
})
export default class StatisticsFilter extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  isShow!: Boolean;

  public displayDiff = false;

  private filters: FilterComponentParams[] = []

  private mounted() {
    this.filters.push(
      new FilterComponentParams(
        'ratio',
        '割合',
        [
          {color: "blue-grey accent-4", value: "Crash率"},
          {color: "green accent-4", value: "COMP率"},
          {color: "purple accent-4", value: "EX COMP率"},
          {color: "red accent-4", value: "UC率"},
          {color:"yellow accent-4", value: "PER率"},
          {value: "A率"},
          {value: "A+率"},
          {value: "AA率"},
          {value: "AA+率"},
          {value: "AAA率"},
          {value: "AAA+率"},
          {value: "S率"},
          {value: "995率"},
          {value: "998率"}
        ],
        '95%'
      ),
      new FilterComponentParams(
        'skillAnalizerAve',
        'スキアナ別平均',
        [
          {value: "全体"},
          {value: "～雷電"},
          {value: "魔騎士"},
          {value: "剛力羅"},
          {value: "或帝滅斗"},
          {value: "無銀"},
          {value: "金枠"},
          {value: "後光"}
        ],
        "95%"
      ),
      new FilterComponentParams(
        'volForceAve',
        'ボルフォース別平均',
        [
          {value: "〜アルジェント"},
          {value: "エルドラI・II"},
          {value: "エルドラIII・IV"},
          {value: "クリムゾンI"},
          {value: "スコア"},
          {value: "クリムゾンII"},
          {value: "クリムゾンIII"},
          {value: "クリムゾンIV"},
          {value: "インペリアルI"},
          {value: "インペリアルII"}
        ],
        "95%"
      ),
    )
  }

  private toggleIsShow(filterName: string) {
    this.filters.forEach(function (filter) {
      if (filter.getName() === filterName) {
        filter.toggleIsShow()
      } else {
        filter.closeCard()
      }
    })
  }
}
</script>
