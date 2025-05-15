// 导入元素类型、列表样式、行布局方式、垂直对齐方式等枚举
import { ElementType, ListStyle, RowFlex, VerticalAlign } from '../..'

// 导入常量，ZERO 通常用于表示空字符或零值
import { ZERO } from '../../dataset/constant/Common'

// 导入控件组件类型枚举，用于识别不同类型的控件（如复选框、单选框等）
import { ControlComponent } from '../../dataset/enum/Control'

// 导入位置计算相关的接口定义
import {
  // 计算页面行位置的参数接口
  IComputePageRowPositionPayload,
  // 计算页面行位置的结果接口
  IComputePageRowPositionResult,
  // 计算行位置的参数接口
  IComputeRowPositionPayload,
  // 浮动元素位置接口
  IFloatPosition,
  // 根据坐标获取浮动元素位置的参数接口
  IGetFloatPositionByXYPayload,
  // 设置环绕位置的参数接口
  ISetSurroundPositionPayload
} from '../../interface/Position'

// 导入编辑器配置选项接口
import { IEditorOption } from '../../interface/Editor'

// 导入元素相关的接口定义
import { IElement, IElementPosition } from '../../interface/Element'

// 导入位置相关的接口定义
import {
  // 当前位置信息接口
  ICurrentPosition,
  // 根据坐标获取位置的参数接口
  IGetPositionByXYPayload,
  // 位置上下文接口
  IPositionContext
} from '../../interface/Position'

// 导入绘制器类，用于处理画布绘制
import { Draw } from '../draw/Draw'

// 导入编辑器模式和区域枚举
import { EditorMode, EditorZone } from '../../dataset/enum/Editor'

// 导入工具函数
import { deepClone, isRectIntersect } from '../../utils'
// - deepClone: 深拷贝函数
// - isRectIntersect: 判断两个矩形是否相交

// 导入图片显示方式枚举
import { ImageDisplay } from '../../dataset/enum/Common'

// 导入深度必需的泛型类型
import { DeepRequired } from '../../interface/Common'

// 导入事件总线
import { EventBus } from '../event/eventbus/EventBus'

// 导入事件总线映射接口
import { EventBusMap } from '../../interface/EventBus'

// 导入判断是否为块级元素的工具函数
import { getIsBlockElement } from '../../utils/element'

