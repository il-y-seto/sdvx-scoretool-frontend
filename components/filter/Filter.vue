<template>
  <div class="filter-header-wrap">
    <div class="filter-header">
      <h3>フィルター(読み込みがかかります)</h3>
      <level-filter />
      <div class="d-flex filter-cards">
        <multiple-toggle-filter
          title="クリアマーク"
          :targets='[
            {color: "blue-grey accent-4", value: "Crash"},
            {color: "green accent-4", value: "COMP"},
            {color: "purple accent-4", value: "EX COMP"},
            {color: "red accent-4", value: "UC"},
            {color:"yellow accent-4", value: "PER"}
          ]'
          width="400px"
          paramName="clearMark"
         />
        <multiple-toggle-filter
          title="グレード"
          :targets='[
            {value: "D"},
            {value: "C"},
            {value: "B"},
            {value: "A"},
            {value: "A+"},
            {value: "AA"},
            {value: "AA+"},
            {value: "AAA"},
            {value: "AAA+"},
            {value: "S"},
            {value: "995"},
            {value: "998"}
          ]'
          width="400px"
          paramName="grade"
         />
        <multiple-toggle-filter
          title="難易度"
          :targets='[
            {color: "light-blue accent-4", value: "NOV"},
            {color: "yellow accent-4", value: "ADV"},
            {color: "deep-orange accent-4", value: "EXH"},
            {color: "light-green accent-4", value: "MXM"},
            {color:"pink accent-4", value: "INF"},
            {color:"orange accent-4", value: "GRV"},
            {color:"cyan accent-4", value: "HVN"},
            {color:"red accent-4", value: "VVD"}
          ]'
          width="300px"
          paramName="difficulty"
         />
        <multiple-toggle-filter
          title="基本項目"
          :targets='[
            {value: "難易度"},
            {value: "レベル"},
            {value: "クリアマーク"},
            {value: "グレード"},
            {value: "スコア"},
            {value: "PLAYED"},
            {value: "CLEAR"},
            {value: "UC"},
            {value: "PERFECT"},
            {value: "偏差値"},
            {value: "VOLFORCE"}]'
          width="400px"
          paramName="baseFilter"
         />
        <statistics />
        <v-btn class="align-self-end mb-5"
          :loading="loading"
          :disabled="loading"
          color="primary"
          @click="submit"
        >
          絞り込み / 実行
        </v-btn>
      </div>
    </div>
    <v-divider />
  </div>
</template>

<style scoped lang="scss">
  .filter-header {
    width: 80%;
    margin: auto;
    margin-top: 20px;
    .filter-cards {
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: center;
      .custom-loader {
        animation: loader 1s infinite;
        display: flex;
      }
      @-webkit-keyframes loader {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @-o-keyframes loader {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes loader {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
</style>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import LevelFilter from "~/components/filter/Level.vue"
import MultipleToggleFilter from "~/components/filter/MultipleToggle.vue"
import Statistics from "~/components/filter/Statistics.vue"
import { FilterStore } from "~/store"

@Component({
  components:{
    LevelFilter,
    MultipleToggleFilter,
    Statistics,
  }
})
export default class FilterHeader extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  loading!: boolean

  private mounted() {
    FilterStore.load()
  }

  private async submit() {
    FilterStore.save() // TODO: 基本項目はここで送らない
    const hoge = this.$emit('hoge')
  }
}
</script>
