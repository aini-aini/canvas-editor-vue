// src/plugins/ai_write/TitleRenderer.ts
import type Editor from '../../../editor'
import { TitleLevel } from '../../../editor/dataset/enum/Title'
import type { IElement } from '../../../editor/interface/Element'
import { ITitleRenderer } from '../types'

export class TitleRenderer implements ITitleRenderer {
  private editor: Editor


  constructor(editor: Editor) {
    if (!editor || !editor.command) {
      throw new Error('编辑器实例未正确初始化')

    }
    this.editor = editor
  }

  /**
   * 渲染标题的私有方法
   * @param text 标题文本
   * @param level 标题级别
   */
  private async renderTitle(text: string, level: TitleLevel): Promise<void> {
    // 获取当前编辑器内容
    const currentData = this.editor.command.getValue()


    // 创建标题元素
    const titleElement: IElement = {
      value: text,
      level: level,
      titleId: Date.now().toString(),
      size: (this.editor.command.getOptions().title as any)[`default${level.charAt(0).toUpperCase() + level.slice(1)}Size`],
      bold: true
    }

    // 创建换行元素
    const newlineElement: IElement = {
      value: '\n'
    }

    // 更新编辑器内容


    this.editor.command.executeSetValue({
      ...currentData.data,
      main: [...currentData.data.main, titleElement, newlineElement]
    })

    // 设置标题级别
    this.editor.command.executeTitle(level)
    return Promise.resolve()
  }

  public async renderH1(text: string): Promise<void> {
    await this.renderTitle(text, TitleLevel.FIRST)
  }

  public async renderH2(text: string): Promise<void> {
    await this.renderTitle(text, TitleLevel.SECOND)
  }

  public async renderH3(text: string): Promise<void> {
    await this.renderTitle(text, TitleLevel.THIRD)
  }

  public async renderH4(text: string): Promise<void> {
    await this.renderTitle(text, TitleLevel.FOURTH)
  }

  public async renderH5(text: string): Promise<void> {
    await this.renderTitle(text, TitleLevel.FIFTH)
  }

  public async renderH6(text: string): Promise<void> {
    await this.renderTitle(text, TitleLevel.SIXTH)
  }
}