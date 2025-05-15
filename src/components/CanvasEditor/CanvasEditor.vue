<script setup lang="ts">
import { onMounted, ref } from "vue";
import initEditor from "./index";

const editor = ref();

onMounted(() => {
  editor.value = initEditor();
});

defineExpose({
  editor,
});
</script>

<template>
  <div id="app_canvas_editor">
    <div class="top_menu_bar">
      <div class="top_menu">
        <div class="doc_setting">
          <div class="three_line"></div>
          <span class="doc_setting_title">文件</span>
          <div class="arrow_down"></div>
        </div>
        <div class="top_menu-divider"></div>
        <div class="prin_save">
          <div class="print_"></div>
          <div class="save_"></div>
        </div>
        <div class="top_menu-divider"></div>
        <div class="menu_bar_item">
          <div class="menu_bar_item_title">开始</div>
          <div class="menu_bar_item_title">插入</div>
          <div class="menu_bar_item_title">页面</div>
          <div class="menu_bar_item_title">引用</div>
          <div class="menu_bar_item_title">表格</div>
          <div class="menu_bar_item_title">图片</div>
          <div class="menu_bar_item_title">视图</div>
          <div class="menu_bar_item_title">工具</div>
        </div>
        <div class="top_menu-divider"></div>
        <div class="aiwen_ai">
          <div class="aiwen_ai_icon"></div>
          <span class="aiwen_ai_title">AIWEN AI</span>
        </div>
      </div>
      <div class="menu" editor-component="menu">
        <div class="menu-item">
          <div class="menu-item__undo">
            <i></i>
          </div>
          <div class="menu-item__redo">
            <i></i>
          </div>
          <div class="menu-item__painter" title="格式刷(双击可连续使用)">
            <i></i>
          </div>
          <div class="menu-item__format" title="清除格式">
            <i></i>
          </div>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item">
          <div class="menu-item__font">
            <span class="select" title="字体">微软雅黑</span>
            <div class="options">
              <ul>
                <li data-family="Microsoft YaHei" style="font-family: 'Microsoft YaHei'">
                  微软雅黑
                </li>
                <li data-family="华文宋体" style="font-family: '华文宋体'">华文宋体</li>
                <li data-family="华文黑体" style="font-family: '华文黑体'">华文黑体</li>
                <li data-family="华文仿宋" style="font-family: '华文仿宋'">华文仿宋</li>
                <li data-family="华文楷体" style="font-family: '华文楷体'">华文楷体</li>
                <li data-family="华文琥珀" style="font-family: '华文琥珀'">华文琥珀</li>
                <li data-family="华文楷体" style="font-family: '华文楷体'">华文楷体</li>
                <li data-family="华文隶书" style="font-family: '华文隶书'">华文隶书</li>
                <li data-family="华文新魏" style="font-family: '华文新魏'">华文新魏</li>
                <li data-family="华文行楷" style="font-family: '华文行楷'">华文行楷</li>
                <li data-family="华文中宋" style="font-family: '华文中宋'">华文中宋</li>
                <li data-family="华文彩云" style="font-family: '华文彩云'">华文彩云</li>
                <li data-family="Arial" style="font-family: 'Arial'">Arial</li>
                <li data-family="Segoe UI" style="font-family: 'Segoe UI'">Segoe UI</li>
                <li data-family="Ink Free" style="font-family: 'Ink Free'">Ink Free</li>
                <li data-family="Fantasy" style="font-family: 'Fantasy'">Fantasy</li>
              </ul>
            </div>
          </div>
          <div class="menu-item__size">
            <span class="select" title="字体">小四</span>
            <div class="options">
              <ul>
                <li data-size="56">初号</li>
                <li data-size="48">小初</li>
                <li data-size="34">一号</li>
                <li data-size="32">小一</li>
                <li data-size="29">二号</li>
                <li data-size="24">小二</li>
                <li data-size="21">三号</li>
                <li data-size="20">小三</li>
                <li data-size="18">四号</li>
                <li data-size="16">小四</li>
                <li data-size="14">五号</li>
                <li data-size="12">小五</li>
                <li data-size="10">六号</li>
                <li data-size="8">小六</li>
                <li data-size="7">七号</li>
                <li data-size="6">八号</li>
              </ul>
            </div>
          </div>
          <div class="menu-item__size-add">
            <i></i>
          </div>
          <div class="menu-item__size-minus">
            <i></i>
          </div>
          <div class="menu-item__bold">
            <i></i>
          </div>
          <div class="menu-item__italic">
            <i></i>
          </div>
          <div class="menu-item__underline">
            <i></i>
            <span class="select"></span>
            <div class="options">
              <ul>
                <li data-decoration-style="solid">
                  <i></i>
                </li>
                <li data-decoration-style="double">
                  <i></i>
                </li>
                <li data-decoration-style="dashed">
                  <i></i>
                </li>
                <li data-decoration-style="dotted">
                  <i></i>
                </li>
                <li data-decoration-style="wavy">
                  <i></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="menu-item__strikeout" title="删除线(Ctrl+Shift+X)">
            <i></i>
          </div>
          <div class="menu-item__superscript">
            <i></i>
          </div>
          <div class="menu-item__subscript">
            <i></i>
          </div>
          <div class="menu-item__color" title="字体颜色">
            <i></i>
            <span></span>
            <input type="color" id="color" />
          </div>
          <div class="menu-item__highlight" title="高亮">
            <i></i>
            <span></span>
            <input type="color" id="highlight" />
          </div>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item">
          <div class="menu-item__title">
            <i></i>
            <span class="select" title="切换标题">正文</span>
            <div class="options">
              <ul>
                <li style="font-size: 16px">正文</li>
                <li data-level="first" style="font-size: 26px">标题1</li>
                <li data-level="second" style="font-size: 24px">标题2</li>
                <li data-level="third" style="font-size: 22px">标题3</li>
                <li data-level="fourth" style="font-size: 20px">标题4</li>
                <li data-level="fifth" style="font-size: 18px">标题5</li>
                <li data-level="sixth" style="font-size: 16px">标题6</li>
              </ul>
            </div>
          </div>
          <div class="menu-item__left">
            <i></i>
          </div>
          <div class="menu-item__center">
            <i></i>
          </div>
          <div class="menu-item__right">
            <i></i>
          </div>
          <div class="menu-item__alignment">
            <i></i>
          </div>
          <div class="menu-item__justify">
            <i></i>
          </div>
          <div class="menu-item__row-margin">
            <i title="行间距"></i>
            <div class="options">
              <ul>
                <li data-rowmargin="1">1</li>
                <li data-rowmargin="1.25">1.25</li>
                <li data-rowmargin="1.5">1.5</li>
                <li data-rowmargin="1.75">1.75</li>
                <li data-rowmargin="2">2</li>
                <li data-rowmargin="2.5">2.5</li>
                <li data-rowmargin="3">3</li>
              </ul>
            </div>
          </div>
          <div class="menu-item__list">
            <i></i>
            <div class="options">
              <ul>
                <li>
                  <label>取消列表</label>
                </li>
                <li data-list-type="ol" data-list-style="decimal">
                  <label>有序列表：</label>
                  <ol>
                    <li>________</li>
                  </ol>
                </li>
                <li data-list-type="ul" data-list-style="checkbox">
                  <label>复选框列表：</label>
                  <ul style="list-style-type: '☑️ '">
                    <li>________</li>
                  </ul>
                </li>
                <li data-list-type="ul" data-list-style="disc">
                  <label>实心圆点列表：</label>
                  <ul style="list-style-type: disc">
                    <li>________</li>
                  </ul>
                </li>
                <li data-list-type="ul" data-list-style="circle">
                  <label>空心圆点列表：</label>
                  <ul style="list-style-type: circle">
                    <li>________</li>
                  </ul>
                </li>
                <li data-list-type="ul" data-list-style="square">
                  <label>空心方块列表：</label>
                  <ul style="list-style-type: '☐ '">
                    <li>________</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item">
          <div class="menu-item__table">
            <i title="表格"></i>
          </div>
          <div class="menu-item__table__collapse">
            <div class="table-close">×</div>
            <div class="table-title">
              <span class="table-select">插入</span>
              <span>表格</span>
            </div>
            <div class="table-panel"></div>
          </div>
          <div class="menu-item__image">
            <i title="图片"></i>
            <input type="file" id="image" accept=".png, .jpg, .jpeg, .svg, .gif" />
          </div>
          <div class="menu-item__hyperlink">
            <i title="超链接"></i>
          </div>
          <div class="menu-item__separator">
            <i title="分割线"></i>
            <div class="options">
              <ul>
                <li data-separator="0,0">
                  <i></i>
                </li>
                <li data-separator="1,1">
                  <i></i>
                </li>
                <li data-separator="3,1">
                  <i></i>
                </li>
                <li data-separator="4,4">
                  <i></i>
                </li>
                <li data-separator="7,3,3,3">
                  <i></i>
                </li>
                <li data-separator="6,2,2,2,2,2">
                  <i></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="menu-item__watermark">
            <i title="水印(添加、删除)"></i>
            <div class="options">
              <ul>
                <li data-menu="add">添加水印</li>
                <li data-menu="delete">删除水印</li>
              </ul>
            </div>
          </div>
          <div class="menu-item__codeblock" title="代码块">
            <i></i>
          </div>
          <div class="menu-item__page-break" title="分页符">
            <i></i>
          </div>
          <div class="menu-item__control">
            <i title="控件"></i>
            <div class="options">
              <ul>
                <li data-control="text">文本</li>
                <li data-control="number">数值</li>
                <li data-control="select">列举</li>
                <li data-control="date">日期</li>
                <li data-control="checkbox">复选框</li>
                <li data-control="radio">单选框</li>
              </ul>
            </div>
          </div>
          <div class="menu-item__checkbox" title="复选框">
            <i></i>
          </div>
          <div class="menu-item__radio" title="单选框">
            <i></i>
          </div>
          <div class="menu-item__latex" title="LateX">
            <i></i>
          </div>
          <div class="menu-item__date">
            <i title="日期"></i>
            <div class="options">
              <ul>
                <li data-format="yyyy-MM-dd"></li>
                <li data-format="yyyy-MM-dd hh:mm:ss"></li>
              </ul>
            </div>
          </div>
          <div class="menu-item__block" title="内容块">
            <i></i>
          </div>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item">
          <div class="menu-item__search" data-menu="search">
            <i></i>
          </div>
          <div class="menu-item__search__collapse" data-menu="search">
            <div class="menu-item__search__collapse__search">
              <input type="text" />
              <label class="search-result"></label>
              <div class="arrow-left">
                <i></i>
              </div>
              <div class="arrow-right">
                <i></i>
              </div>
              <span>×</span>
            </div>
            <div class="menu-item__search__collapse__replace">
              <input type="text" />
              <button>替换</button>
            </div>
          </div>
          <div class="menu-item__print" data-menu="print">
            <i></i>
          </div>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="catalog" editor-component="catalog">
        <div class="catalog__header">
          <span>目录</span>
          <div class="catalog__header__close">
            <i></i>
          </div>
        </div>
        <div class="catalog__main">
          <div class="catalog-item">
            <div class="catalog-item__content">
              <span>目录项 1</span>
            </div>
          </div>
          <div class="catalog-item">
            <div class="catalog-item__content">
              <span>目录项 2</span>
            </div>
          </div>
        </div>
      </div>
      <div class="editor"></div>
    </div>
    <div class="comment" editor-component="comment"></div>
    <div class="footer" editor-component="footer">
      <div>
        <div class="catalog-mode" title="目录">
          <i></i>
        </div>
        <div class="page-mode">
          <i title="页面模式(分页、连页)"></i>
          <div class="options">
            <ul>
              <li data-page-mode="paging" class="active">分页</li>
              <li data-page-mode="continuity">连页</li>
            </ul>
          </div>
        </div>
        <span>可见页码：<span class="page-no-list">1</span></span>
        <span>页面：<span class="page-no">1</span>/<span class="page-size">1</span></span>
        <span>字数：<span class="word-count">0</span></span>
      </div>
      <div class="editor-mode" title="编辑模式(编辑、清洁、只读、表单、设计)">
        编辑模式
      </div>
      <div>
        <div class="page-scale-minus" title="缩小(Ctrl+-)">
          <i></i>
        </div>
        <span class="page-scale-percentage" title="显示比例(点击可复原Ctrl+0)">100%</span>
        <div class="page-scale-add" title="放大(Ctrl+=)">
          <i></i>
        </div>
        <div class="paper-size">
          <i title="纸张类型"></i>
          <div class="options">
            <ul>
              <li data-paper-size="794*1123" class="active">A4</li>
              <li data-paper-size="1593*2251">A2</li>
              <li data-paper-size="1125*1593">A3</li>
              <li data-paper-size="565*796">A5</li>
              <li data-paper-size="412*488">5号信封</li>
              <li data-paper-size="450*866">6号信封</li>
              <li data-paper-size="609*862">7号信封</li>
              <li data-paper-size="862*1221">9号信封</li>
              <li data-paper-size="813*1266">法律用纸</li>
              <li data-paper-size="813*1054">信纸</li>
            </ul>
          </div>
        </div>
        <div class="paper-direction">
          <i title="纸张方向"></i>
          <div class="options">
            <ul>
              <li data-paper-direction="vertical" class="active">纵向</li>
              <li data-paper-direction="horizontal">横向</li>
            </ul>
          </div>
        </div>
        <div class="paper-margin" title="页边距">
          <i></i>
        </div>
        <div class="fullscreen" title="全屏显示">
          <i></i>
        </div>
        <div class="editor-option" title="编辑器设置">
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
::-webkit-scrollbar {
  height: 16px;
  width: 16px;
  overflow: visible;
}

