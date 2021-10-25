import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

export interface IFilterState {
  params: {
    // modelとして切り出して良さそう
    clearMark: Number[],
    grade: Number[],
    difficulty: Number[],
    baseFilter: Number[],
    ratio: Number[],
    skillAnalizerAve: Number[],
    volForceAve: Number[],
  }
}

@Module({
  name: 'filter',
  stateFactory: true,
  namespaced: true,
})
export class Filter extends VuexModule implements IFilterState {
  params: {
    // modelとして切り出して良さそう
    clearMark: Number[],
    grade: Number[],
    difficulty: Number[],
    baseFilter: Number[],
    ratio: Number[],
    skillAnalizerAve: Number[],
    volForceAve: Number[],
  } = {
    clearMark: [],
    grade: [],
    difficulty: [],
    baseFilter: [],
    ratio: [],
    skillAnalizerAve: [],
    volForceAve: []
  }

  @Mutation
  merge(param: {[valueName: string]: Number[]}) {
    Object.assign(this.params, param)
  }

  @Action
  async mergeAction(param: {[valueName: string]: Number[]}) {
    this.merge(param)
  }
}