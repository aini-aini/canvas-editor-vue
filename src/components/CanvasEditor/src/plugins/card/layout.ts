// src/plugins/card/layout.ts
import './styles/index.css'
import Editor from '../../editor'
import { setupSidebarDrag } from './drag'
import { createInputBar } from './components/InputBar'
import { createActionBar } from './components/ActionBar'
import { createSidebarToggle } from './components/SidebarToggle'
import { createCloseButton } from './components/CloseButton'
import { createDragBar } from './components/DragBar'
import { createLayout } from './components/Layout'
import { createContentArea } from './components/ContentArea'

export function applyLayout(editor: Editor, options?: { apiKey?: string }) {
  const app = document.getElementById('app_canvas_editor');
  if (!app) return;

  // 创建布局
  const { leftContent, rightContent } = createLayout();

  // 创建拖拽条
  const dragBar = createDragBar();
  rightContent.appendChild(dragBar);

  // 创建内容区
  const contentArea = createContentArea();
  rightContent.appendChild(contentArea);

  // 将原有的内容移动到 leftContent
  while (app.firstChild) {
    leftContent.appendChild(app.firstChild);
  }

  // 将 leftContent 和 rightContent 添加到 app
  app.appendChild(leftContent);
  app.appendChild(rightContent);

  // 1. 找到工具栏 .menu
  const menu = app.querySelector('.menu');
  if (menu) {
    // 2. 创建侧边栏按钮
    const sidebarBtn = createSidebarToggle();
    menu.appendChild(sidebarBtn);
  }

  // 6. 添加样式


  setupSidebarDrag(rightContent, leftContent);

  // 创建操作按钮
  const actionBar = createActionBar(editor, contentArea, null);
  rightContent.appendChild(actionBar);

  // 创建输入框
  const inputBar = createInputBar(editor, contentArea, actionBar, null, options);
  rightContent.appendChild(inputBar);

  // 2. 关闭按钮点击逻辑
  const closeBtn = createCloseButton(rightContent);
  rightContent.appendChild(closeBtn);
}

