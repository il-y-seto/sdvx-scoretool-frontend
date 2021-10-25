<template>
  <v-card
    class="multiple-toggle-filter"
    :width="width"
  >
    <v-toolbar
      flat
      color="deep-purple accent-4"
      dark
    >
      <v-toolbar-title class="text-lg-h6">{{ title }}</v-toolbar-title>
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
        <v-card-text>
          <v-btn-toggle
            class="d-block"
            v-model="checked"
            group
            multiple
          >
            <v-btn v-for="target in targets" :key="target.value" class="ma-2" :color="target.color == '' ? 'blue-grey accent-4' : target.color" outlined>
              {{ target.value }}
            </v-btn>
          </v-btn-toggle>
          <v-btn class="all-toggle-btn" elevation="2" @click="checkAllCheckboxes">
            全{{ title }}ON
          </v-btn>
          <v-btn class="all-toggle-btn" elevation="2" @click="uncheckAllCheckboxes">
            全{{ title }}OFF
          </v-btn>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped lang="scss">
  .multiple-toggle-filter {
    margin: 10px;
    .v-input {
      margin-right: 15px;
    }
    .all-toggle-btn {
      margin-bottom: 5px;
    }
  }
</style>


<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { filterStore } from "~/store"

@Component
export default class MultipleToggleFilters extends Vue {
  @Prop({
    type: String,
    default: ""
  })
  title!: string;

  @Prop({
    type: String,
    default: ""
  })
  paramName!: string;

  @Prop({
    type: Array,
    default: []
  })
  targets!: {value?: string, color: string}[];

  @Prop({
    type: String,
    default: "400px",
  })
  width!: String;

  private show = false;
  private selected: Number[] = []

  private mounted() {
    console.log(filterStore)
    // this.selected = filterStore.params.clearMark
  }

  public checkAllCheckboxes(): void {
    this.selected = [...Array(this.targets.length)].map((_, i) => i)
  }

  public uncheckAllCheckboxes(): void {
    this.selected = []
    this.emitUpdateFilter()
  }

  private get checked(): Number[] {
    return this.selected
  }

  private set checked(value) {
    this.selected = value
    this.emitUpdateFilter()
  }
  
  private emitUpdateFilter(): void {
    this.$emit("updateFilter", {[this.paramName]: this.selected})
  }
}
</script>
