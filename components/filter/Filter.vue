<template>
  <div class="filter-header-wrap">
    <div class="filter-header">
      <h3>フィルター(読み込みがかかります)</h3>
      <level-filter />
      <div class="d-flex filter-cards">
        <multiple-toggle-filter
          v-for="filter in filters" :key="filter.name"
          :paramName="filter.name"
          :title="filter.getTitle()"
          :targets="filter.getTargets()"
          :width="filter.getWidth()"
          :isShow="filter.getIsShow()"
          @toggleIsShow="toggleIsShow(filter.name)"
        />
        <statistics-filter
          :isShow="isShowStatistics"
          @toggleIsShow="toggleIsShow('statistics')"
        />
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

  @media (max-width: 768px) {
  .filter-header {
    width: 100%;
    h3 {
      text-align: center;
    }
    .multiple-toggle-filter {
      width: 100% !important;
    }
    .statistics-filter {
      width: 100% !important;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import LevelFilter from "~/components/filter/Level.vue"
import MultipleToggleFilter from "~/components/filter/MultipleToggle.vue"
import StatisticsFilter from "~/components/filter/Statistics.vue"
import { FilterStore } from "~/store"
import FilterComponentParams from "~/components/filter/FilterComponentParams"

@Component({
  components:{
    LevelFilter,
    MultipleToggleFilter,
    StatisticsFilter,
  }
})
export default class FilterHeader extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  loading!: boolean

  private filters: FilterComponentParams[] = []

  private isShowStatistics = false

  private mounted() {
    FilterStore.load()
    this.filters.push(
      new FilterComponentParams(
        'clearMark',
        'クリアマーク',
        [
          {color: "blue-grey accent-4", value: "Crash"},
          {color: "green accent-4", value: "COMP"},
          {color: "purple accent-4", value: "EX COMP"},
          {color: "red accent-4", value: "UC"},
          {color:"yellow accent-4", value: "PER"}
        ],
        '400px'
      ),
      new FilterComponentParams(
        'grade',
        'グレード',
        [
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
        ],
        '400px'
      ),
      new FilterComponentParams(
        'difficulty',
        '難易度',
        [
          {color: "light-blue accent-4", value: "NOV"},
          {color: "yellow accent-4", value: "ADV"},
          {color: "deep-orange accent-4", value: "EXH"},
          {color: "light-green accent-4", value: "MXM"},
          {color: "pink accent-4", value: "INF"},
          {color: "orange accent-4", value: "GRV"},
          {color: "cyan accent-4", value: "HVN"},
          {color: "red accent-4", value: "VVD"}
        ],
        '300px'
      ),
      new FilterComponentParams(
        'baseFilter',
        '基本項目',
        [
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
          {value: "VOLFORCE"}
        ],
        '400px'
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

    if (filterName === 'statistics') {
      this.isShowStatistics = !this.isShowStatistics
    } else {
      this.isShowStatistics = false
    }
  }

  private async submit() {
    FilterStore.save() // TODO: 基本項目はここで送らない
  }
}
</script>