export class Position {
// 核心属性定义
private cursorPosition: IElementPosition | null  // 当前光标位置信息
private positionContext: IPositionContext       // 位置上下文信息（如是否在表格中、是否在控件中等）
private positionList: IElementPosition[]        // 所有元素的位置列表
private floatPositionList: IFloatPosition[]     // 浮动元素（如图片）的位置列表

// 依赖注入
private draw: Draw                              // 绘制器实例
private eventBus: EventBus<EventBusMap>        // 事件总线
private options: DeepRequired<IEditorOption>   // 编辑器配置选项

/**
 * 构造函数
 * @param draw 绘制器实例
 */
constructor(draw: Draw) {
  // 初始化位置列表
  this.positionList = []
  this.floatPositionList = []
  this.cursorPosition = null
  // 初始化位置上下文
  this.positionContext = {
    isTable: false,    // 是否在表格中
    isControl: false   // 是否在控件中
  }

  // 保存依赖
  this.draw = draw
  this.eventBus = draw.getEventBus()
  this.options = draw.getOptions()
}

/**
 * 获取浮动元素位置列表
 */
public getFloatPositionList(): IFloatPosition[] {
  return this.floatPositionList
}

/**
 * 获取表格中的位置列表
 * @param sourceElementList 源元素列表
 */
public getTablePositionList(sourceElementList: IElement[]): IElementPosition[] {
  const { index, trIndex, tdIndex } = this.positionContext
  return sourceElementList[index!].trList![trIndex!].tdList[tdIndex!].positionList || []
}

/**
 * 获取当前位置列表
 * 如果在表格中，返回表格中的位置列表；否则返回原始位置列表
 */
public getPositionList(): IElementPosition[] {
  return this.positionContext.isTable
    ? this.getTablePositionList(this.draw.getOriginalElementList())
    : this.getOriginalPositionList()
}

/**
 * 获取主区域位置列表
 */
public getMainPositionList(): IElementPosition[] {
  return this.positionContext.isTable
    ? this.getTablePositionList(this.draw.getOriginalMainElementList())
    : this.positionList
}

/**
 * 获取原始位置列表
 * 根据当前区域（页眉、页脚、正文）返回对应的位置列表
 */
public getOriginalPositionList(): IElementPosition[] {
  const zoneManager = this.draw.getZone()
  // 如果在页眉区域
  if (zoneManager.isHeaderActive()) {
    const header = this.draw.getHeader()
    return header.getPositionList()
  }
  // 如果在页脚区域
  if (zoneManager.isFooterActive()) {
    const footer = this.draw.getFooter()
    return footer.getPositionList()
  }
  // 在正文区域
  return this.positionList
}

/**
 * 获取原始主区域位置列表
 */
public getOriginalMainPositionList(): IElementPosition[] {
  return this.positionList
}

/**
 * 获取选区位置列表
 * 如果没有选区（起始位置等于结束位置），返回null
 */
public getSelectionPositionList(): IElementPosition[] | null {
  const { startIndex, endIndex } = this.draw.getRange().getRange()
  if (startIndex === endIndex) return null
  const positionList = this.getPositionList()
  return positionList.slice(startIndex + 1, endIndex + 1)
}

/**
 * 设置位置列表
 * @param payload 新的位置列表
 */
public setPositionList(payload: IElementPosition[]) {
  this.positionList = payload
}

/**
 * 设置浮动元素位置列表
 * @param payload 新的浮动元素位置列表
 */
public setFloatPositionList(payload: IFloatPosition[]) {
  this.floatPositionList = payload
}

/**
 * 计算页面行位置
 * @param payload 计算参数
 */
public computePageRowPosition(payload: IComputePageRowPositionPayload): IComputePageRowPositionResult {
  const {
    positionList,
    rowList,
    pageNo,
    startX,
    startY,
    startRowIndex,
    startIndex,
    innerWidth,
    zone
  } = payload
  const {
    scale,
    table: { tdPadding }
  } = this.options
  
  let x = startX
  let y = startY
  let index = startIndex

  // 遍历每一行
  for (let i = 0; i < rowList.length; i++) {
    const curRow = rowList[i]
    
    // 处理行布局（居中、居右等）
    if (!curRow.isSurround) {
      const curRowWidth = curRow.width + (curRow.offsetX || 0)
      if (curRow.rowFlex === RowFlex.CENTER) {
        x += (innerWidth - curRowWidth) / 2
      } else if (curRow.rowFlex === RowFlex.RIGHT) {
        x += innerWidth - curRowWidth
      }
    }

    // 应用行偏移
    x += curRow.offsetX || 0
    y += curRow.offsetY || 0
    
    // 记录表格单元格的起始位置
    const tablePreX = x
    const tablePreY = y

    // 遍历行中的每个元素
    for (let j = 0; j < curRow.elementList.length; j++) {
      const element = curRow.elementList[j]
      const metrics = element.metrics
      
      // 计算垂直偏移
      const offsetY =
        (element.imgDisplay !== ImageDisplay.INLINE &&
          element.type === ElementType.IMAGE) ||
        element.type === ElementType.LATEX
          ? curRow.ascent - metrics.height
          : curRow.ascent

      // 应用元素左边距
      if (element.left) {
        x += element.left
      }

      // 创建位置信息对象
      const positionItem: IElementPosition = {
        pageNo,
        index,
        value: element.value,
        rowIndex: startRowIndex + i,
        rowNo: i,
        metrics,
        left: element.left || 0,
        ascent: offsetY,
        lineHeight: curRow.height,
        isFirstLetter: j === 0,
        isLastLetter: j === curRow.elementList.length - 1,
        coordinate: {
          leftTop: [x, y],
          leftBottom: [x, y + curRow.height],
          rightTop: [x + metrics.width, y],
          rightBottom: [x + metrics.width, y + curRow.height]
        }
      }

      // 处理浮动元素
      if (
        element.imgDisplay === ImageDisplay.SURROUND ||
        element.imgDisplay === ImageDisplay.FLOAT_TOP ||
        element.imgDisplay === ImageDisplay.FLOAT_BOTTOM
      ) {
        // 使用上一个位置信息
        const prePosition = positionList[positionList.length - 1]
        if (prePosition) {
          positionItem.metrics = prePosition.metrics
          positionItem.coordinate = prePosition.coordinate
        }
        
        // 设置浮动元素初始位置
        if (!element.imgFloatPosition) {
          element.imgFloatPosition = {
            x,
            y,
            pageNo
          }
        }
        
        // 添加到浮动元素列表
        this.floatPositionList.push({
          pageNo,
          element,
          position: positionItem,
          isTable: payload.isTable,
          index: payload.index,
          tdIndex: payload.tdIndex,
          trIndex: payload.trIndex,
          tdValueIndex: index,
          zone
        })
      }

      // 添加到位置列表
      positionList.push(positionItem)
      index++
      x += metrics.width

      // 处理表格元素
      if (element.type === ElementType.TABLE) {
        // 计算表格内边距
        const tdPaddingWidth = tdPadding[1] + tdPadding[3]
        const tdPaddingHeight = tdPadding[0] + tdPadding[2]
        
        // 遍历表格行和列
        for (let t = 0; t < element.trList!.length; t++) {
          const tr = element.trList![t]
          for (let d = 0; d < tr.tdList!.length; d++) {
            const td = tr.tdList[d]
            td.positionList = []
            const rowList = td.rowList!
            
            // 计算单元格内元素位置
            const drawRowResult = this.computePageRowPosition({
              positionList: td.positionList,
              rowList,
              pageNo,
              startRowIndex: 0,
              startIndex: 0,
              startX: (td.x! + tdPadding[3]) * scale + tablePreX,
              startY: (td.y! + tdPadding[0]) * scale + tablePreY,
              innerWidth: (td.width! - tdPaddingWidth) * scale,
              isTable: true,
              index: index - 1,
              tdIndex: d,
              trIndex: t,
              zone
            })

            // 处理单元格垂直对齐
            if (
              td.verticalAlign === VerticalAlign.MIDDLE ||
              td.verticalAlign === VerticalAlign.BOTTOM
            ) {
              // 计算行高总和
              const rowsHeight = rowList.reduce(
                (pre, cur) => pre + cur.height,
                0
              )
              // 计算空白高度
              const blankHeight =
                (td.height! - tdPaddingHeight) * scale - rowsHeight
              // 计算偏移高度
              const offsetHeight =
                td.verticalAlign === VerticalAlign.MIDDLE
                  ? blankHeight / 2
                  : blankHeight
              
              // 应用垂直偏移
              if (Math.floor(offsetHeight) > 0) {
                td.positionList.forEach(tdPosition => {
                  const {
                    coordinate: { leftTop, leftBottom, rightBottom, rightTop }
                  } = tdPosition
                  leftTop[1] += offsetHeight
                  leftBottom[1] += offsetHeight
                  rightBottom[1] += offsetHeight
                  rightTop[1] += offsetHeight
                })
              }
            }
            x = drawRowResult.x
            y = drawRowResult.y
          }
        }
        // 恢复初始位置
        x = tablePreX
        y = tablePreY
      }
    }
    // 重置x坐标，增加y坐标
    x = startX
    y += curRow.height
  }
  return { x, y, index }
}

/**
 * 计算所有元素的位置列表
 */
public computePositionList() {
  // 清空原有位置信息
  this.positionList = []
  
  // 获取页面参数
  const innerWidth = this.draw.getInnerWidth()
  const pageRowList = this.draw.getPageRowList()
  const margins = this.draw.getMargins()
  const startX = margins[3]
  
  // 计算起始Y坐标（考虑页眉高度）
  const header = this.draw.getHeader()
  const extraHeight = header.getExtraHeight()
  const startY = margins[0] + extraHeight
  
  let startRowIndex = 0
  
  // 遍历每一页
  for (let i = 0; i < pageRowList.length; i++) {
    const rowList = pageRowList[i]
    const startIndex = rowList[0]?.startIndex
    // 计算当前页的位置
    this.computePageRowPosition({
      positionList: this.positionList,
      rowList,
      pageNo: i,
      startRowIndex,
      startIndex,
      startX,
      startY,
      innerWidth
    })
    startRowIndex += rowList.length
  }
}

