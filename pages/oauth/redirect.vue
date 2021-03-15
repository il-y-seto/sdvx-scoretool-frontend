<template>
  <v-container>
    リダイレクトしています
    <v-form @submit.prevent="redirect">
      <v-btn type="submit">twitter</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { Context } from "@nuxt/types"


@Component({
})
export default class OauthRedirectPage extends Vue {
  public twitterAuthUrl: string = ''

  public redirect() {
    this.$axios.$get('http://localhost/api/test')
      .then(data => {
        return { twitterAuthUrl: data.redirect_url }
      }).catch(e => console.error({ message: e.message, statusCode: e.statusCode }))
  }
}
</script>
