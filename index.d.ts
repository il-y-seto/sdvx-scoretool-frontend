// Vue ファイル拡張子を正しく認識させる
// @link https://github.com/Microsoft/TypeScript-Vue-Starter#single-file-components
declare module "*.vue" {
  const _default: Vue
  export default _default
}

export type InjectFn = (name: string, fn: any) => void
