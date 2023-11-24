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
  changeHead(x:number, y:number) {
    // 根据是否逆行，重新设置x、y的值
    x = this.checkUturn(x,y)[0]
    y = this.checkUturn(x,y)[1]

    // 检查是否即将撞身体或撞墙
    this.checkHead(x,y)
    // 移动身体
    this.moveBody()
    // 移动头
    if(this.X !== x) {
      this.head.style.left = x + 'px'
    } else {
      this.head.style.top = y + 'px'
    }
  }

  // 增加蛇身体的方法
  addBody() {
    const tempDiv = document.createElement("div");
    this.element.insertAdjacentElement("beforeend", tempDiv)
  }

  // 移动蛇身体的方法
  moveBody() {
    const length = this.bodies.length
    // 如果没有body时，则不移动
    if (length < 2) return
    for(let i = length - 1; i > 0; i--) {
      let last = this.bodies[i] as HTMLElement
      let last2nd = this.bodies[i-1] as HTMLElement
      last.style.left = last2nd.offsetLeft + 'px'
      last.style.top = last2nd.offsetTop + 'px'
    }
  }

  // 检查蛇头掉头的方法
  checkUturn = (x:number, y:number):number[] =>  {
    // 在蛇有第二节后，才会禁止蛇掉头
      if(this.bodies.length === 1) return [x, y]

      const secondBody = this.bodies[1] as HTMLElement

      if(secondBody.offsetLeft === x && secondBody.offsetTop === y) {
        if(x > this.X) {
          x = this.X - 10
        } else if(x < this.X) {
          x = this.X + 10
        } else if(y > this.Y) {
          y = this.Y - 10
        } else if(y < this.Y) {
          y = this.Y + 10
        }
      }
      return [x, y]
    }

  // 检查蛇头（撞墙，撞到身体）的方法
  checkHead(x:number, y:number) {
    // 如果位置超过设定范围则报错
    if(x < 0 || x > this.maxX || y < 0 || y > this.maxX) throw new Error('Hit the wall!')
    const length = this.bodies.length

    // 蛇在超过4节前不会撞到身体
    if(length < 4) return
    for(let i = 3; i < length; i++) {
      let body = this.bodies[i] as HTMLElement

      if(body.offsetLeft === x && body.offsetTop === y) throw new Error('Hit body!')
    }
  }
}

export default Snake