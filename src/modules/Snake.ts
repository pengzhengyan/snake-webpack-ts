class Snake {
  // 蛇头
  head: HTMLElement
  // 蛇的整个外框
  element: HTMLElement
  // 蛇身，包括蛇头
  bodies: HTMLCollection

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = this.element.querySelector('div')!
    this.bodies = this.element.getElementsByTagName('div')
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
    this.head.style.left = v + 'px'
  }
  set Y(v:number) {
    this.head.style.top = v + 'px'
  }
}

export default Snake