  public computeRowPosition(
    payload: IComputeRowPositionPayload
  ): IElementPosition[] {
    const { row, innerWidth } = payload
    const positionList: IElementPosition[] = []
    this.computePageRowPosition({
      positionList,
      innerWidth,
      rowList: [deepClone(row)],
      pageNo: 0,
      startX: 0,
      startY: 0,
      startIndex: 0,
      startRowIndex: 0
    })
    return positionList
  }

  public setCursorPosition(position: IElementPosition | null) {
    this.cursorPosition = position
  }

  public getCursorPosition(): IElementPosition | null {
    return this.cursorPosition
  }

  public getPositionContext(): IPositionContext {
    return this.positionContext
  }

  public setPositionContext(payload: IPositionContext) {
    this.eventBus.emit('positionContextChange', {
      value: payload,
      oldValue: this.positionContext
    })
    this.positionContext = payload
  }

  public getPositionByXY(payload: IGetPositionByXYPayload): ICurrentPosition {
    const { x, y, isTable } = payload
    let { elementList, positionList } = payload
    if (!elementList) {
      elementList = this.draw.getOriginalElementList()
    }
    if (!positionList) {
      positionList = this.getOriginalPositionList()
    }
    const zoneManager = this.draw.getZone()
    const curPageNo = payload.pageNo ?? this.draw.getPageNo()
    const isMainActive = zoneManager.isMainActive()
    const positionNo = isMainActive ? curPageNo : 0
    // 验证浮于文字上方元素
    if (!isTable) {
      const floatTopPosition = this.getFloatPositionByXY({
        ...payload,
        imgDisplays: [ImageDisplay.FLOAT_TOP, ImageDisplay.SURROUND]
      })
      if (floatTopPosition) return floatTopPosition
    }
    // 普通元素
    for (let j = 0; j < positionList.length; j++) {
      const {
        index,
        pageNo,
        left,
        isFirstLetter,
        coordinate: { leftTop, rightTop, leftBottom }
      } = positionList[j]
      if (positionNo !== pageNo) continue
      if (pageNo > positionNo) break
      // 命中元素
      if (
        leftTop[0] - left <= x &&
        rightTop[0] >= x &&
        leftTop[1] <= y &&
        leftBottom[1] >= y
      ) {
        let curPositionIndex = j
        const element = elementList[j]
        // 表格被命中
        if (element.type === ElementType.TABLE) {
          for (let t = 0; t < element.trList!.length; t++) {
            const tr = element.trList![t]
            for (let d = 0; d < tr.tdList.length; d++) {
              const td = tr.tdList[d]
              const tablePosition = this.getPositionByXY({
                x,
                y,
                td,
                pageNo: curPageNo,
                tablePosition: positionList[j],
                isTable: true,
                elementList: td.value,
                positionList: td.positionList
              })
              if (~tablePosition.index) {
                const { index: tdValueIndex, hitLineStartIndex } = tablePosition
                const tdValueElement = td.value[tdValueIndex]
                return {
                  index,
                  isCheckbox:
                    tablePosition.isCheckbox ||
                    tdValueElement.type === ElementType.CHECKBOX ||
                    tdValueElement.controlComponent ===
                      ControlComponent.CHECKBOX,
                  isRadio:
                    tdValueElement.type === ElementType.RADIO ||
                    tdValueElement.controlComponent === ControlComponent.RADIO,
                  isControl: !!tdValueElement.controlId,
                  isImage: tablePosition.isImage,
                  isDirectHit: tablePosition.isDirectHit,
                  isTable: true,
                  tdIndex: d,
                  trIndex: t,
                  tdValueIndex,
                  tdId: td.id,
                  trId: tr.id,
                  tableId: element.id,
                  hitLineStartIndex
                }
              }
            }
          }
        }
        // 图片区域均为命中
        if (
          element.type === ElementType.IMAGE ||
          element.type === ElementType.LATEX
        ) {
          return {
            index: curPositionIndex,
            isDirectHit: true,
            isImage: true
          }
        }
        if (
          element.type === ElementType.CHECKBOX ||
          element.controlComponent === ControlComponent.CHECKBOX
        ) {
          return {
            index: curPositionIndex,
            isDirectHit: true,
            isCheckbox: true
          }
        }
        if (
          element.type === ElementType.RADIO ||
          element.controlComponent === ControlComponent.RADIO
        ) {
          return {
            index: curPositionIndex,
            isDirectHit: true,
            isRadio: true
          }
        }
        let hitLineStartIndex: number | undefined
        // 判断是否在文字中间前后
        if (elementList[index].value !== ZERO) {
          const valueWidth = rightTop[0] - leftTop[0]
          if (x < leftTop[0] + valueWidth / 2) {
            curPositionIndex = j - 1
            if (isFirstLetter) {
              hitLineStartIndex = j
            }
          }
        }
        return {
          isDirectHit: true,
          hitLineStartIndex,
          index: curPositionIndex,
          isControl: !!element.controlId
        }
      }
    }
    // 验证衬于文字下方元素
    if (!isTable) {
      const floatBottomPosition = this.getFloatPositionByXY({
        ...payload,
        imgDisplays: [ImageDisplay.FLOAT_BOTTOM]
      })
      if (floatBottomPosition) return floatBottomPosition
    }
    // 非命中区域
    let isLastArea = false
    let curPositionIndex = -1
    let hitLineStartIndex: number | undefined
    // 判断是否在表格内
    if (isTable) {
      const { scale } = this.options
      const { td, tablePosition } = payload
      if (td && tablePosition) {
        const { leftTop } = tablePosition.coordinate
        const tdX = td.x! * scale + leftTop[0]
        const tdY = td.y! * scale + leftTop[1]
        const tdWidth = td.width! * scale
        const tdHeight = td.height! * scale
        if (!(tdX < x && x < tdX + tdWidth && tdY < y && y < tdY + tdHeight)) {
          return {
            index: curPositionIndex
          }
        }
      }
    }
    // 判断所属行是否存在元素
    const lastLetterList = positionList.filter(
      p => p.isLastLetter && p.pageNo === positionNo
    )
    for (let j = 0; j < lastLetterList.length; j++) {
      const {
        index,
        rowNo,
        coordinate: { leftTop, leftBottom }
      } = lastLetterList[j]
      if (y > leftTop[1] && y <= leftBottom[1]) {
        const headIndex = positionList.findIndex(
          p => p.pageNo === positionNo && p.rowNo === rowNo
        )
        const headElement = elementList[headIndex]
        const headPosition = positionList[headIndex]
        // 是否在头部
        const headStartX =
          headElement.listStyle === ListStyle.CHECKBOX
            ? this.draw.getMargins()[3]
            : headPosition.coordinate.leftTop[0]
        if (x < headStartX) {
          // 头部元素为空元素时无需选中
          if (~headIndex) {
            if (headPosition.value === ZERO) {
              curPositionIndex = headIndex
            } else {
              curPositionIndex = headIndex - 1
              hitLineStartIndex = headIndex
            }
          } else {
            curPositionIndex = index
          }
        } else {
          // 是否是复选框列表
          if (headElement.listStyle === ListStyle.CHECKBOX && x < leftTop[0]) {
            return {
              index: headIndex,
              isDirectHit: true,
              isCheckbox: true
            }
          }
          curPositionIndex = index
        }
        isLastArea = true
        break
      }
    }
    if (!isLastArea) {
      // 页眉底部距离页面顶部距离
      const header = this.draw.getHeader()
      const headerHeight = header.getHeight()
      const headerBottomY = header.getHeaderTop() + headerHeight
      // 页脚上部距离页面顶部距离
      const footer = this.draw.getFooter()
      const pageHeight = this.draw.getHeight()
      const footerTopY =
        pageHeight - (footer.getFooterBottom() + footer.getHeight())
      // 判断所属位置是否属于页眉页脚区域
      if (isMainActive) {
        // 页眉：当前位置小于页眉底部位置
        if (y < headerBottomY) {
          return {
            index: -1,
            zone: EditorZone.HEADER
          }
        }
        // 页脚：当前位置大于页脚顶部位置
        if (y > footerTopY) {
          return {
            index: -1,
            zone: EditorZone.FOOTER
          }
        }
      } else {
        // main区域：当前位置小于页眉底部位置 && 大于页脚顶部位置
        if (y <= footerTopY && y >= headerBottomY) {
          return {
            index: -1,
            zone: EditorZone.MAIN
          }
        }
      }
      // 正文上-循环首行
      const margins = this.draw.getMargins()
      if (y <= margins[0]) {
        for (let p = 0; p < positionList.length; p++) {
          const position = positionList[p]
          if (position.pageNo !== positionNo || position.rowNo !== 0) continue
          const { leftTop, rightTop } = position.coordinate
          // 小于左页边距 || 命中文字 || 首行最后元素
          if (
            x <= margins[3] ||
            (x >= leftTop[0] && x <= rightTop[0]) ||
            positionList[p + 1]?.rowNo !== 0
          ) {
            return {
              index: position.index
            }
          }
        }
      } else {
        // 正文下-循环尾行
        const lastLetter = lastLetterList[lastLetterList.length - 1]
        if (lastLetter) {
          const lastRowNo = lastLetter.rowNo
          for (let p = 0; p < positionList.length; p++) {
            const position = positionList[p]
            if (
              position.pageNo !== positionNo ||
              position.rowNo !== lastRowNo
            ) {
              continue
            }
            const { leftTop, rightTop } = position.coordinate
            // 小于左页边距 || 命中文字 || 尾行最后元素
            if (
              x <= margins[3] ||
              (x >= leftTop[0] && x <= rightTop[0]) ||
              positionList[p + 1]?.rowNo !== lastRowNo
            ) {
              return {
                index: position.index
              }
            }
          }
        }
      }
      // 当前页最后一行
      return {
        index:
          lastLetterList[lastLetterList.length - 1]?.index ||
          positionList.length - 1
      }
    }
    return {
      hitLineStartIndex,
      index: curPositionIndex,
      isControl: !!elementList[curPositionIndex]?.controlId
    }
  }

