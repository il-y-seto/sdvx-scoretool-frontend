import { Context } from "@nuxt/types"

export default async (context: Context) => {
    if (!context.$auth.loggedIn) {
      return
    }
    context.redirect('/')
}
