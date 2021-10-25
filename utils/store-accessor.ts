import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import { Filter } from '~/store/filter'

let filterStore: Filter

function initialiseStores(store: Store<any>): void {
  filterStore = getModule(Filter, store)
}

export { initialiseStores, filterStore }