  public getFloatPositionByXY(
    payload: IGetFloatPositionByXYPayload
  ): ICurrentPosition | void {
    const { x, y } = payload
    const currentPageNo = payload.pageNo ?? this.draw.getPageNo()
    const currentZone = this.draw.getZone().getZone()
    for (let f = 0; f < this.floatPositionList.length; f++) {
      const {
        position,
        element,
        isTable,
        index,
        trIndex,
        tdIndex,
        tdValueIndex,
        zone: floatElementZone,
        pageNo
      } = this.floatPositionList[f]
      if (
        currentPageNo === pageNo &&
        element.type === ElementType.IMAGE &&
        element.imgDisplay &&
        payload.imgDisplays.includes(element.imgDisplay) &&
        (!floatElementZone || floatElementZone === currentZone)
      ) {
        const imgFloatPosition = element.imgFloatPosition!
        if (
          x >= imgFloatPosition.x &&
          x <= imgFloatPosition.x + element.width! &&
          y >= imgFloatPosition.y &&
          y <= imgFloatPosition.y + element.height!
        ) {
          if (isTable) {
            return {
              index: index!,
              isDirectHit: true,
              isImage: true,
              isTable,
              trIndex,
              tdIndex,
              tdValueIndex,
              tdId: element.tdId,
              trId: element.trId,
              tableId: element.tableId
            }
          }
          return {
            index: position.index,
            isDirectHit: true,
            isImage: true
          }
        }
      }
    }
  }

