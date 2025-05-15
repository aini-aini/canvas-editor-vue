// 各种依赖的导入
import { ElementStyleKey } from '../../dataset/enum/ElementStyle'
import type { IElement, IElementPosition } from '../../interface/Element'
import type { ICurrentPosition, IPositionContext } from '../../interface/Position'
import { Draw } from '../draw/Draw'
import { Position } from '../position/Position'
import { RangeManager } from '../range/RangeManager'
import { threeClick } from '../../utils'
import type { IRange, IRangeElementStyle } from '../../interface/Range'
import { mousedown } from './handlers/mousedown'
import { mouseup } from './handlers/mouseup'
import { mouseleave } from './handlers/mouseleave'
import { mousemove } from './handlers/mousemove'
import { keydown } from './handlers/keydown'
import { input } from './handlers/input'
import { cut } from './handlers/cut'
import { copy } from './handlers/copy'
import { drop } from './handlers/drop'
import click from './handlers/click'
import composition from './handlers/composition'
import drag from './handlers/drag'
import { isIOS } from '../../utils/ua'
import type { ICopyOption } from '../../interface/Event'

// 输入法组合输入的信息结构
export interface ICompositionInfo {
  elementList: IElement[]         // 参与组合输入的元素列表
  startIndex: number              // 组合输入起始索引
  endIndex: number                // 组合输入结束索引
  value: string                   // 当前组合输入的内容
  defaultStyle: IRangeElementStyle | null // 默认样式
}

// Canvas 事件管理类，负责编辑器所有与用户交互相关的事件处理
export class CanvasEvent {
  // 选区相关
  public isAllowSelection: boolean                // 是否允许选区
  public isComposing: boolean                    // 是否正在输入法组合
  public compositionInfo: ICompositionInfo | null// 当前输入法组合信息

  // 拖拽相关
  public isAllowDrag: boolean                    // 是否允许拖拽
  public isAllowDrop: boolean                    // 是否允许放置
  public cacheRange: IRange | null               // 拖拽时缓存的选区
  public cacheElementList: IElement[] | null     // 拖拽时缓存的元素列表
  public cachePositionList: IElementPosition[] | null // 拖拽时缓存的位置信息
  public cachePositionContext: IPositionContext | null // 拖拽时缓存的位置信息上下文
  public mouseDownStartPosition: ICurrentPosition | null // 鼠标按下时的起始位置

  // 编辑器核心对象
  private draw: Draw                             // Draw 实例，负责渲染
  private pageContainer: HTMLDivElement          // 页面容器（canvas 的父容器）
  private pageList: HTMLCanvasElement[]          // 页面 canvas 列表
  private range: RangeManager                    // 选区管理器
  private position: Position                     // 位置管理器

  // 构造函数，初始化各种状态和依赖
  constructor(draw: Draw) {
    this.draw = draw
    this.pageContainer = draw.getPageContainer()
    this.pageList = draw.getPageList()
    this.range = this.draw.getRange()
    this.position = this.draw.getPosition()

    this.isAllowSelection = false
    this.isComposing = false
    this.compositionInfo = null
    this.isAllowDrag = false
    this.isAllowDrop = false
    this.cacheRange = null
    this.cacheElementList = null
    this.cachePositionList = null
    this.cachePositionContext = null
    this.mouseDownStartPosition = null
  }

  // 获取 Draw 实例
  public getDraw(): Draw {
    return this.draw
  }

  // 注册所有事件监听（鼠标、键盘、拖拽等）
  public register() {
    this.pageContainer.addEventListener('click', this.click.bind(this))
    this.pageContainer.addEventListener('mousedown', this.mousedown.bind(this))
    this.pageContainer.addEventListener('mouseup', this.mouseup.bind(this))
    this.pageContainer.addEventListener(
      'mouseleave',
      this.mouseleave.bind(this)
    )
    this.pageContainer.addEventListener('mousemove', this.mousemove.bind(this))
    this.pageContainer.addEventListener('dblclick', this.dblclick.bind(this))
    this.pageContainer.addEventListener('dragover', this.dragover.bind(this))
    this.pageContainer.addEventListener('drop', this.drop.bind(this))
    // 三击事件（比如三击全选一行）
    threeClick(this.pageContainer, this.threeClick.bind(this))
  }

  // 设置是否允许选区
  public setIsAllowSelection(payload: boolean) {
    this.isAllowSelection = payload
    if (!payload) {
      this.applyPainterStyle()
    }
  }

  // 设置是否允许拖拽
  public setIsAllowDrag(payload: boolean) {
    this.isAllowDrag = payload
    this.isAllowDrop = payload
  }

  // 清除格式刷样式
  public clearPainterStyle() {
    this.pageList.forEach(p => {
      p.style.cursor = 'text'
    })
    this.draw.setPainterStyle(null)
  }

  // 应用格式刷样式到选区
  public applyPainterStyle() {
    const painterStyle = this.draw.getPainterStyle()
    if (!painterStyle) return
    const isDisabled = this.draw.isReadonly() || this.draw.isDisabled()
    if (isDisabled) return
    const selection = this.range.getSelection()
    if (!selection) return
    const painterStyleKeys = Object.keys(painterStyle)
    selection.forEach(s => {
      painterStyleKeys.forEach(pKey => {
        const key = pKey as keyof typeof ElementStyleKey
        s[key] = painterStyle[key] as any
      })
    })
    this.draw.render({ isSetCursor: false })
    // 清除格式刷（如果不是连续格式刷）
    const painterOptions = this.draw.getPainterOptions()
    if (!painterOptions || !painterOptions.isDblclick) {
      this.clearPainterStyle()
    }
  }

  // 全选操作
  public selectAll() {
    const position = this.position.getPositionList()
    this.range.setRange(0, position.length - 1)
    this.draw.render({
      isSubmitHistory: false,
      isSetCursor: false,
      isCompute: false
    })
  }

  // 鼠标移动事件处理
  public mousemove(evt: MouseEvent) {
    mousemove(evt, this)
  }

  // 鼠标按下事件处理
  public mousedown(evt: MouseEvent) {
    mousedown(evt, this)
  }

  // 点击事件处理
  public click() {
    // iOS系统限制非用户主动触发事件的键盘弹出
    if (isIOS && !this.draw.isReadonly()) {
      this.draw.getCursor().getAgentDom().focus()
    }
  }

  // 鼠标弹起事件处理
  public mouseup(evt: MouseEvent) {
    mouseup(evt, this)
  }

  // 鼠标离开事件处理
  public mouseleave(evt: MouseEvent) {
    mouseleave(evt, this)
  }

  // 键盘按下事件处理
  public keydown(evt: KeyboardEvent) {
    keydown(evt, this)
  }

  // 双击事件处理
  public dblclick(evt: MouseEvent) {
    click.dblclick(this, evt)
  }

  // 三击事件处理
  public threeClick() {
    click.threeClick(this)
  }

  // 输入事件处理
  public input(data: string) {
    input(data, this)
  }

  // 剪切事件处理
  public cut() {
    cut(this)
  }

  // 复制事件处理
  public copy(options?: ICopyOption) {
    copy(this, options)
  }

  // 输入法组合开始
  public compositionstart() {
    composition.compositionstart(this)
  }

  // 输入法组合结束
  public compositionend(evt: CompositionEvent) {
    composition.compositionend(this, evt)
  }

  // 拖拽放下事件处理
  public drop(evt: DragEvent) {
    drop(evt, this)
  }

  // 拖拽经过事件处理
  public dragover(evt: DragEvent | MouseEvent) {
    drag.dragover(evt, this)
  }
}