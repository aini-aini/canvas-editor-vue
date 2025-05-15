import type Editor from '../../../editor'
import type { IElementPosition } from '../../../editor/interface/Element'

/**
 * 获取当前光标位置信息
 * @param editor 编辑器实例
 * @returns 光标位置信息，包含 index、x、y、pageNo、rowIndex 等信息
 */
export const getCursorInfo = (editor: Editor): IElementPosition | null => {
    return editor.command.getCursorPosition()
}

/**
 * 获取当前光标所在行的元素列表
 * @param editor 编辑器实例
 * @returns 当前行元素列表
 */
export const getCurrentRowElements = (editor: Editor) => {
    return editor.command.getRangeRow()
}

/**
 * 获取当前光标所在段落的元素列表
 * @param editor 编辑器实例
 * @returns 当前段落元素列表
 */
export const getCurrentParagraphElements = (editor: Editor) => {
    return editor.command.getRangeParagraph()
}

/**
 * 获取当前光标所在位置的上下文信息
 * @param editor 编辑器实例
 * @returns 光标上下文信息，包含选区、元素、页码等信息
 */
export const getCursorContext = (editor: Editor) => {
    return editor.command.getRangeContext()
} 