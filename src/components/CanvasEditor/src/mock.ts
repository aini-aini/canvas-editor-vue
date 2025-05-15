import {
    ControlType,
    ElementType,
    IEditorOption,
    IElement,
    ListType,
    TitleLevel
  } from './editor'
  
  
  const elementList: IElement[] = []
  // 组合纯文本数据
  
  
  export const data: IElement[] = elementList
  
  interface IComment {
    id: string
    content: string
    userName: string
    rangeText: string
    createdDate: string
  }
  export const commentList: IComment[] = [
    {
      id: '1',
      content:
        '红细胞比容（HCT）是指每单位容积中红细胞所占全血容积的比值，用于反映红细胞和血浆的比例。',
      userName: 'Hufe',
      rangeText: '血细胞比容',
      createdDate: '2023-08-20 23:10:55'
    }
  ]
  
  export const options: IEditorOption = {
    margins: [100, 120, 100, 120],
    watermark: {
      data: 'CANVAS-EDITOR',
      size: 120
    },
    pageNumber: {
      format: '第{pageNo}页/共{pageCount}页'
    },
    placeholder: {
      data: '请输入正文'
    },
    zone: {
      tipDisabled: false
    },
    maskMargin: [60, 0, 30, 0] // 菜单栏高度60，底部工具栏30为遮盖层
  }
  