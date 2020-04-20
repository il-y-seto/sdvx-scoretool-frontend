import { Component, Vue } from "nuxt-property-decorator"
import { Api } from "./api"
import { ApiRequester } from "./infrastructure/ajax/api-requester"
import { Context } from "@nuxt/types"

@Component
export class Base extends Vue {
  public $hoge!: () => Hoge
  // public mounted()
  // pubilc asyncData()
}

// TODO: べつのとこにうつす
export class Hoge {
  public readonly api: Api
  constructor(context: Context) {
    const apiRequester = new ApiRequester(context.$http)
    this.api = new Api(apiRequester)
  }
}
