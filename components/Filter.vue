<template>
  <v-container>
    <v-row>
      <v-checkbox
        v-for="box in lvCheckboxes"
        :key="box.value"
        v-model="checked"
        :label="box.label"
        :value="box.value"
      />
    </v-row>
  </v-container>
</template>
<style scoped lang="scss"></style>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component
export default class ScoreFilter extends Vue {
  public selected: Array<string> = []

  public get checked(): Array<string> {
    return this.selected
  }
  public set checked(value) {
    this.selected = value
    this.$emit("updateFilter", this.selected)
  }

  public get lvCheckboxes(): Array<object> {
    return [
      { label: "Lv15", value: 15 },
      { label: "Lv16", value: 16 },
      { label: "Lv17", value: 17 },
      { label: "Lv18", value: 18 },
      { label: "Lv19", value: 19 },
      { label: "Lv20", value: 20 },
    ]
  }
}
</script>
