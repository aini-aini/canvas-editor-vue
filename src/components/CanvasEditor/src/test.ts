import type Editor from './editor'
import aiWritePlugin from './plugins/ai_write'


const testFunction = async (instance: Editor) => {
    await instance.use(aiWritePlugin)

    await instance.aiWrite?.renderH1('这是一级标题')
    const allElementPositionList = await instance.aiWrite?.getAllElementPositionList()
    console.log('所有元素位置列表:', allElementPositionList)
    if (allElementPositionList && allElementPositionList.length > 0) {
        await instance.aiWrite?.setCursorToIndex(allElementPositionList.length - 1)
    }

    // await instance.aiWrite?.insertImage('https://q9.itc.cn/images01/20241017/b2a500d482f94d199c379477096daf7d.jpeg')

    // await instance.aiWrite?.renderH2('这是二级标题')

    // await instance.aiWrite?.insertLineBreak()

    // 测试有序列表
    // await instance.aiWrite?.insertOrderedList([
    //     '第一项',
    //     '第二项',
    //     '第三项'
    // ])

    // await instance.aiWrite?.insertLineBreak()

    // // 测试复选框列表
    // await instance.aiWrite?.insertCheckboxList([
    //     '待办事项1',
    //     '待办事项2',
    //     '待办事项3'
    // ])

    // await instance.aiWrite?.insertLineBreak()

    // // 测试实心圆点列表
    // await instance.aiWrite?.insertDiscList([
    //     '项目1',
    //     '项目2',
    //     '项目3'
    // ])

    // await instance.aiWrite?.insertLineBreak()

    // // 测试空心圆点列表
    // await instance.aiWrite?.insertCircleList([
    //     '选项1',
    //     '选项2',
    //     '选项3'
    // ])

    // await instance.aiWrite?.insertLineBreak()
    // await instance.aiWrite?.insertLineBreak()

    // // 测试空心方块列表
    // await instance.aiWrite?.insertSquareList([
    //     '任务1',
    //     '任务2',
    //     '任务3'
    // ])

    // await instance.aiWrite?.insertLineBreak()

    // await instance.aiWrite?.writeParagraph('嵌入式系统是一门实践性很强的技术，除了进行课堂讲授外，还需要安排大量的时间进行实践。通过《嵌入式系统》实验课程，促使学生掌握嵌入式系统的基本概念、交叉开发模式、ARM Cortex-M3内核和STM32F103外设接口等知识，培养学生开发复杂嵌入式系统的能力。实验教学内容基于OBE理念，根据毕业要求设定相应成果目标，细分成果目标并与专业课耦合确定实验内容，形成以学生为主的学习氛围。注重学生能力培养')
    // await instance.aiWrite?.insertImage('https://q9.itc.cn/images01/20241017/b2a500d482f94d199c379477096daf7d.jpeg')
    // await instance.aiWrite?.insertLineBreak()
    // await instance.aiWrite?.insertLineBreak()
    // await instance.aiWrite?.insertTable()
    // await instance.aiWrite?.insertLineBreak()
    // await instance.aiWrite?.renderH3('我是爱你')
    // await instance.aiWrite?.insertLineBreak()
    // await instance.aiWrite?.renderH3('我是爱你')
    // await instance.aiWrite?.renderH3('我是爱你')


    // 获取光标位置信息
    const cursorInfo = instance.aiWrite?.getCursorInfo()
    console.log('光标信息:', cursorInfo)

    // 获取当前行的所有元素
    const rowElements = instance.aiWrite?.getCurrentRowElements()
    console.log('当前行元素:', rowElements)

    // 获取当前段落的所有元素
    const paragraphElements = instance.aiWrite?.getCurrentParagraphElements()
    console.log('当前段落元素:', paragraphElements)

    // 获取光标上下文信息
    const cursorContext = instance.aiWrite?.getCursorContext()
    console.log('光标上下文:', cursorContext)

}

export default testFunction


