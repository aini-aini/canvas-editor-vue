import type Editor from '../../../editor'
import { ElementType } from '../../../editor/dataset/enum/Element'

export class ImageRenderer {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  /**
   * 插入一张在线图片（下载为base64并获取宽高，完全等价于本地上传逻辑）
   * @param url 图片的在线地址
   */
  public async insertImage(url: string): Promise<void> {
    return new Promise((resolve) => {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(blob)
          fileReader.onload = () => {
            const value = fileReader.result as string
            const image = new window.Image()
            image.src = value
            image.onload = () => {
              setTimeout(() => {
                // 获取当前选区
                const positionList = this.editor.command.executeGetAllElementPositionList()
                const endIndex = positionList.length - 1

                this.editor.command.executeSetRange(endIndex, endIndex)
                this.editor.command.executeImage({
                  value,
                  width: image.width,
                  height: image.height
                })
                resolve()
              }, 50)
            }
          }
        })
    })
  }
}