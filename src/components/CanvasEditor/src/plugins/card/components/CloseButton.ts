// src/plugins/card/components/CloseButton.ts
export function createCloseButton(rightContent: HTMLElement) {
    const closeBtn = document.createElement('div');
    closeBtn.className = 'right-content-close';
    closeBtn.innerHTML = '&times;';
  
    closeBtn.onclick = function() {
      rightContent.classList.remove('floating');
      rightContent.classList.remove('show');
      rightContent.style.left = '';
      rightContent.style.top = '';
      rightContent.style.height = '';
      const left = document.querySelector('.left-content');
      if (left) left.classList.remove('with-sidebar');
    };
  
    return closeBtn;
  }