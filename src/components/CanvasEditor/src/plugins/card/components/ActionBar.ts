import { splitText } from '../../../editor/utils/index'
import Editor from '../../../editor'

export function createActionBar(
  editor: Editor,
  contentArea: HTMLElement,
  lastRange: { startIndex: number, endIndex: number } | null
) {
  const actionBar = document.createElement('div')
  actionBar.className = 'right-content-actions'
  actionBar.innerHTML = `
    <button class="right-content-accept" style="display:none;">接受</button>
    <button class="right-content-reject" style="display:none;">不接受</button>
  `

  const acceptBtn = actionBar.querySelector('.right-content-accept') as HTMLElement
  const rejectBtn = actionBar.querySelector('.right-content-reject') as HTMLElement

  acceptBtn?.addEventListener('click', function() {
    const aiResult = contentArea.dataset.aiResult || contentArea.innerText
    // 1. 恢复用户操作前的选区
    if (lastRange && editor.command.executeSetRange) {
      editor.command.executeSetRange(lastRange.startIndex, lastRange.endIndex)
    }
    // 2. 将 AI 返回的字符串拆分为编辑器所需的 IElement[] 结构
    const elementList = splitText(aiResult).map(value => ({ value }))
    // 3. 调用编辑器的插入方法
    editor.command.executeInsertElementList(elementList)
    // 清空
    contentArea.innerHTML = ''
    if (acceptBtn) acceptBtn.style.display = 'none'
    if (rejectBtn) rejectBtn.style.display = 'none'
  })

  rejectBtn?.addEventListener('click', function() {
    contentArea.innerHTML = ''
    if (acceptBtn) acceptBtn.style.display = 'none'
    if (rejectBtn) rejectBtn.style.display = 'none'
  })

  return actionBar
}