// src/plugins/card/components/DragBar.ts
export function createDragBar() {
    const dragBar = document.createElement('div');
    dragBar.className = 'drag-bar';
    dragBar.style.height = '30px';
    dragBar.style.background = '#f0f0f0';
    dragBar.style.cursor = 'move';
    dragBar.style.borderBottom = '1px solid #e2e6ed';
    return dragBar;
  }