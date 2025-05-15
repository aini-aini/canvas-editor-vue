// 导入常量
import { ZERO } from '../../../dataset/constant/Common'
import {
  EDITOR_ELEMENT_COPY_ATTR,  // 需要复制的元素属性列表
  EDITOR_ELEMENT_STYLE_ATTR  // 需要复制的样式属性列表
} from '../../../dataset/constant/Element'
import { ElementType } from '../../../dataset/enum/Element'
import { IElement } from '../../../interface/Element'
import { IRangeElementStyle } from '../../../interface/Range'
import { splitText } from '../../../utils'
import { formatElementContext } from '../../../utils/element'
import { CanvasEvent } from '../CanvasEvent'

/**
 * 处理输入事件的核心函数
 * @param data 输入的文本内容，比如用户输入的字符"a"或"你"
 * @param host CanvasEvent实例，包含了编辑器的事件处理上下文
 */
export function input(data: string, host: CanvasEvent) {
  // 获取绘制器实例，用于操作画布和元素
  const draw = host.getDraw()

  // 检查编辑器状态
  // 1. 只读模式：用户不能编辑内容
  // 2. 禁用状态：编辑器暂时不可用
  if (draw.isReadonly() || draw.isDisabled()) return
  
  // 获取位置管理器，用于处理光标、选区等位置信息
  const position = draw.getPosition()

  // 获取当前光标的具体位置信息，包括：
  // - x: 光标在画布上的x坐标
  // - y: 光标在画布上的y坐标
  // - height: 光标高度
  // - index: 在元素列表中的索引位置
  const cursorPosition = position.getCursorPosition()
  
  // 安全检查：如果没有输入内容或找不到光标位置，直接返回
  // 这种情况可能发生在：
  // 1. 用户按下了特殊键（如Ctrl、Alt等）
  // 2. 编辑器初始化未完成
  // 3. 光标位置计算错误
  if (!data || !cursorPosition) return
  
  // 检查是否正在使用输入法进行组合输入
  // 比如：用户正在输入中文，还没选字完成
  const isComposing = host.isComposing
  
  // 如果正在组合输入，且输入的内容没变，直接返回
  // 这可以避免重复处理相同的输入内容
  if (isComposing && host.compositionInfo?.value === data) return
  
  // 获取选区管理器，用于处理文本选择、复制等操作
  const rangeManager = draw.getRange()
  
  // 检查当前是否允许输入
  // 比如：某些特殊元素（如只读控件）可能不允许输入
  if (!rangeManager.getIsCanInput()) return

  // 获取默认样式，优先级：
  // 1. 当前选区的样式
  // 2. 组合输入时的样式
  // 3. 如果都没有，则为null
  const defaultStyle =
    rangeManager.getDefaultStyle() || host.compositionInfo?.defaultStyle || null
  
  // 移除之前的组合输入内容
  // 比如：用户输入"zhong"后选择"中"，需要先清除"zhong"
  removeComposingInput(host)
  
  // 如果不是组合输入，清除光标代理DOM的值
  // 光标代理DOM用于显示输入法候选框
  if (!isComposing) {
    const cursor = draw.getCursor()
    cursor.clearAgentDomValue()
  }

  // 定义特殊元素类型常量
  const { TEXT, HYPERLINK, SUBSCRIPT, SUPERSCRIPT, DATE, TAB } = ElementType
  
  // 替换换行符为空字符
  // 因为canvas-editor使用自己的换行处理机制
  const text = data.replaceAll(`\n`, ZERO)
  
  // 获取当前选区的起始和结束位置
  const { startIndex, endIndex } = rangeManager.getRange()
  
  // 获取编辑器中的所有元素列表
  const elementList = draw.getElementList()
  
  // 获取选区起始位置的元素样式，用于复制样式
  const copyElement = rangeManager.getRangeAnchorStyle(elementList, endIndex)
  if (!copyElement) return

  // 检查是否在设计模式下
  // 设计模式允许更多的编辑操作
  const isDesignMode = draw.isDesignMode()
  
  // 将输入文本分割成字符数组，并创建对应的元素
  // 比如："你好"会被分割成["你", "好"]两个元素
  const inputData: IElement[] = splitText(text).map(value => {
    // 创建新元素，初始只有value属性
    const newElement: IElement = {
      value
    }
    
    // 在设计模式下或元素未被禁用时处理样式
    if (
      isDesignMode ||
      (!copyElement.title?.disabled && !copyElement.control?.disabled)
    ) {
      // 获取选区后的下一个元素，用于判断是否需要复制样式
      const nextElement = elementList[endIndex + 1]
      
      // 处理特殊元素类型的样式复制
      // 包括：普通文本、超链接、日期、上下标等
      if (
        !copyElement.type ||
        copyElement.type === TEXT ||
        (copyElement.type === HYPERLINK && nextElement?.type === HYPERLINK) ||
        (copyElement.type === DATE && nextElement?.type === DATE) ||
        (copyElement.type === SUBSCRIPT && nextElement?.type === SUBSCRIPT) ||
        (copyElement.type === SUPERSCRIPT && nextElement?.type === SUPERSCRIPT)
      ) {
        // 复制元素的所有属性
        EDITOR_ELEMENT_COPY_ATTR.forEach(attr => {
          // 特殊处理：在分组外不复制分组信息
          if (attr === 'groupIds' && !nextElement?.groupIds) return
          const value = copyElement[attr] as never
          if (value !== undefined) {
            newElement[attr] = value
          }
        })
      }
      
      // 复制样式属性
      // 1. 有默认样式时使用默认样式
      // 2. 是制表符时使用制表符样式
      if (defaultStyle || copyElement.type === TAB) {
        EDITOR_ELEMENT_STYLE_ATTR.forEach(attr => {
          const value =
            defaultStyle?.[attr as keyof IRangeElementStyle] ||
            copyElement[attr]
          if (value !== undefined) {
            newElement[attr] = value as never
          }
        })
      }
      
      // 如果是组合输入，添加下划线样式
      // 这样可以让用户看到正在输入的内容
      if (isComposing) {
        newElement.underline = true
      }
    }
    return newElement
  })

  // 处理控件输入
  const control = draw.getControl()
  let curIndex: number
  
  // 如果当前在控件内输入（如表格单元格）
  if (control.getActiveControl() && control.getIsRangeWithinControl()) {
    // 设置控件值
    curIndex = control.setValue(inputData)
    // 如果不是组合输入，触发控件内容变化事件
    if (!isComposing) {
      control.emitControlContentChange()
    }
  } else {
    // 普通文本输入处理
    const start = startIndex + 1
    // 如果有选区，先删除选区内容
    if (startIndex !== endIndex) {
      draw.spliceElementList(elementList, start, endIndex - startIndex)
    }
    // 格式化元素上下文，确保元素之间的正确关系
    formatElementContext(elementList, inputData, startIndex, {
      editorOptions: draw.getOptions()
    })
    // 插入新元素
    draw.spliceElementList(elementList, start, 0, inputData)
    // 计算新的光标位置
    curIndex = startIndex + inputData.length
  }

  // 更新选区位置
  if (~curIndex) {
    // 设置新的选区位置
    rangeManager.setRange(curIndex, curIndex)
    // 渲染更新
    // isSubmitHistory: 是否提交到历史记录
    // 组合输入时不提交，等输入完成再提交
    draw.render({
      curIndex,
      isSubmitHistory: !isComposing
    })
  }

  // 如果是组合输入，更新组合输入信息
  if (isComposing) {
    host.compositionInfo = {
      elementList,  // 当前元素列表
      value: text,  // 组合输入的内容
      startIndex: curIndex - inputData.length,  // 组合输入开始位置
      endIndex: curIndex,  // 组合输入结束位置
      defaultStyle  // 默认样式
    }
  }
}

/**
 * 移除组合输入的内容
 * @param host CanvasEvent实例
 */
export function removeComposingInput(host: CanvasEvent) {
  // 如果没有组合输入信息，直接返回
  if (!host.compositionInfo) return
  
  // 获取组合输入的信息
  const { elementList, startIndex, endIndex } = host.compositionInfo
  
  // 删除组合输入的元素
  // 比如：删除"zhong"这些临时字符
  elementList.splice(startIndex + 1, endIndex - startIndex)
  
  // 重置选区位置到组合输入开始的位置
  const rangeManager = host.getDraw().getRange()
  rangeManager.setRange(startIndex, startIndex)
  
  // 清除组合输入信息
  host.compositionInfo = null
}