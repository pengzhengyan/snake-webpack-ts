// 引入游戏相关的类
import Snake from '../modules/Snake'
import Food from '../modules/Food'
import ScorePanel from '../modules/ScorePanel'

class GameControl {
  // 蛇、食物、分数牌
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  // 蛇的移动方向
  direction: string = ''
  // 蛇可移动方向的数组
  directions: string[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ]
  // 蛇的移动速度
  speed: number
  // 蛇移动setTimeout最大和最小时间 ms
  maxTimeout: number = 500
  minTimeout: number = 300
  // 游戏是否结束
  isGameover:boolean = false

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()

    this.speed = Math.ceil((this.maxTimeout - this.minTimeout) / this.scorePanel.maxLevel)
    this.init()
  }

  // 游戏事件初始化
  init() {
    // 监听键盘事件
    document.addEventListener('keydown', this.keydownHandler)
    // 让蛇跑起来
    this.run()
  }

  // 键盘事件控制蛇移动的方向
  keydownHandler = (event: KeyboardEvent) => {
    // 如果按键是方向键且改变了蛇的移动方向
    if(this.directions.includes(event.key) && event.key !== this.direction) {
      // 是否操作蛇掉头
      const isTurnaround = this.direction === 'ArrowUp' && event.key === 'ArrowDown' ||
      this.direction === 'ArrowDown' && event.key === 'ArrowUp' ||
      this.direction === 'ArrowLeft' && event.key === 'ArrowRight' ||
      this.direction === 'ArrowRight' && event.key === 'ArrowLeft'
      // 如果是操作掉头，则禁止
      if(isTurnaround) return
      this.direction = event.key
    }
  }
  // 控制蛇移动的方法
  run = () => {
    // console.log(this.direction)

    // 获取蛇的当前坐标
    let X = this.snake.X
    let Y = this.snake.Y

    try {
      // 根据蛇的移动方向重新确定蛇的坐标
      switch (this.direction) {
        case 'ArrowUp':
          Y -= 10
          this.snake.Y = Y
          break;
        case 'ArrowDown':
          Y += 10
          this.snake.Y = Y
          break;
        case 'ArrowLeft':
          X -= 10
          this.snake.X = X
          break;
        case 'ArrowRight':
          X += 10
          this.snake.X = X
          break;
      }
    } catch (error) {
      // 如果报错，输出报错信息，并结束游戏
      alert(error)
      this.isGameover = true
    }
    // 检查蛇是否吃到食物
    this.checkFood()

    // 如果游戏未结束，开启一个定时调用让蛇不停的跑
    if(this.isGameover) return
    setTimeout(this.run, (this.maxTimeout - this.speed * (this.scorePanel.level - 1)))
  }

  // 检查蛇吃到食物的方法
  checkFood = () => {
    if(this.snake.X === this.food.X && this.snake.Y === this.food.Y) {
      // 蛇增加一节
      this.snake.addBody()
      // 计分板加一分
      this.scorePanel.addScore()
      // 食物换位置
      this.food.change()
    }
  }
}

export default GameControl