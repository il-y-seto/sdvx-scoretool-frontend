<template>
  <v-container>
    ログイン中です
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { Context } from "@nuxt/types"


@Component({
})
export default class OauthCallbackPage extends Vue {
  public oauthToken: string = ''
  public oauthVerifier: string = ''

  public async asyncData(context: Context) {
    if (!!context.query.error || context.query.denied) {
      console.log('error', context.query.error)
      return context.redirect('/')
    }
    const oauthToken = context.query.oauth_token as string
    const oauthVerifier = context.query.oauth_verifier as string
    if (!oauthToken || !oauthVerifier) {
      console.log('error', oauthToken, oauthVerifier)
    }
    return {
      oauthToken,
      oauthVerifier,
    }
  }

  public async mounted() {
    // ブラウザに残されたクッキーを再利用するため、マウント後に処理

    // const data = {
    //   oauth_token: this.oauthToken,
    //   oauth_verifier: this.oauthVerifier,
    // }

    // TODO: laravelのapiを叩いてトークン等を保存する
    // const result = await loginService.finish('twitter', data)
    // if (!result || !result.unregistered) {
    //   return
    // }

  }
}
</script>
