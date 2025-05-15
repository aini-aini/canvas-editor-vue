import { CommandAdapt } from './CommandAdapt'

// 通过CommandAdapt中转避免直接暴露编辑器上下文
export class Command {
  // 基础编辑命令
  public executeMode: CommandAdapt['mode']                    // 设置编辑器模式
  public executeCut: CommandAdapt['cut']                      // 剪切
  public executeCopy: CommandAdapt['copy']                    // 复制
  public executePaste: CommandAdapt['paste']                  // 粘贴
  public executeSelectAll: CommandAdapt['selectAll']          // 全选
  public executeBackspace: CommandAdapt['backspace']          // 退格删除
  public executeSetRange: CommandAdapt['setRange']            // 设置选区
  public executeReplaceRange: CommandAdapt['replaceRange']    // 替换选区内容
  public executeSetPositionContext: CommandAdapt['setPositionContext']  // 设置位置上下文
  public executeForceUpdate: CommandAdapt['forceUpdate']      // 强制更新
  public executeBlur: CommandAdapt['blur']                    // 失焦

  // 撤销重做相关
  public executeUndo: CommandAdapt['undo']                    // 撤销
  public executeRedo: CommandAdapt['redo']                    // 重做
  public executePainter: CommandAdapt['painter']              // 格式刷
  public executeApplyPainterStyle: CommandAdapt['applyPainterStyle']  // 应用格式刷样式
  public executeFormat: CommandAdapt['format']                // 清除格式

  // 文本样式相关
  public executeFont: CommandAdapt['font']                    // 设置字体
  public executeSize: CommandAdapt['size']                    // 设置字号
  public executeSizeAdd: CommandAdapt['sizeAdd']              // 增大字号
  public executeSizeMinus: CommandAdapt['sizeMinus']          // 减小字号
  public executeBold: CommandAdapt['bold']                    // 加粗
  public executeItalic: CommandAdapt['italic']                // 斜体
  public executeUnderline: CommandAdapt['underline']          // 下划线
  public executeStrikeout: CommandAdapt['strikeout']          // 删除线
  public executeSuperscript: CommandAdapt['superscript']      // 上标
  public executeSubscript: CommandAdapt['subscript']          // 下标
  public executeColor: CommandAdapt['color']                  // 文字颜色
  public executeHighlight: CommandAdapt['highlight']          // 背景高亮

  // 段落格式相关
  public executeTitle: CommandAdapt['title']                  // 设置标题
  public executeList: CommandAdapt['list']                    // 设置列表
  public executeRowFlex: CommandAdapt['rowFlex']              // 设置行对齐方式
  public executeRowMargin: CommandAdapt['rowMargin']          // 设置行边距

  // 表格相关
  public executeInsertTable: CommandAdapt['insertTable']      // 插入表格
  public executeInsertTableTopRow: CommandAdapt['insertTableTopRow']    // 在表格顶部插入行
  public executeInsertTableBottomRow: CommandAdapt['insertTableBottomRow']  // 在表格底部插入行
  public executeInsertTableLeftCol: CommandAdapt['insertTableLeftCol']  // 在表格左侧插入列
  public executeInsertTableRightCol: CommandAdapt['insertTableRightCol']  // 在表格右侧插入列
  public executeDeleteTableRow: CommandAdapt['deleteTableRow']  // 删除表格行
  public executeDeleteTableCol: CommandAdapt['deleteTableCol']  // 删除表格列
  public executeDeleteTable: CommandAdapt['deleteTable']      // 删除表格
  public executeMergeTableCell: CommandAdapt['mergeTableCell']  // 合并单元格
  public executeCancelMergeTableCell: CommandAdapt['cancelMergeTableCell']  // 取消合并单元格
  public executeSplitVerticalTableCell: CommandAdapt['splitVerticalTableCell']  // 垂直拆分单元格
  public executeSplitHorizontalTableCell: CommandAdapt['splitHorizontalTableCell']  // 水平拆分单元格
  public executeTableTdVerticalAlign: CommandAdapt['tableTdVerticalAlign']  // 设置单元格垂直对齐
  public executeTableBorderType: CommandAdapt['tableBorderType']  // 设置表格边框类型
  public executeTableBorderColor: CommandAdapt['tableBorderColor']  // 设置表格边框颜色
  public executeTableTdBorderType: CommandAdapt['tableTdBorderType']  // 设置单元格边框类型
  public executeTableTdSlashType: CommandAdapt['tableTdSlashType']  // 设置单元格斜线类型
  public executeTableTdBackgroundColor: CommandAdapt['tableTdBackgroundColor']  // 设置单元格背景色
  public executeTableSelectAll: CommandAdapt['tableSelectAll']  // 全选表格

