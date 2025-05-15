import type Editor from '../../../editor'
import type { IElement } from '../../../editor/interface/Element'

export class LineBreakRenderer {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  /**
   * 插入一个换行
   */
  public async insertLineBreak(): Promise<void> {
    const currentData = this.editor.command.getValue()
    const lineBreakElement: IElement = { value: '\n' }

    this.editor.command.executeSetValue({
      ...currentData.data,
      main: [...currentData.data.main, lineBreakElement]
    })
    return Promise.resolve()
  }
}