::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}

/* 隐藏所有元素的纵向滚动条（Chrome/Safari/Edge） */
*::-webkit-scrollbar {
  display: none;
}

/* 隐藏所有元素的纵向滚动条（Firefox） */
* {
  scrollbar-width: none;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #ddd;
  background-clip: padding-box;
  border: 4px solid #f2f4f7;
  border-radius: 8px;
  min-height: 24px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #c9c9c9;
}

::-webkit-scrollbar-track {
  background: #f2f4f7;
  background-clip: padding-box;
}

* {
  margin: 0;
  padding: 0;
}

#app_canvas_editor {
  background-color: #f2f4f7;
}

ul {
  list-style: none;
}

.top_menu_bar {
  width: 100%;
  height: 100px;
  background-color: #e1e5e9;
  position: fixed;
  top: 0;
  z-index: 9;
  border-bottom: 2px solid #e2e6ed;
}

.top_menu {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0 110px;
}

.doc_setting {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  margin: 0 10px;
  gap: 6px;
}

.three_line {
  width: 16px;
  height: 16px;
  background-image: url("./src/assets/icons/three-line.png");
  background-size: 100% 100%;
}

.arrow_down {
  width: 16px;
  height: 16px;
  background-image: url("./src/assets/icons/arrow-down.png");
  background-size: 100% 100%;
}

