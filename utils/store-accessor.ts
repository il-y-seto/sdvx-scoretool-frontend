/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Filters from '~/store/filters'

let FilterStore: Filters

function initialiseStores(store: Store<any>): void {
  FilterStore = getModule(Filters, store)
}

export { initialiseStores, FilterStore }