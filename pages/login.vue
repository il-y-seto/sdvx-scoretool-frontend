<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field v-model="email" placeholder="email" name="email" />
      <v-text-field v-model="password" placeholder="password" name="password" />
      <v-btn type="submit">ログイン</v-btn>
    </v-form>
    <v-form @submit.prevent="externalLogin('twitter')">
      <v-btn type="submit">twitter</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import axios from "axios"


@Component({
})
export default class LoginPage extends Vue {
  public email: string = ""
  public password: string = ""

  public async login(): Promise<void> {
    await axios
      .get(`/hoge`)
      .then((res) => {
        console.log(res)
      })
  }

  public async externalLogin(service: string): Promise<void> {
    if (service === "twitter") {
      this.$router.push("/oauth/redirect")
    }
  }
}
</script>
