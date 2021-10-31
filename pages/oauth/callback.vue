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
    const data = {
      oauth_token: this.oauthToken,
      oauth_verifier: this.oauthVerifier,
    }
    await this.$axios.$get('/api/twitter/callback/login', {
      params: data,
    }).then((res) => {
      // todo: トークンを手動で保存しているが別の方法がありそう
      // いつ切れるかわからない＋sanctumの仕組みに則っていないのでどこかで不都合が出る可能性がある
      this.$auth.setUserToken(res.token)
    })
  }
}
</script>
