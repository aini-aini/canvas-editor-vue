import { applyLayout } from './layout'


export function cardPlugin(editor: any, options?: { apiKey?: string }) {
  applyLayout(editor, options)

}

export default cardPlugin