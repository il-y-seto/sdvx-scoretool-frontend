<template>
  <div class="level-filter">
    <v-row align="center" :no-gutters="true">
      <v-checkbox
        v-for="lvCheckbox in lvCheckboxes"
        :key="lvCheckbox.value"
        v-model="checked"
        :label="lvCheckbox.label"
        :value="lvCheckbox.value"
        color="deep-purple accent-3"
        height="5px"
        class="pa-0"
      />
      <v-btn elevation="2" @click="checkAllCheckboxes">
        全レベルON
      </v-btn>
      <v-btn elevation="2" @click="uncheckAllCheckboxes">
        全レベルOFF
      </v-btn>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
  .level-filter {
    width: 80%;
    margin: auto;
    .v-input {
      margin-right: 6px;
    }
    .v-btn {
      margin-right: 10px;
    }
  }
</style>


<script lang="ts">
import { Context } from "@nuxt/types"
import { Component, Vue } from "nuxt-property-decorator"
import { FilterStore } from "~/store"

@Component
export default class LevelFilter extends Vue {
  private levelNum = 20

  public get lvCheckboxes(): {label: String, value: Number}[] {

    return [...Array(this.levelNum)].map((_, i) => ({label: "Lv" + (i + 1), value: i + 1}))
  }

  public checkAllCheckboxes(): void {
    this.selected = [...Array(this.levelNum)].map((_, i) => i + 1)
    this.mergeFilter()
  }

  public uncheckAllCheckboxes(): void {
    this.selected = []
    this.mergeFilter()
  }

  public selected: Number[] = []

  public get checked(): Number[] {
    return FilterStore.getParams.level
  }
  public set checked(value) {
    this.selected = value
    this.mergeFilter()
  }

  private mergeFilter() {
    FilterStore.mergeAction({level: this.selected})
  }
}
</script>