  // 图片和超链接相关
  public executeImage: CommandAdapt['image']                  // 插入图片
  public executeHyperlink: CommandAdapt['hyperlink']          // 插入超链接
  public executeDeleteHyperlink: CommandAdapt['deleteHyperlink']  // 删除超链接
  public executeCancelHyperlink: CommandAdapt['cancelHyperlink']  // 取消超链接
  public executeEditHyperlink: CommandAdapt['editHyperlink']  // 编辑超链接

  // 页面元素相关
  public executeSeparator: CommandAdapt['separator']          // 插入分隔线
  public executePageBreak: CommandAdapt['pageBreak']          // 插入分页符
  public executeAddWatermark: CommandAdapt['addWatermark']    // 添加水印
  public executeDeleteWatermark: CommandAdapt['deleteWatermark']  // 删除水印

  // 搜索替换相关
  public executeSearch: CommandAdapt['search']                // 搜索
  public executeSearchNavigatePre: CommandAdapt['searchNavigatePre']  // 搜索上一个
  public executeSearchNavigateNext: CommandAdapt['searchNavigateNext']  // 搜索下一个
  public executeReplace: CommandAdapt['replace']              // 替换

  // 打印相关
  public executePrint: CommandAdapt['print']                  // 打印

  // 图片操作相关
  public executeReplaceImageElement: CommandAdapt['replaceImageElement']  // 替换图片元素
  public executeSaveAsImageElement: CommandAdapt['saveAsImageElement']  // 保存为图片元素
  public executeChangeImageDisplay: CommandAdapt['changeImageDisplay']  // 更改图片显示方式

  // 页面设置相关
  public executePageMode: CommandAdapt['pageMode']            // 设置页面模式
  public executePageScale: CommandAdapt['pageScale']          // 设置页面缩放
  public executePageScaleRecovery: CommandAdapt['pageScaleRecovery']  // 恢复页面缩放
  public executePageScaleMinus: CommandAdapt['pageScaleMinus']  // 减小页面缩放
  public executePageScaleAdd: CommandAdapt['pageScaleAdd']    // 增加页面缩放
  public executePaperSize: CommandAdapt['paperSize']          // 设置纸张大小
  public executePaperDirection: CommandAdapt['paperDirection']  // 设置纸张方向
  public executeSetPaperMargin: CommandAdapt['setPaperMargin']  // 设置页边距

  // 签章相关
  public executeSetMainBadge: CommandAdapt['setMainBadge']    // 设置主签章
  public executeSetAreaBadge: CommandAdapt['setAreaBadge']    // 设置区域签章

  // 区域相关
  public executeInsertArea: CommandAdapt['insertArea']        // 插入区域
  public executeSetAreaProperties: CommandAdapt['setAreaProperties']  // 设置区域属性
  public executeLocationArea: CommandAdapt['locationArea']    // 定位区域

  // 元素操作相关
  public executeInsertElementList: CommandAdapt['insertElementList']  // 插入元素列表
  public executeAppendElementList: CommandAdapt['appendElementList']  // 追加元素列表
  public executeUpdateElementById: CommandAdapt['updateElementById']  // 通过ID更新元素
  public executeDeleteElementById: CommandAdapt['deleteElementById']  // 通过ID删除元素
  public executeSetValue: CommandAdapt['setValue']            // 设置值
  public executeRemoveControl: CommandAdapt['removeControl']  // 移除控件

  // 国际化相关
  public executeSetLocale: CommandAdapt['setLocale']          // 设置语言

  // 目录相关
  public executeLocationCatalog: CommandAdapt['locationCatalog']  // 定位目录

  // 工具相关
  public executeWordTool: CommandAdapt['wordTool']            // Word工具
  public executeSetHTML: CommandAdapt['setHTML']              // 设置HTML
  public executeSetGroup: CommandAdapt['setGroup']            // 设置分组
  public executeDeleteGroup: CommandAdapt['deleteGroup']      // 删除分组
  public executeLocationGroup: CommandAdapt['locationGroup']  // 定位分组
  public executeSetZone: CommandAdapt['setZone']              // 设置区域
  public executeUpdateOptions: CommandAdapt['updateOptions']  // 更新选项
  public executeInsertTitle: CommandAdapt['insertTitle']      // 插入标题
  public executeFocus: CommandAdapt['focus']                  // 聚焦