  public adjustPositionContext(
    payload: IGetPositionByXYPayload
  ): ICurrentPosition | null {
    const positionResult = this.getPositionByXY(payload)
    if (!~positionResult.index) return null
    // 移动控件内光标
    if (
      positionResult.isControl &&
      this.draw.getMode() !== EditorMode.READONLY
    ) {
      const { index, isTable, trIndex, tdIndex, tdValueIndex } = positionResult
      const control = this.draw.getControl()
      const { newIndex } = control.moveCursor({
        index,
        isTable,
        trIndex,
        tdIndex,
        tdValueIndex
      })
      if (isTable) {
        positionResult.tdValueIndex = newIndex
      } else {
        positionResult.index = newIndex
      }
    }
    const {
      index,
      isCheckbox,
      isRadio,
      isControl,
      isImage,
      isDirectHit,
      isTable,
      trIndex,
      tdIndex,
      tdId,
      trId,
      tableId
    } = positionResult
    // 设置位置上下文
    this.setPositionContext({
      isTable: isTable || false,
      isCheckbox: isCheckbox || false,
      isRadio: isRadio || false,
      isControl: isControl || false,
      isImage: isImage || false,
      isDirectHit: isDirectHit || false,
      index,
      trIndex,
      tdIndex,
      tdId,
      trId,
      tableId
    })
    return positionResult
  }