.top_menu-divider {
  width: 1px;
  height: 12px;
  background-color: #aaa;
  margin: 0 10px;
}

.prin_save {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 5px;
  gap: 5px;
}

.print_ {
  width: 16px;
  height: 16px;
  background-image: url("./src/assets/icons/print.png");
  background-size: 100% 100%;
}

.save_ {
  width: 16px;
  height: 16px;
  background-image: url("./src/assets/icons/save.png");
  background-size: 100% 100%;
}

.menu_bar_item {
  margin: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
}

.menu_bar_item_title {
  font-size: 12px;
  color: #3d4757;
  font-weight: 600;
  cursor: pointer;
}

.aiwen_ai {
  margin: 0 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.aiwen_ai_icon {
  width: 16px;
  height: 16px;
  background-image: url("./src/assets/icons/aiwen.png");
  background-size: 100% 100%;
}

.aiwen_ai_title {
  font-size: 12px;
  color: #3d4757;
  font-weight: 600;
}

.menu {
  width: 100%;
  height: 60px;
  /* top: 0; */
  /* z-index: 9; */
  /* position: fixed; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #F2F4F7; */
  background-color: #fff;
  box-shadow: 0 2px 4px 0 transparent;
}

.menu-divider {
  width: 1px;
  height: 16px;
  margin: 0 8px;
  display: inline-block;
  background-color: #cfd2d8;
}

.menu-item {
  height: 24px;
  display: flex;
  align-items: center;
  position: relative;
}

.menu-item > div {
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
}

.menu-item > div:hover {
  background: rgba(25, 55, 88, 0.04);
}

.menu-item > div.active {
  background: rgba(25, 55, 88, 0.08);
}

.menu-item i {
  width: 16px;
  height: 16px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.menu-item > div > span {
  width: 16px;
  height: 3px;
  display: inline-block;
  border: 1px solid #e2e6ed;
}

.menu-item .select {
  border: none;
  font-size: 12px;
  line-height: 24px;
  user-select: none;
}

.menu-item .select::after {
  position: absolute;
  content: "";
  top: 11px;
  width: 0;
  height: 0;
  right: 2px;
  border-color: #767c85 transparent transparent;
  border-style: solid solid none;
  border-width: 3px 3px 0;
}

.menu-item .options {
  width: 70px;
  position: absolute;
  left: 0;
  top: 25px;
  padding: 10px;
  background: #fff;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgb(56 56 56 / 20%);
  border: 1px solid #e2e6ed;
  border-radius: 2px;
  display: none;
}

.menu-item .options.visible {
  display: block;
}

.menu-item .options li {
  padding: 5px;
  margin: 5px 0;
  user-select: none;
  transition: all 0.3s;
}

.menu-item .options li:hover {
  background-color: #ebecef;
}

.menu-item .options li.active {
  background-color: #e2e6ed;
}

.menu-item .menu-item__font {
  width: 65px;
  position: relative;
}

.menu-item .menu-item__size {
  width: 50px;
  text-align: center;
  position: relative;
}

.menu-item__font .select,
.menu-item__size .select {
  width: 100%;
  height: 100%;
}

.menu-item__undo.no-allow,
.menu-item__redo.no-allow,
.menu-item > div.disable {
  color: #c0c4cc;
  cursor: not-allowed;
  opacity: 0.4;
  pointer-events: none;
}

.menu-item__undo i {
  background-image: url("./src/assets/images/undo.svg");
}

.menu-item__redo i {
  background-image: url("./src/assets/images/redo.svg");
}

.menu-item__painter i {
  background-image: url("./src/assets/images/painter.svg");
}

.menu-item__format i {
  background-image: url("./src/assets/images/format.svg");
}

.menu-item__size-add i {
  background-image: url("./src/assets/images/size-add.svg");
}

.menu-item__size-minus i {
  background-image: url("./src/assets/images/size-minus.svg");
}

.menu-item__bold i {
  background-image: url("./src/assets/images/bold.svg");
}

.menu-item__italic i {
  background-image: url("./src/assets/images/italic.svg");
}

.menu-item .menu-item__underline {
  width: 30px;
  position: relative;
}

.menu-item__underline > i {
  flex-shrink: 0;
  background-image: url("./src/assets/images/underline.svg");
}

.menu-item__underline .select {
  width: 100%;
  height: 100%;
}

.menu-item .menu-item__underline .options {
  width: 128px;
}

.menu-item .menu-item__underline li {
  padding: 1px 5px;
}

.menu-item__underline li i {
  pointer-events: none;
}

.menu-item__underline li[data-decoration-style="solid"] {
  background-image: url("./src/assets/images/line-single.svg");
}

.menu-item__underline li[data-decoration-style="double"] {
  background-image: url("./src/assets/images/line-double.svg");
}

.menu-item__underline li[data-decoration-style="dashed"] {
  background-image: url("./src/assets/images/line-dash-small-gap.svg");
}

.menu-item__underline li[data-decoration-style="dotted"] {
  background-image: url("./src/assets/images/line-dot.svg");
}

.menu-item__underline li[data-decoration-style="wavy"] {
  background-image: url("./src/assets/images/line-wavy.svg");
}

.menu-item__strikeout i {
  background-image: url("./src/assets/images/strikeout.svg");
}

.menu-item__superscript i {
  background-image: url("./src/assets/images/superscript.svg");
}

.menu-item__subscript i {
  background-image: url("./src/assets/images/subscript.svg");
}

.menu-item__color,
.menu-item__highlight {
  display: flex;
  flex-direction: column;
}

.menu-item__color #color,
.menu-item__highlight #highlight {
  width: 1px;
  height: 1px;
  visibility: hidden;
  outline: none;
  appearance: none;
}

.menu-item__color i {
  background-image: url("./src/assets/images/color.svg");
}

.menu-item__color span {
  background-color: #000000;
}

.menu-item__highlight i {
  background-image: url("./src/assets/images/highlight.svg");
}

.menu-item__highlight span {
  background-color: #ffff00;
}

.menu-item .menu-item__title {
  width: 60px;
  position: relative;
}

.menu-item__title .select {
  width: calc(100% - 20px);
  height: 100%;
}

.menu-item__title i {
  transform: translateX(-5px);
  background-image: url("./src/assets/images/title.svg");
}

.menu-item__title .options {
  width: 80px;
}

.menu-item__left i {
  background-image: url("./src/assets/images/left.svg");
}

.menu-item__center i {
  background-image: url("./src/assets/images/center.svg");
}

.menu-item__right i {
  background-image: url("./src/assets/images/right.svg");
}

.menu-item__alignment i {
  background-image: url("./src/assets/images/alignment.svg");
}

.menu-item__justify i {
  background-image: url("./src/assets/images/justify.svg");
}

.menu-item__row-margin {
  position: relative;
}

.menu-item__row-margin i {
  background-image: url("./src/assets/images/row-margin.svg");
}

.menu-item__list {
  position: relative;
}

.menu-item__list i {
  background-image: url("./src/assets/images/list.svg");
}

.menu-item__list .options {
  width: 110px;
}

.menu-item__list .options > ul > li * {
  pointer-events: none;
}

.menu-item__list .options > ul > li li {
  margin-left: 18px;
}

.menu-item__list .options > ul > li[data-list-style="checkbox"] li::marker {
  font-size: 11px;
}

.menu-item__image i {
  background-image: url("./src/assets/images/image.svg");
}

.menu-item__image input {
  display: none;
}

.menu-item__table {
  position: relative;
}

.menu-item__table i {
  background-image: url("./src/assets/images/table.svg");
}

.menu-item .menu-item__table__collapse {
  width: 270px;
  height: 310px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgb(56 56 56 / 20%);
  border: 1px solid #e2e6ed;
  box-sizing: border-box;
  border-radius: 2px;
  position: absolute;
  display: none;
  z-index: 99;
  top: 25px;
  left: 0;
  padding: 14px 27px;
  cursor: auto;
}

.menu-item .menu-item__table__collapse .table-close {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}

.menu-item .menu-item__table__collapse .table-close:hover {
  color: #7d7e80;
}

.menu-item .menu-item__table__collapse:hover {
  background: #fff;
}

.menu-item .menu-item__table__collapse .table-title {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 5px;
  border-bottom: 1px solid #e2e6ed;
}

.table-title span {
  font-size: 12px;
  color: #3d4757;
  display: inline;
  margin: 0;
}

.table-panel {
  cursor: pointer;
}

.table-panel .table-row {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 10px;
  pointer-events: none;
}

.table-panel .table-cel {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border: 1px solid #e2e6ed;
  background: #fff;
  position: relative;
  margin-right: 6px;
  pointer-events: none;
}

.table-panel .table-cel.active {
  border: 1px solid rgba(73, 145, 242, 0.2);
  background: rgba(73, 145, 242, 0.15);
}

.table-panel .table-row .table-cel:last-child {
  margin-right: 0;
}

.menu-item__hyperlink i {
  background-image: url("./src/assets/images/hyperlink.svg");
}

.menu-item__separator {
  position: relative;
}

.menu-item__separator > i {
  background-image: url("./src/assets/images/separator.svg");
}

.menu-item .menu-item__separator .options {
  width: 128px;
}

.menu-item .menu-item__separator li {
  padding: 1px 5px;
}

.menu-item__separator li i {
  pointer-events: none;
}

.menu-item__separator li[data-separator="0,0"] {
  background-image: url("./src/assets/images/line-single.svg");
}

.menu-item__separator li[data-separator="1,1"] {
  background-image: url("./src/assets/images/line-dot.svg");
}

.menu-item__separator li[data-separator="3,1"] {
  background-image: url("./src/assets/images/line-dash-small-gap.svg");
}

.menu-item__separator li[data-separator="4,4"] {
  background-image: url("./src/assets/images/line-dash-large-gap.svg");
}

.menu-item__separator li[data-separator="7,3,3,3"] {
  background-image: url("./src/assets/images/line-dash-dot.svg");
}

.menu-item__separator li[data-separator="6,2,2,2,2,2"] {
  background-image: url("./src/assets/images/line-dash-dot-dot.svg");
}

.menu-item__watermark > i {
  background-image: url("./src/assets/images/watermark.svg");
}

.menu-item__watermark {
  position: relative;
}

.menu-item__codeblock i {
  background-image: url("./src/assets/images/codeblock.svg");
}

.menu-item__page-break i {
  background-image: url("./src/assets/images/page-break.svg");
}

.menu-item__control {
  position: relative;
}

.menu-item__control i {
  background-image: url("./src/assets/images/control.svg");
}

.menu-item__checkbox i {
  background-image: url("./src/assets/images/checkbox.svg");
}

.menu-item__radio i {
  background-image: url("./src/assets/images/radio.svg");
}

.menu-item__latex i {
  background-image: url("./src/assets/images/latex.svg");
}

.menu-item__date {
  position: relative;
}

.menu-item__date i {
  background-image: url("./src/assets/images/date.svg");
}

.menu-item__date .options {
  width: 160px;
}

.menu-item__block i {
  background-image: url("./src/assets/images/block.svg");
}

.menu-item .menu-item__control .options {
  width: 55px;
}

.menu-item__search {
  position: relative;
}

.menu-item__search i {
  background-image: url("./src/assets/images/search.svg");
}

.menu-item .menu-item__search__collapse {
  width: 260px;
  height: 72px;
  box-sizing: border-box;
  position: absolute;
  display: none;
  z-index: 99;
  top: 25px;
  left: 0;
  background: #ffffff;
  box-shadow: 0px 5px 5px #e3dfdf;
}

.menu-item .menu-item__search__collapse:hover {
  background: #ffffff;
}

.menu-item .menu-item__search__collapse > div {
  width: 250px;
  height: 36px;
  padding: 0 5px;
  line-height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
}

.menu-item .menu-item__search__collapse > div input {
  width: 205px;
  height: 27px;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  line-height: 27px;
  outline: none;
  padding: 0 5px;
}

.menu-item .menu-item__search__collapse > div span {
  height: 100%;
  color: #dcdfe6;
  font-size: 25px;
  display: inline-block;
  border: 0;
  padding: 0 10px;
}

.menu-item .menu-item__search__collapse__replace button {
  display: inline-block;
  border: 1px solid #e2e6ed;
  border-radius: 2px;
  background: #fff;
  line-height: 22px;
  padding: 0 6px;
  white-space: nowrap;
  margin-left: 4px;
  cursor: pointer;
  font-size: 12px;
}

.menu-item .menu-item__search__collapse__replace button:hover {
  background: rgba(25, 55, 88, 0.04);
}

.menu-item .menu-item__search__collapse__search {
  position: relative;
}

.menu-item .menu-item__search__collapse__search label {
  right: 110px;
  font-size: 12px;
  color: #3d4757;
  position: absolute;
}

.menu-item .menu-item__search__collapse__search > input {
  padding: 5px 90px 5px 5px !important;
}

.menu-item .menu-item__search__collapse__search > div {
  width: 28px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-left: 1px solid #e2e6ed;
  transition: all 0.5s;
}

.menu-item .menu-item__search__collapse__search > div:hover {
  background-color: rgba(25, 55, 88, 0.04);
}

.menu-item .menu-item__search__collapse__search i {
  width: 6px;
  height: 8px;
  transform: translateY(1px);
}

.menu-item .menu-item__search__collapse__search .arrow-left {
  right: 76px;
}

.menu-item .menu-item__search__collapse__search .arrow-left i {
  background: url(./src/assets/images/arrow-left.svg) no-repeat;
}

.menu-item .menu-item__search__collapse__search .arrow-right {
  right: 48px;
}

.menu-item .menu-item__search__collapse__search .arrow-right i {
  background: url(./src/assets/images/arrow-right.svg) no-repeat;
}

.menu-item__print i {
  background-image: url("./src/assets/images/print.svg");
}

.main-content {
  display: flex;
  height: calc(100vh - 100px - 30px);
  margin-top: 60px;
  /* 减去菜单和footer高度 */
}

.catalog {
  width: 150px;
  position: fixed;
  left: 0;
  top: 100px;
  /* 菜单栏高度 */
  height: calc(100vh - 60px - 30px);
  /* 视口高度-菜单-底部footer */
  z-index: 2;
  border-right: 2px solid #e2e6ed;
  padding: 0 10px 10px 20px;
  background-color: #f2f4f7;
}

.catalog.hide {
  width: 0;
  padding: 0;
  border: none;
  overflow: hidden;
}

.editor {
  flex: 1;
  margin-left: 150px;
  transition: margin-left 0.3s;
  scrollbar-width: none;
  display: flex;
  justify-content: center;
}

.catalog.hide ~ .editor {
  margin-left: 0;
}

.catalog .catalog__header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e6ed;
}