  // 获取相关方法
  public getCatalog: CommandAdapt['getCatalog']              // 获取目录
  public getImage: CommandAdapt['getImage']                  // 获取图片
  public getOptions: CommandAdapt['getOptions']              // 获取选项
  public getValue: CommandAdapt['getValue']                  // 获取值
  public getValueAsync: CommandAdapt['getValueAsync']        // 异步获取值
  public getAreaValue: CommandAdapt['getAreaValue']          // 获取区域值
  public getHTML: CommandAdapt['getHTML']                    // 获取HTML
  public getText: CommandAdapt['getText']                    // 获取文本
  public getWordCount: CommandAdapt['getWordCount']          // 获取字数
  public getCursorPosition: CommandAdapt['getCursorPosition']  // 获取光标位置
  public getRange: CommandAdapt['getRange']                  // 获取选区
  public getRangeText: CommandAdapt['getRangeText']          // 获取选区文本
  public getRangeContext: CommandAdapt['getRangeContext']    // 获取选区上下文
  public getRangeRow: CommandAdapt['getRangeRow']            // 获取选区行
  public getRangeParagraph: CommandAdapt['getRangeParagraph']  // 获取选区段落
  public getKeywordRangeList: CommandAdapt['getKeywordRangeList']  // 获取关键词范围列表
  public getKeywordContext: CommandAdapt['getKeywordContext']  // 获取关键词上下文
  public getPaperMargin: CommandAdapt['getPaperMargin']      // 获取页边距
  public getSearchNavigateInfo: CommandAdapt['getSearchNavigateInfo']  // 获取搜索导航信息
  public getLocale: CommandAdapt['getLocale']                // 获取语言
  public getGroupIds: CommandAdapt['getGroupIds']            // 获取分组ID
  public getControlValue: CommandAdapt['getControlValue']    // 获取控件值
  public getControlList: CommandAdapt['getControlList']      // 获取控件列表
  public getContainer: CommandAdapt['getContainer']          // 获取容器
  public getTitleValue: CommandAdapt['getTitleValue']        // 获取标题值
  public getPositionContextByEvent: CommandAdapt['getPositionContextByEvent']  // 通过事件获取位置上下文
  public getElementById: CommandAdapt['getElementById']      // 通过ID获取元素

  // 控件相关
  public executeSetControlValue: CommandAdapt['setControlValue']  // 设置控件值
  public executeSetControlValueList: CommandAdapt['setControlValueList']  // 设置控件值列表
  public executeSetControlExtension: CommandAdapt['setControlExtension']  // 设置控件扩展
  public executeSetControlExtensionList: CommandAdapt['setControlExtensionList']  // 设置控件扩展列表
  public executeSetControlProperties: CommandAdapt['setControlProperties']  // 设置控件属性
  public executeSetControlPropertiesList: CommandAdapt['setControlPropertiesList']  // 设置控件属性列表
  public executeSetControlHighlight: CommandAdapt['setControlHighlight']  // 设置控件高亮
  public executeLocationControl: CommandAdapt['locationControl']  // 定位控件
  public executeInsertControl: CommandAdapt['insertControl']  // 插入控件


  // 获取所有元素的位置信息
  public executeGetAllElementPositionList: CommandAdapt['getAllElementPositionList']  // 获取所有元素位置列表

