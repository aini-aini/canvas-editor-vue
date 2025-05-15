// src/plugins/card/components/Layout.ts
export function createLayout() {
    const leftContent = document.createElement('div');
    leftContent.className = 'left-content';
  
    const rightContent = document.createElement('div');
    rightContent.className = 'right-content';
  
    return { leftContent, rightContent };
  }