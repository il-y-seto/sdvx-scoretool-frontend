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


@Component({
  middleware: 'guest',
})
export default class LoginPage extends Vue {
  public email: string = ""
  public password: string = ""

  public async mounted() {
    this.$axios.$get('/laravel/sanctum/csrf-cookie');
  }

  public async login(): Promise<void> {
    await this.$auth.loginWith('laravelSanctum', {
      data: {
        // email: this.email,
        // password: this.password,
        email: 'trike1236@gmail.com',
        password: 'pikacchi',
      }
    }).then((res) => {
        console.log(res)
    })
    // TODO: y-seto urlのクエリ(redirectUri)見て遷移を行う
    // await  this.$router.push('/score')
  }

  public async externalLogin(service: string): Promise<void> {
    if (service === "twitter") {
      this.$router.push("/oauth/redirect")
    }
  }
}
</script>
