<template>
  <v-app-bar app color="deep-purple accent-4" dense dark>
    <v-app-bar-nav-icon />
    <v-toolbar-title>SDVX スコアツール</v-toolbar-title>
    <v-spacer />
    <v-btn
      v-if="$auth.loggedIn"
      @click="logout()"
    >
      ログアウト
    </v-btn>
    <v-btn v-else @click="login()">
      ログイン
    </v-btn>
    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component
export default class TheNearnoahHeader extends Vue {
  public async logout() {
    await this.$auth.logout()
    console.log('logouted')
    this.$router.push('/')
  }

  public async login() {
    await this.$router.push({path: '/login', query: {redirectUri: encodeURIComponent(this.$route.fullPath)}})
  }
}
</script>
