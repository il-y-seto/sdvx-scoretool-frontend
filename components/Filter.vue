<template>
  <v-container>
    <v-row>
      <v-checkbox
        v-for="box in lvCheckboxes"
        :key="box.value"
        v-model="checked"
        :label="box.label"
        :value="box.value"
      ></v-checkbox>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
</style>

<script>
export default {
  data: () => ({
    selected: [],
  }),
  computed: {
    checked: {
      get () {
        return this.selected
      },
      set (value) {
        this.selected = value
        this.$emit('updateFilter', this.selected)
      },
    },
    lvCheckboxes: () => {
      return [
        {label: 'Lv15', value: 15},
        {label: 'Lv16', value: 16},
        {label: 'Lv17', value: 17},
        {label: 'Lv18', value: 18},
        {label: 'Lv19', value: 19},
        {label: 'Lv20', value: 20},
      ]
    }
  },
  methods: {
    onChange: event => {
      console.log(event)
    }
  }
}
</script>
