// src/plugins/ai_write/types.ts
import type Editor from '../../editor'
import type { IElementPosition } from '../../editor/interface/Element'
import type { IElement } from '../../editor/interface/Element'
import type { RangeContext } from '../../editor/interface/Range'

export interface ITitleRenderer {
  renderH1(text: string): void
  renderH2(text: string): void
  renderH3(text: string): void
  renderH4(text: string): void
  renderH5(text: string): void
  renderH6(text: string): void
}

export interface IAiWritePlugin {
  renderH1(text: string): Promise<void>
  renderH2(text: string): Promise<void>
  renderH3(text: string): Promise<void>
  renderH4(text: string): Promise<void>
  renderH5(text: string): Promise<void>
  renderH6(text: string): Promise<void>
  writeParagraph(text: string): Promise<void>
  insertLineBreak(): Promise<void>
  insertImage(url: string): Promise<void>
  insertTable(): Promise<void>
  // 列表相关方法
  insertOrderedList(items: string[]): Promise<void>
  insertCheckboxList(items: string[]): Promise<void>
  insertDiscList(items: string[]): Promise<void>
  insertCircleList(items: string[]): Promise<void>
  insertSquareList(items: string[]): Promise<void>
  // 添加光标相关方法的类型定义
  getCursorInfo: () => IElementPosition | null
  getCurrentRowElements: () => IElement[] | null
  getCurrentParagraphElements: () => IElement[] | null
  getCursorContext: () => RangeContext | null
  getAllElementPositionList: () => any[]
  setCursorToIndex: (index: number) => void
}

// 定义插件函数类型
export type PluginFunction = (editor: Editor) => void