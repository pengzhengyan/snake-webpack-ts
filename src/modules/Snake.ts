class Snake {
  // 蛇头
  head: HTMLElement
  // 蛇的整个外框
  element: HTMLElement
  // 蛇身，包括蛇头
  bodies: HTMLCollection
  // 蛇头坐标合法范围
  maxX: number
  maxY: number

  constructor(maxX:number = 290, maxY:number = 290) {
    this.element = document.getElementById('snake')!
    this.head = this.element.querySelector('div')!
    this.bodies = this.element.getElementsByTagName('div')
    this.maxX = maxX
    this.maxY = maxY
  }

  // 获取蛇头的坐标的水平位置
  get X() {
    return this.head.offsetLeft
  }

  // 获取蛇头的坐标的竖直位置
  get Y() {
    return this.head.offsetTop
  }

  // 设置蛇头的坐标
  set X(v:number) {
    // 如果位置超过设定范围则摄氏
    if(v < 0 || v > this.maxX) throw new Error('Hit the wall!')
    this.head.style.left = v + 'px'
  }
  set Y(v:number) {
    // 如果位置超过设定范围则摄氏
    if(v < 0 || v > this.maxY) throw new Error('Hit the wall!')
    this.head.style.top = v + 'px'
  }

  // 增加蛇的身体
  addBody() {
    const body = document.createElement('div')
    this.element.append(body)
  }
}

export default Snake