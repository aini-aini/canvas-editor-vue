# canvas-editor-vue

这是canvas-editor项目的vue版本,我封装成组建了,当然了这是个已经把canvas-editor封装好的的Vue项目

项目地址GitHub地址:https://github.com/aini-aini/canvas-editor-vue

## 1. 启动项目

### 1-1 安装依赖

```sh
npm install
```

### 1-2 运行项目

```sh
npm run dev
```

### ![image-20250515204127794](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515204127794.png?imageSlim)

## 2.项目说明

这是一个只有一个组件的,没有配置路由,没有配置仓库一个空白项目,components目录下自由我封装好的canvas-editor的组件

项目启动以后界面如下

![image-20250515204756148](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515204756148.png?imageSlim)

大家看到这个启动起来的项目根源码是不一样的,首先我加了一个顶部的导航栏,右边的侧边栏,左边的目录侧边栏也做了修改,这些地方会慢慢后面我会做讲解,我先告诉大家如果把这个组件用到你们的项目当中

![image-20250515205216465](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515205216465.png?imageSlim)

## 3.把组件用到自己的Vue项目中(Ts项目)

### **第一步: 把components目录下的CanvasEditor.vue放到你们项目中的components目录下**

![image-20250515205641156](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515205641156.png?imageSlim)

### 第二部:父组建中导入使用

```vue
<script setup lang="ts">
  // 导入CanvasEditor.vue组件
import CanvasEditor from "./components/CanvasEditor/CanvasEditor.vue";
import { ref, onMounted, nextTick } from "vue";

  // 定义用于接受Editor实例的变量
const canvasEditorRef = ref();
</script>

<template>
	  <!-- canvasEditorRef就是CanvasEditor.vue传递过来的Editor实例 -->
  <!-- 有了这个实例以后大家还安装插件 -->
  <CanvasEditor ref="canvasEditorRef" />
</template>

<style scoped></style>
```

我父组建是App.vue

![image-20250515205857429](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515205857429.png?imageSlim)

## 4.对于修改部分做一些说明

```vue
<script setup lang="ts">
import CanvasEditor from "./components/CanvasEditor/CanvasEditor.vue";
import { ref, onMounted, nextTick } from "vue";

const canvasEditorRef = ref();
onMounted(() => {
  nextTick(() => {
    const canvasEditor = canvasEditorRef.value;
    console.log(canvasEditor);
  });
});
</script>

<template>
  <!--  -->
  <CanvasEditor ref="canvasEditorRef" />
</template>

<style scoped></style>

```

![image-20250515210440561](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515210440561.png?imageSlim)

反正这种组件式的封装已经可以直接在Vue项目中直接使用,关于功能你们可以直接修改组件源码,源吗就在CanvasEditor里面的Src目录

![image-20250515210708070](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515210708070.png?imageSlim)

我把源项目里面Src目录下的main.ts里面的内容放到了CanvasEditor目录下的index.ts

![image-20250515210934292](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515210934292.png?imageSlim)

把源项目里的index.html里面的html内容放到了CanvasEditor.vue里面,并且自己做了一些修改

![image-20250515211058806](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515211058806.png?imageSlim)

UI样式我也直接放到了CanvasEditor.vue里面的style里面

![image-20250515211130654](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515211130654.png?imageSlim)

## 5.自己修改的部分代码说明

### 5-1 顶部菜单栏

![image-20250515211432264](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515211432264.png?imageSlim)

下面是源码里index.html结构

![image-20250515211943833](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515211943833.png?imageSlim)

下面是我做的一些结构调整

![image-20250515212050276](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515212050276.png?imageSlim)

Top_menu_bar下面多了一个top_menu的div就是我添加的顶部菜单栏源码里面menu菜单栏fixed定位,占据60px的高度

我在修改后Top_menu_bar fix定位,占据100像素的高度;top_menu占据40像素,menu占据60像素,这其实很简单的,大家应该能看得懂

```css
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
```

当然了菜单来功能我没有实现,大家需要的话自己实现一下,如果不需要菜单栏,那就再改源码,改回去,当然了,有一些动态计算的地方都需要改回去,所以如果要改回去的朋友注意去这些地方把100改回去

![image-20250515212756007](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515212756007.png?imageSlim)

### 5-2 关于右边菜单栏

#### 5-2-1 菜单栏是干什么的?

我有个需求就是我希望集成Ai功能实现对文档内容的提问和替换,所以其实这个就是一个Ai侧边栏工具

#### 5-2-2 如何实现的

