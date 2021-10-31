<template>
  <v-container>
    <v-btn @click="onClick">ログイン</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"


@Component
export default class AccountPage extends Vue {
  public async onClick()
  {
    this.$axios.$get('/api/hoge')
      .then((res) =>{
        console.log(res)
      })
  }
}
</script>
