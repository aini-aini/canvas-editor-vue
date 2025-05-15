import type Editor from '../../../editor'

/**
 * 获取所有元素的位置信息列表
 * @param editor 编辑器实例
 * @returns positionList
 */
export const getAllElementPositionList = (editor: Editor) => {
    return editor.command.executeGetAllElementPositionList()
} 