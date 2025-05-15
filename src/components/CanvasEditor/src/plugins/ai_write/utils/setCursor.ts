import type Editor from '../../../editor'

/**
 * 将光标插入到指定 index 位置
 * @param editor 编辑器实例
 * @param index 目标索引
 */
export const setCursorToIndex = (editor: Editor, index: number) => {
    editor.command.executeSetRange(index, index)
} 