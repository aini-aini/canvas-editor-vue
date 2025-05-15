import type Editor from '../../../editor'
import { ListType } from '../../../editor/dataset/enum/List'
import type { IElement } from '../../../editor/interface/Element'
import { ListStyle } from '../../../editor'

export class ListRenderer {
    private editor: Editor

    constructor(editor: Editor) {
        this.editor = editor
    }

    /**
     * 插入有序列表
     * @param items 列表项数组
     */
    public async insertOrderedList(items: string[]): Promise<void> {



        await this.insertList(items, ListType.OL, ListStyle.DECIMAL)
    }

    /**
     * 插入复选框列表
     * @param items 列表项数组
     */
    public async insertCheckboxList(items: string[]): Promise<void> {
        await this.insertList(items, ListType.UL, ListStyle.CHECKBOX)
    }

    /**
     * 插入实心圆点列表
     * @param items 列表项数组
     */
    public async insertDiscList(items: string[]): Promise<void> {
        await this.insertList(items, ListType.UL, ListStyle.DISC)
    }

    /**
     * 插入空心圆点列表
     * @param items 列表项数组
     */
    public async insertCircleList(items: string[]): Promise<void> {
        await this.insertList(items, ListType.UL, ListStyle.CIRCLE)
    }

    /**
     * 插入空心方块列表
     * @param items 列表项数组
     */
    public async insertSquareList(items: string[]): Promise<void> {
        await this.insertList(items, ListType.UL, ListStyle.SQUARE)
    }

    /**
     * 插入列表的通用方法
     * @param items 列表项数组
     * @param listType 列表类型
     * @param listStyle 列表样式
     */
    private async insertList(items: string[], listType: ListType, listStyle: ListStyle): Promise<void> {
        if (!items || !items.length) return

        // 获取当前编辑器内容
        const currentData = this.editor.command.getValue()
        const positionList = this.editor.command.executeGetAllElementPositionList()
        const endIndex = positionList.length - 1

        // 设置光标位置
        this.editor.command.executeSetRange(endIndex, endIndex)

        // 插入列表
        this.editor.command.executeList(listType, listStyle)

        // 为每个列表项添加内容
        for (const item of items) {
            const element: IElement = {
                value: item,
                listType,
                listStyle
            }
            this.editor.command.executeInsertElementList([element])
            // 添加换行
            this.editor.command.executeInsertElementList([{ value: '\n' }])
        }

        return Promise.resolve()
    }
} 