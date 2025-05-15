import type Editor from '../../../editor'
import type { IElement } from '../../../editor/interface/Element'

export class ParagraphRenderer {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  /**
   * 插入一个段落
   * @param text 段落文本
   * @param tabCount 缩进Tab数
   */
  public async writeParagraph(text: string, tabCount: number = 2): Promise<void> {
    // 获取当前编辑器内容
    const currentData = this.editor.command.getValue()

    // 根据 tabCount 生成对应数量的全角空格
    const indentStr = '\u3000'.repeat(tabCount)

    // 构造段落元素
    const paragraphElement: IElement = {
      value: indentStr + text,
      size: 16 // 你可以根据需要设置默认字号、字体等
    }

    // 换行元素
    const newlineElement: IElement = { value: '\n' }



    this.editor.command.executeSetValue({
      ...currentData.data,
      main: [...currentData.data.main, paragraphElement, newlineElement]
    })

    return Promise.resolve()
  }
}