.catalog .catalog__header span {
  color: #3d4757;
  font-size: 14px;
  font-weight: bold;
}

.catalog .catalog__header i {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  background: url(./src/assets/images/close.svg) no-repeat;
  transition: all 0.2s;
}

.catalog .catalog__header > div:hover {
  background: rgba(235, 238, 241);
}

.catalog__main {
  height: calc(100% - 60px);
  padding: 10px 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.catalog__main .catalog-item {
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
}

.catalog__main > .catalog-item {
  padding-left: 0;
}

.catalog__main .catalog-item .catalog-item__content {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.catalog__main .catalog-item .catalog-item__content:hover > span {
  color: #4991f2;
}

.catalog__main .catalog-item .catalog-item__content span {
  color: #3d4757;
  line-height: 30px;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}

.editor > div {
  margin: 80px auto;
}

.ce-page-container canvas {
  box-shadow: rgb(158 161 165 / 40%) 0px 2px 12px 0px;
}

.comment {
  width: 250px;
  height: 650px;
  position: fixed;
  transform: translateX(420px);
  top: 200px;
  left: 50%;
  overflow-y: auto;
  display: none;
}

.comment-item {
  background: #ffffff;
  border: 1px solid #e2e6ed;
  position: relative;
  border-radius: 8px;
  padding: 15px;
  font-size: 14px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.5s;
}

.comment-item:hover {
  border-color: #c0c6cf;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.comment-item.active {
  border-color: #e99d00;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.comment-item__title {
  height: 22px;
  position: relative;
  display: flex;
  align-items: center;
  color: #c1c6ce;
}

.comment-item__title span:first-child {
  background-color: #dbdbdb;
  width: 4px;
  height: 16px;
  margin-right: 5px;
  display: inline-block;
  border-radius: 999px;
}

.comment-item__title span:nth-child(2) {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.comment-item__title i {
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: absolute;
  right: -8px;
  top: -8px;
  background: url(./src/assets/images/close.svg) no-repeat;
}

.comment-item__title i:hover {
  opacity: 0.6;
}

.comment-item__info {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-item__info > span:first-child {
  font-weight: 600;
}

.comment-item__info > span:last-child {
  color: #c1c6ce;
}

.comment-item__content {
  line-height: 22px;
}

.footer {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f2f4f7;
  z-index: 9;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 12px;
  padding: 0 4px 0 20px;
  box-sizing: border-box;
  border-top: 1px solid #e2e6ed;
}

.footer > div:first-child {
  display: flex;
  align-items: center;
}

.footer .catalog-mode {
  padding: 1px;
  position: relative;
}

.footer .catalog-mode i {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  cursor: pointer;
  display: inline-block;
  background-image: url("./src/assets/images/catalog.svg");
}

.footer .page-mode {
  padding: 1px;
  position: relative;
}

.footer .page-mode i {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  cursor: pointer;
  display: inline-block;
  background-image: url("./src/assets/images/page-mode.svg");
}

.footer .options {
  width: 70px;
  position: absolute;
  left: 0;
  bottom: 25px;
  padding: 10px;
  background: #fff;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgb(56 56 56 / 20%);
  border: 1px solid #e2e6ed;
  border-radius: 2px;
  display: none;
}

.footer .options.visible {
  display: block;
}

.footer .options li {
  padding: 5px;
  margin: 5px 0;
  user-select: none;
  transition: all 0.3s;
  text-align: center;
  cursor: pointer;
}

.footer .options li:hover {
  background-color: #ebecef;
}

.footer .options li.active {
  background-color: #e2e6ed;
}

.footer > div:first-child > span {
  display: inline-block;
  margin-right: 5px;
  letter-spacing: 1px;
}

.footer > div:last-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer > div:last-child > div {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer > div:last-child > div:hover {
  background: rgba(25, 55, 88, 0.04);
}

.footer > div:last-child i {
  width: 16px;
  height: 16px;
  display: inline-block;
  cursor: pointer;
}

.footer .editor-option i {
  background-image: url("./src/assets/images/option.svg");
}

.footer .page-scale-minus i {
  background-image: url("./src/assets/images/page-scale-minus.svg");
}

.footer .page-scale-add i {
  background-image: url("./src/assets/images/page-scale-add.svg");
}

.footer .page-scale-percentage {
  cursor: pointer;
  user-select: none;
}

.footer .fullscreen i {
  background-image: url("./src/assets/images/request-fullscreen.svg");
}

.footer .fullscreen.exist i {
  background-image: url("./src/assets/images/exit-fullscreen.svg");
}

.footer .paper-margin i {
  background-image: url("./src/assets/images/paper-margin.svg");
}

.footer .editor-mode {
  cursor: pointer;
  user-select: none;
}

.footer .paper-size {
  position: relative;
}

.footer .paper-size i {
  background-image: url("./src/assets/images/paper-size.svg");
}

.footer .paper-size .options {
  right: 0;
  left: unset;
}

.footer .paper-direction {
  position: relative;
}

.footer .paper-direction i {
  background-image: url("./src/assets/images/paper-direction.svg");
}

.footer .paper-direction .options {
  right: 0;
  left: unset;
}

.ce-contextmenu-signature {
  background-image: url("./src/assets/images/signature.svg");
}

.ce-contextmenu-word-tool {
  background-image: url("./src/assets/images/word-tool.svg");
}
</style>