  constructor(adapt: CommandAdapt) {
    // 全局命令
    this.executeMode = adapt.mode.bind(adapt)
    this.executeCut = adapt.cut.bind(adapt)
    this.executeCopy = adapt.copy.bind(adapt)
    this.executePaste = adapt.paste.bind(adapt)
    this.executeSelectAll = adapt.selectAll.bind(adapt)
    this.executeBackspace = adapt.backspace.bind(adapt)
    this.executeSetRange = adapt.setRange.bind(adapt)
    this.executeReplaceRange = adapt.replaceRange.bind(adapt)
    this.executeSetPositionContext = adapt.setPositionContext.bind(adapt)
    this.executeForceUpdate = adapt.forceUpdate.bind(adapt)
    this.executeBlur = adapt.blur.bind(adapt)
    // 撤销、重做、格式刷、清除格式
    this.executeUndo = adapt.undo.bind(adapt)
    this.executeRedo = adapt.redo.bind(adapt)
    this.executePainter = adapt.painter.bind(adapt)
    this.executeApplyPainterStyle = adapt.applyPainterStyle.bind(adapt)
    this.executeFormat = adapt.format.bind(adapt)
    // 字体、字体大小、字体变大、字体变小、加粗、斜体、下划线、删除线、字体颜色、背景色
    this.executeFont = adapt.font.bind(adapt)
    this.executeSize = adapt.size.bind(adapt)
    this.executeSizeAdd = adapt.sizeAdd.bind(adapt)
    this.executeSizeMinus = adapt.sizeMinus.bind(adapt)
    this.executeBold = adapt.bold.bind(adapt)
    this.executeItalic = adapt.italic.bind(adapt)
    this.executeUnderline = adapt.underline.bind(adapt)
    this.executeStrikeout = adapt.strikeout.bind(adapt)
    this.executeSuperscript = adapt.superscript.bind(adapt)
    this.executeSubscript = adapt.subscript.bind(adapt)
    this.executeColor = adapt.color.bind(adapt)
    this.executeHighlight = adapt.highlight.bind(adapt)
    // 标题、对齐方式、列表
    this.executeTitle = adapt.title.bind(adapt)
    this.executeList = adapt.list.bind(adapt)
    this.executeRowFlex = adapt.rowFlex.bind(adapt)
    this.executeRowMargin = adapt.rowMargin.bind(adapt)
    // 表格、图片上传、超链接、搜索、打印、图片操作
    this.executeInsertTable = adapt.insertTable.bind(adapt)
    this.executeInsertTableTopRow = adapt.insertTableTopRow.bind(adapt)
    this.executeInsertTableBottomRow = adapt.insertTableBottomRow.bind(adapt)
    this.executeInsertTableLeftCol = adapt.insertTableLeftCol.bind(adapt)
    this.executeInsertTableRightCol = adapt.insertTableRightCol.bind(adapt)
    this.executeDeleteTableRow = adapt.deleteTableRow.bind(adapt)
    this.executeDeleteTableCol = adapt.deleteTableCol.bind(adapt)
    this.executeDeleteTable = adapt.deleteTable.bind(adapt)
    this.executeMergeTableCell = adapt.mergeTableCell.bind(adapt)
    this.executeCancelMergeTableCell = adapt.cancelMergeTableCell.bind(adapt)
    this.executeSplitVerticalTableCell =
      adapt.splitVerticalTableCell.bind(adapt)
    this.executeSplitHorizontalTableCell =
      adapt.splitHorizontalTableCell.bind(adapt)
    this.executeTableTdVerticalAlign = adapt.tableTdVerticalAlign.bind(adapt)
    this.executeTableBorderType = adapt.tableBorderType.bind(adapt)
    this.executeTableBorderColor = adapt.tableBorderColor.bind(adapt)
    this.executeTableTdBorderType = adapt.tableTdBorderType.bind(adapt)
    this.executeTableTdSlashType = adapt.tableTdSlashType.bind(adapt)
    this.executeTableTdBackgroundColor =
      adapt.tableTdBackgroundColor.bind(adapt)
    this.executeTableSelectAll = adapt.tableSelectAll.bind(adapt)
    this.executeImage = adapt.image.bind(adapt)
    this.executeHyperlink = adapt.hyperlink.bind(adapt)
    this.executeDeleteHyperlink = adapt.deleteHyperlink.bind(adapt)
    this.executeCancelHyperlink = adapt.cancelHyperlink.bind(adapt)
    this.executeEditHyperlink = adapt.editHyperlink.bind(adapt)
    this.executeSeparator = adapt.separator.bind(adapt)
    this.executePageBreak = adapt.pageBreak.bind(adapt)
    this.executeAddWatermark = adapt.addWatermark.bind(adapt)
    this.executeDeleteWatermark = adapt.deleteWatermark.bind(adapt)
    this.executeSearch = adapt.search.bind(adapt)
    this.executeSearchNavigatePre = adapt.searchNavigatePre.bind(adapt)
    this.executeSearchNavigateNext = adapt.searchNavigateNext.bind(adapt)
    this.executeReplace = adapt.replace.bind(adapt)
    this.executePrint = adapt.print.bind(adapt)
    this.executeReplaceImageElement = adapt.replaceImageElement.bind(adapt)
    this.executeSaveAsImageElement = adapt.saveAsImageElement.bind(adapt)
    this.executeChangeImageDisplay = adapt.changeImageDisplay.bind(adapt)
    // 页面模式、页面缩放、纸张大小、纸张方向、页边距
    this.executePageMode = adapt.pageMode.bind(adapt)
    this.executePageScale = adapt.pageScale.bind(adapt)
    this.executePageScaleRecovery = adapt.pageScaleRecovery.bind(adapt)
    this.executePageScaleMinus = adapt.pageScaleMinus.bind(adapt)
    this.executePageScaleAdd = adapt.pageScaleAdd.bind(adapt)
    this.executePaperSize = adapt.paperSize.bind(adapt)
    this.executePaperDirection = adapt.paperDirection.bind(adapt)
    this.executeSetPaperMargin = adapt.setPaperMargin.bind(adapt)
    // 签章
    this.executeSetMainBadge = adapt.setMainBadge.bind(adapt)
    this.executeSetAreaBadge = adapt.setAreaBadge.bind(adapt)
    // 区域
    this.getAreaValue = adapt.getAreaValue.bind(adapt)
    this.executeInsertArea = adapt.insertArea.bind(adapt)
    this.executeSetAreaProperties = adapt.setAreaProperties.bind(adapt)
    this.executeLocationArea = adapt.locationArea.bind(adapt)
    // 通用
    this.executeInsertElementList = adapt.insertElementList.bind(adapt)
    this.executeAppendElementList = adapt.appendElementList.bind(adapt)
    this.executeUpdateElementById = adapt.updateElementById.bind(adapt)
    this.executeDeleteElementById = adapt.deleteElementById.bind(adapt)
    this.executeSetValue = adapt.setValue.bind(adapt)
    this.executeRemoveControl = adapt.removeControl.bind(adapt)
    this.executeSetLocale = adapt.setLocale.bind(adapt)
    this.executeLocationCatalog = adapt.locationCatalog.bind(adapt)
    this.executeWordTool = adapt.wordTool.bind(adapt)
    this.executeSetHTML = adapt.setHTML.bind(adapt)
    this.executeSetGroup = adapt.setGroup.bind(adapt)
    this.executeDeleteGroup = adapt.deleteGroup.bind(adapt)
    this.executeLocationGroup = adapt.locationGroup.bind(adapt)
    this.executeSetZone = adapt.setZone.bind(adapt)
    this.executeUpdateOptions = adapt.updateOptions.bind(adapt)
    this.executeInsertTitle = adapt.insertTitle.bind(adapt)
    this.executeFocus = adapt.focus.bind(adapt)
    // 获取
    this.getImage = adapt.getImage.bind(adapt)
    this.getOptions = adapt.getOptions.bind(adapt)
    this.getValue = adapt.getValue.bind(adapt)
    this.getValueAsync = adapt.getValueAsync.bind(adapt)
    this.getHTML = adapt.getHTML.bind(adapt)
    this.getText = adapt.getText.bind(adapt)
    this.getWordCount = adapt.getWordCount.bind(adapt)
    this.getCursorPosition = adapt.getCursorPosition.bind(adapt)
    this.getRange = adapt.getRange.bind(adapt)
    this.getRangeText = adapt.getRangeText.bind(adapt)
    this.getRangeContext = adapt.getRangeContext.bind(adapt)
    this.getRangeRow = adapt.getRangeRow.bind(adapt)
    this.getRangeParagraph = adapt.getRangeParagraph.bind(adapt)
    this.getKeywordRangeList = adapt.getKeywordRangeList.bind(adapt)
    this.getKeywordContext = adapt.getKeywordContext.bind(adapt)
    this.getCatalog = adapt.getCatalog.bind(adapt)
    this.getPaperMargin = adapt.getPaperMargin.bind(adapt)
    this.getSearchNavigateInfo = adapt.getSearchNavigateInfo.bind(adapt)
    this.getLocale = adapt.getLocale.bind(adapt)
    this.getGroupIds = adapt.getGroupIds.bind(adapt)
    this.getContainer = adapt.getContainer.bind(adapt)
    this.getTitleValue = adapt.getTitleValue.bind(adapt)
    this.getPositionContextByEvent = adapt.getPositionContextByEvent.bind(adapt)
    this.getElementById = adapt.getElementById.bind(adapt)
    // 控件
    this.executeSetControlValue = adapt.setControlValue.bind(adapt)
    this.executeSetControlValueList = adapt.setControlValueList.bind(adapt)
    this.executeSetControlExtension = adapt.setControlExtension.bind(adapt)
    this.executeSetControlExtensionList =
      adapt.setControlExtensionList.bind(adapt)
    this.executeSetControlProperties = adapt.setControlProperties.bind(adapt)
    this.executeSetControlPropertiesList =
      adapt.setControlPropertiesList.bind(adapt)
    this.executeSetControlHighlight = adapt.setControlHighlight.bind(adapt)
    this.getControlValue = adapt.getControlValue.bind(adapt)
    this.getControlList = adapt.getControlList.bind(adapt)
    this.executeLocationControl = adapt.locationControl.bind(adapt)
    this.executeInsertControl = adapt.insertControl.bind(adapt)
    this.executeGetAllElementPositionList = adapt.getAllElementPositionList.bind(adapt)
  }
}
