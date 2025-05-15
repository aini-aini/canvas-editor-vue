// src/plugins/card/drag/index.ts

export function setupSidebarDrag(rightContent: HTMLElement, leftContent: HTMLElement) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
  
    rightContent.addEventListener('mousedown', function(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest('.drag-bar')) return;
  
      isDragging = true;
      const rect = rightContent.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
  
      rightContent.classList.add('floating');
      rightContent.classList.remove('show');
      leftContent.classList.remove('with-sidebar');
      rightContent.style.left = rect.left + 'px';
      rightContent.style.top = rect.top + 'px';
      rightContent.style.height = '70%';
      document.body.style.userSelect = 'none';
    });
  
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;
      rightContent.style.left = newLeft + 'px';
      rightContent.style.top = newTop + 'px';
  
      const windowWidth = window.innerWidth;
      const elementWidth = rightContent.offsetWidth;
      if (windowWidth - (newLeft + elementWidth) <= 10) {
        rightContent.classList.add('will-absorb');
      } else {
        rightContent.classList.remove('will-absorb');
      }
    });
  
    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
        const rect = rightContent.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        if (windowWidth - (rect.left + rect.width) <= 10) {
          rightContent.classList.remove('floating');
          rightContent.classList.add('show');
          leftContent.classList.add('with-sidebar');
          rightContent.classList.remove('will-absorb');
          requestAnimationFrame(() => {
            rightContent.style.left = '';
            rightContent.style.top = '';
            rightContent.style.height = '';
          });
        }
      }
    });
  }