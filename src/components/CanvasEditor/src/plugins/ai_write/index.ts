// src/plugins/ai_write/index.ts
import type Editor from '../../editor'
import { AiWritePlugin } from './AiWritePlugin'
import type { PluginFunction, IAiWritePlugin } from './types'
import { getCursorInfo, getCurrentRowElements, getCurrentParagraphElements, getCursorContext } from './utils/cursor'
import { getAllElementPositionList } from './utils/position'
import { setCursorToIndex } from './utils/setCursor'

const aiWritePlugin: PluginFunction = (editor: Editor): void => {
  const plugin = new AiWritePlugin(editor)
    ; (editor as any).aiWrite = {
      renderH1: (text: string) => plugin.renderH1(text),
      renderH2: (text: string) => plugin.renderH2(text),
      renderH3: (text: string) => plugin.renderH3(text),
      renderH4: (text: string) => plugin.renderH4(text),
      renderH5: (text: string) => plugin.renderH5(text),
      renderH6: (text: string) => plugin.renderH6(text),
      writeParagraph: (text: string) => plugin.writeParagraph(text),
      insertLineBreak: () => plugin.insertLineBreak(),
      insertImage: (url: string) => plugin.insertImage(url),
      insertTable: () => plugin.insertTable(),
      insertOrderedList: (items: string[]) => plugin.insertOrderedList(items),
      insertCheckboxList: (items: string[]) => plugin.insertCheckboxList(items),
      insertDiscList: (items: string[]) => plugin.insertDiscList(items),
      insertCircleList: (items: string[]) => plugin.insertCircleList(items),
      insertSquareList: (items: string[]) => plugin.insertSquareList(items),
      getCursorInfo: () => getCursorInfo(editor),
      getCurrentRowElements: () => getCurrentRowElements(editor),
      getCurrentParagraphElements: () => getCurrentParagraphElements(editor),
      getCursorContext: () => getCursorContext(editor),
      getAllElementPositionList: () => getAllElementPositionList(editor),
      setCursorToIndex: (index: number) => setCursorToIndex(editor, index),
    } as IAiWritePlugin
}
export default aiWritePlugin