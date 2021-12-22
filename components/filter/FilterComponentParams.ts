export default class FilterComponentParams {
  private name: string
  private title: string
  private targets: {color?: string, value: string}[]
  private width: string
  private isShow = false;

  public constructor(
    name: string,
    title: string,
    targets: {color?: string, value: string}[], 
    width: string
  ) {
    this.name = name
    this.title = title
    this.targets = targets
    this.width = width
  }

  public getName() {
    return this.name
  }

  public getTitle() {
    return this.title
  }

  public getTargets() {
    return this.targets
  }

  public getWidth() {
    return this.width
  }

  public getIsShow() {
    return this.isShow
  }

  public toggleIsShow() {
    this.isShow = !this.isShow
  }

  public closeCard() {
    this.isShow = false
  }
}