/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Filters from '~/store/filter'

let filterStore: Filters

function initialiseStores(store: Store<any>): void {
  filterStore = getModule(Filters, store)
}

export { initialiseStores, filterStore }