  public setSurroundPosition(payload: ISetSurroundPositionPayload) {
    const {
      pageNo,
      row,
      rowElement,
      rowElementRect,
      surroundElementList,
      availableWidth
    } = payload
    let x = rowElementRect.x
    let rowIncreaseWidth = 0
    if (
      surroundElementList.length &&
      !getIsBlockElement(rowElement) &&
      !rowElement.control?.minWidth
    ) {
      for (let s = 0; s < surroundElementList.length; s++) {
        const surroundElement = surroundElementList[s]
        const floatPosition = surroundElement.imgFloatPosition!
        if (floatPosition.pageNo !== pageNo) continue
        const surroundRect = {
          ...floatPosition,
          width: surroundElement.width!,
          height: surroundElement.height!
        }
        if (isRectIntersect(rowElementRect, surroundRect)) {
          row.isSurround = true
          // 需向左移动距离：浮动元素宽度 + 浮动元素左上坐标 - 元素左上坐标
          const translateX =
            surroundRect.width + surroundRect.x - rowElementRect.x
          rowElement.left = translateX
          // 增加行宽
          row.width += translateX
          rowIncreaseWidth += translateX
          // 下个元素起始位置：浮动元素右坐标 - 元素宽度
          x = surroundRect.x + surroundRect.width
          // 检测宽度是否足够，不够则移动到下一行，并还原状态
          if (row.width + rowElement.metrics.width > availableWidth) {
            rowElement.left = 0
            row.width -= rowIncreaseWidth
            break
          }
        }
      }
    }
    return { x, rowIncreaseWidth }
  }
}
