import { Hoge } from "~/src/vue"
import { Context } from "@nuxt/types"
import { InjectFn } from ".."

export default async (ctx: Context, inject: InjectFn): Promise<void> => {
  inject("hoge", () => new Hoge(ctx))
}
