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
          @click="$emit('toggleIsShow')"
        >
          <v-icon>{{ isShow ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-toolbar>
    <v-expand-transition>
      <div v-show="isShow">
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
import { FilterStore } from "~/store"

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
  paramName!: "clearMark"|"grade"|"difficulty"|"baseFilter"|"ratio"|"skillAnalizerAve"|"volForceAve";

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

  @Prop({
    type: Boolean,
    default: false,
  })
  isShow!: Boolean;

  private selected: Number[] = []

  public checkAllCheckboxes(): void {
    this.selected = [...Array(this.targets.length)].map((_, i) => i)
    this.mergeFilter()
  }

  public uncheckAllCheckboxes(): void {
    this.selected = []
    this.mergeFilter()
  }

  private get checked(): Number[] {
    return FilterStore.getParams[this.paramName]
  }

  private set checked(value) {
    this.selected = value
    this.mergeFilter()
  }

  private mergeFilter() {
    FilterStore.mergeAction({[this.paramName]: this.selected})
  }
}
</script>