其实纯插件的形式实现的,功能完全独立于组件本身,大家不想用只要注释掉几行代码即可

![image-20250515213139334](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515213139334.png?imageSlim)

CanvasEditor/src/plugin/card文件夹里就是这个插件的代码,这个功能是我自己实现的

![image-20250515213318294](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515213318294.png?imageSlim)

用法就是首先导入这个插件

```ts
import { cardPlugin } from "./src/plugins/card"; // 插件统一导出文件
```

然后挂在到Editor实例上面即可,目前我只接了一个deepseek模型

```
    instance.use(cardPlugin, { apiKey: "你的deepseek模型的apikey" });
```

大家不想用的话,直接删除导入使用逻辑即可我现在注释掉了,再看看页面

![image-20250515213540970](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515213540970.png?imageSlim)

![image-20250515213732475](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515213732475.png?imageSlim)

我再把代码加回来,给大家演示下功能

#### 5-2-3 功能演示

##### 1. 菜单栏显示或隐藏

插件注册以后通过工具栏就会有这个展开或合上侧边栏的图标,点击可以进行一个隐藏或者显示

![image-20250515213848570](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515213848570.png?imageSlim)

##### 2. ai提问

选中一段文本,进行提问,并替换

![image-20250515214208820](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515214208820.png?imageSlim)

![image-20250515214246474](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515214246474.png?imageSlim)

![image-20250515214317793](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515214317793.png?imageSlim)

##### 3. 侧边栏拖放

我这个侧边栏是可以脱离文档流进行拖拽的

![image-20250515214501000](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515214501000.png?imageSlim)

![image-20250515214522989](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515214522989.png?imageSlim)

如果想要还原回去也很简单,拖动拖到离右边窗口10px以内时,这个侧边栏边框变蓝色,意思就是可以放手吸附到侧边,此时放手即可

![image-20250515214724087](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515214724087.png?imageSlim)

![image-20250515214742591](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515214742591.png?imageSlim)

或者

![image-20250515214813332](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515214813332.png?imageSlim)

### 5-3 关于左边目录栏

这个其实改动不大,我只是加了过渡动画和改变了宽度,这个大家自己找找源码吧

### 5-4 关于目前文档内容

大家发现项目启动后是默认有内容的,其实内容也是通过独立的插件去渲染的

我有个需求就是我想要把一些从ai拿到的结果渲染到页面上,就得通过代码去操作了,所以对一些数据的插入我写了一个aiWrite插件来操作的,具体源码在

![image-20250515215124299](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515215124299.png?imageSlim)

#### 导入和使用

我是从./src/test导入了一个testFunction;这是我用来测试用的,然后把Editor实例instanca传递过去了

![image-20250515215543465](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515215543465.png?imageSlim)

咱再来看看这个testFunction

![image-20250515215808562](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515215808562.png?imageSlim)

大家有没有注意,这个插件注册完以后Editor实例就又了新的方法就是aiWrite;在插件内容我就给editor实力家了这个aiWrite,注册后就有这个方法了,所以页面上的内容就是这么来的

![image-20250515220147020](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515220147020.png?imageSlim)

如果我把test Function注释掉看看

![image-20250515220305136](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515220305136.png?imageSlim)

可以看看页面清空了

**好了,今天我就分享到这里,下面我想说一说侧边栏插件**,下面的内容根上面说的把canvas-editor用到Vue项目无关了

## 6.源码里安装右边侧边栏

我刚开始侧边栏是直接以插件的形式开发的并做了打包发不到npm上了,不过只能在源码里使用

npm包地址:https://www.npmjs.com/package/@aini_ai/ai-assistant

插件源码github地址:https://github.com/aini-aini/canvas-editor-ai-assistant

![image-20250515220807683](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515220807683.png?imageSlim)

我做个演示,下面这个现在是一个源码项目

![image-20250515220831763](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515220831763.png?imageSlim)

安装我发布的插件包

![image-20250515220943669](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515220943669.png)

然后在main.ts里面使用

首先导入和注册

```ts
import cardPlugin from '@aini_ai/ai-assistant';
  // 在 canvas-editor 中注册插件
  instance.use(cardPlugin,{ apiKey: '你的seepseek模型的apiKey' })
```

![image-20250515221407325](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515221407325.png)

再重新启动项目即可,可以看到已经有侧边栏了

![image-20250515221517967](https://aini-1353577041.cos.ap-shanghai.myqcloud.com/image-20250515221517967.png)

大家需要的话可以继续修改源码去完善其功能

有问题欢迎交流
