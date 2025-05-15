import type Editor from '../../../editor'

export class TableRenderer {
    private editor: Editor

    constructor(editor: Editor) {
        this.editor = editor
    }

    /**
     * 异步插入一个 5x5 的空表格
     */
    public async insertTable(): Promise<void> {
        // 默认插入 5 行 5 列
        const rowCount = 5
        const colCount = 5
        const positionList = this.editor.command.executeGetAllElementPositionList()
        const endIndex = positionList.length - 1

        this.editor.command.executeSetRange(endIndex, endIndex)
        return new Promise((resolve) => {
            // 这里假设 executeInsertTable 是同步的，如果是异步的可以直接 await
            this.editor.command.executeInsertTable(rowCount, colCount)
            resolve()
        })
    }
} 