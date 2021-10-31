import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

type Filter = {
  // 切り出して良さそう
  level: Number[],
  clearMark: Number[],
  grade: Number[],
  difficulty: Number[],
  baseFilter: Number[],
  ratio: Number[],
  skillAnalizerAve: Number[],
  volForceAve: Number[],
}

@Module({ name: 'filters', stateFactory: true, namespaced: true })
export default class Filters extends VuexModule {
  // todo: どこかで各パラメータのバリデーションを挟む
  // 操作の度にここに生やしたprivateメソッドとかで検証すればよさそう？
  private params: Filter = {
    level: [],
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

  @Action({ rawError: true })
  mergeAction(param: {[paramName: string]: Number[]}) {
    this.merge(param)
  }
}
