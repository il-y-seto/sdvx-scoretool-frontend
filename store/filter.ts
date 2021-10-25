import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

type Filter = {
  // modelとして切り出して良さそう
  clearMark: Number[],
  grade: Number[],
  difficulty: Number[],
  baseFilter: Number[],
  ratio: Number[],
  skillAnalizerAve: Number[],
  volForceAve: Number[],
}

@Module({
  name: 'filter',
  stateFactory: true,
  namespaced: true,
})
export default class Filters extends VuexModule {
  private params: Filter = {
    clearMark: [],
    grade: [],
    difficulty: [],
    baseFilter: [],
    ratio: [],
    skillAnalizerAve: [],
    volForceAve: []
  }

  public get getParams() {
    return this.params
  }
  
  @Mutation
  merge(param: {[paramName: string]: Number[]}) {
    Object.assign(this.params, param)
  }

  @Action
  async mergeAction(param: {[valueName: string]: Number[]}) {
    this.merge(param)
  }

}