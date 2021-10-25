<template>
  <v-card
    class="statics-filter"
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
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-toolbar>
    <v-expand-transition>
      <div v-show="show">
        <v-card-text class="card-text">
          <div class="filters">
            <multiple-toggle-filter
              title="割合"
              :targets='[
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
              ]'
              paramName="ratio"
              @updateFilter="updateFilter"
              width="100%"
            />
            <multiple-toggle-filter
              title="スキアナ別平均"
              :targets='[
                {value: "全体"},
                {value: "～雷電"},
                {value: "魔騎士"},
                {value: "剛力羅"},
                {value: "或帝滅斗"},
                {value: "無銀"},
                {value: "金枠"},
                {value: "後光"}
              ]'
              paramName="skillAnalizerAve"
              @updateFilter="updateFilter"
              width="100%"
            />
            <multiple-toggle-filter
              title="ボルフォース別平均"
              :targets='[
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
              ]'
              paramName="volForceAve"
              @updateFilter="updateFilter"
              width="100%"
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
  .statics-filter {
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
</style>


<script lang="ts">
import { Context } from "@nuxt/types"
import { Component, Prop, Vue } from "nuxt-property-decorator"
import MultipleToggleFilter from "~/components/filter/MultipleToggle.vue"

@Component({
  components: {
    MultipleToggleFilter,
  }
})
export default class StaticsFilters extends Vue {
  private show = false;
  public displayDiff = false;
  private filterParams: {[valueName: string]: Number[]} = {};

  private updateFilter(value: {[valueName: string]: Number[]}) {
    Object.assign(this.filterParams, value)
    this.$emit("updateFilter", this.filterParams)
  }
}
</script>
