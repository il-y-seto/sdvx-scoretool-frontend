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

  public async redirect() {
    const response = await this.$axios.$get('/oauth/authorize/twitter')
    console.log(response, response.redirect_url)
    window.location.href = response.redirect_url
  }
}
</script>
