import { requestAI } from '../services/ai'
import Editor from '../../../editor'

export function createInputBar(
  editor: Editor,
  contentArea: HTMLElement,
  actionBar: HTMLElement,
  lastRange: { startIndex: number, endIndex: number } | null,
  options?: { apiKey?: string }
) {
  const inputBar = document.createElement('div')
  inputBar.className = 'right-content-input-bar'
  inputBar.innerHTML = `
    <input class="right-content-input" type="text" placeholder="请输入..." />
    <button class="right-content-send">发送</button>
  `
  
  const sendBtn = inputBar.querySelector('.right-content-send') as HTMLButtonElement
  const input = inputBar.querySelector('.right-content-input') as HTMLInputElement
  
  sendBtn?.addEventListener('click', async function() {
    const question = input.value.trim()
    if (!question) return
    contentArea.innerHTML = '正在思考中...'
    input.value = ''

    const selectedText = editor.command.getRangeText() || ''
    let prompt = ''
    if (selectedText) {
      prompt = `请根据我的要求修改下面的内容，并以如下 JSON 格式返回：{"result": "你的修改结果"}。\n原文：${selectedText}\n要求：${question}`
    } else {
      prompt = `请以如下 JSON 格式返回：{"result": "你的修改结果"}。\n要求：${question}`
    }

    try {
      const result = await requestAI(prompt,options?.apiKey)
      if (result) {
        contentArea.innerHTML = result
        contentArea.dataset.aiResult = result
        const acceptBtn = actionBar.querySelector('.right-content-accept') as HTMLElement
        const rejectBtn = actionBar.querySelector('.right-content-reject') as HTMLElement
        if (acceptBtn) acceptBtn.style.display = ''
        if (rejectBtn) rejectBtn.style.display = ''
      } else {
        contentArea.innerHTML = '无回答'
      }
    } catch (err) {
      console.error(err)
      contentArea.innerHTML = '请求失败，请重试'
    }
  })

  return inputBar
}