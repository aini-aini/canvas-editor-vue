// src/plugins/ai_write/AiWritePlugin.ts
import type Editor from '../../editor'
import { TitleRenderer } from './modules/TitleRenderer'
import { ParagraphRenderer } from './modules/ParagraphRenderer'
import { LineBreakRenderer } from './modules/LineBreakRenderer'
import { ImageRenderer } from './modules/ImageRenderer'
import { TableRenderer } from './modules/TableRenderer'
import { ListRenderer } from './modules/ListRenderer'
import type { IAiWritePlugin } from './types'

export class AiWritePlugin implements IAiWritePlugin {
  private titleRenderer: TitleRenderer
  private paragraphRenderer: ParagraphRenderer
  private lineBreakRenderer: LineBreakRenderer
  private imageRenderer: ImageRenderer
  private tableRenderer: TableRenderer
  private listRenderer: ListRenderer
  // 未来可以继续添加其它 renderer

  constructor(editor: Editor) {
    this.titleRenderer = new TitleRenderer(editor)
    this.paragraphRenderer = new ParagraphRenderer(editor)
    this.lineBreakRenderer = new LineBreakRenderer(editor)
    this.imageRenderer = new ImageRenderer(editor)
    this.tableRenderer = new TableRenderer(editor)
    this.listRenderer = new ListRenderer(editor)
    // 未来可以继续初始化其它 renderer
  }

  // 标题相关
  public async renderH1(text: string): Promise<void> {
    await this.titleRenderer.renderH1(text)
  }
  public async renderH2(text: string): Promise<void> {
    await this.titleRenderer.renderH2(text)
  }
  public async renderH3(text: string): Promise<void> {
    await this.titleRenderer.renderH3(text)
  }
  public async renderH4(text: string): Promise<void> {
    await this.titleRenderer.renderH4(text)
  }
  public async renderH5(text: string): Promise<void> {
    await this.titleRenderer.renderH5(text)
  }
  public async renderH6(text: string): Promise<void> {
    await this.titleRenderer.renderH6(text)
  }

  // 段落相关
  public async writeParagraph(text: string): Promise<void> {
    await this.paragraphRenderer.writeParagraph(text)
  }

  public async insertLineBreak(): Promise<void> {
    await this.lineBreakRenderer.insertLineBreak()
  }

  public async insertImage(url: string): Promise<void> {
    await this.imageRenderer.insertImage(url)
  }

  // 表格相关
  public async insertTable(): Promise<void> {
    await this.tableRenderer.insertTable()
  }

  // 列表相关
  public async insertOrderedList(items: string[]): Promise<void> {
    await this.listRenderer.insertOrderedList(items)
  }

  public async insertCheckboxList(items: string[]): Promise<void> {
    await this.listRenderer.insertCheckboxList(items)
  }

  public async insertDiscList(items: string[]): Promise<void> {
    await this.listRenderer.insertDiscList(items)
  }

  public async insertCircleList(items: string[]): Promise<void> {
    await this.listRenderer.insertCircleList(items)
  }

  public async insertSquareList(items: string[]): Promise<void> {
    await this.listRenderer.insertSquareList(items)
  }

  // 未来可以继续添加表格、图片、列表等方法
  // public insertTable(...) { this.tableRenderer.insertTable(...) }
  // public insertImage(...) { this.imageRenderer.insertImage(...) }
  // public insertList(...) { this.listRenderer.insertList(...) }
}