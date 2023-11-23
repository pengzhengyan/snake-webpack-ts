class Score {
  // 显示分数的元素
  scoreEle: HTMLElement
  // 显示等级的元素
  levelEle: HTMLElement
  // 最高等级
  private _maxLevel: number
  // 当前分数和等级
  private score = 0
  private level = 1

  constructor() {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this._maxLevel = 10
  }

  // 获取和设置最高等级
  get maxLevel() {
    return this._maxLevel
  }
  set maxLevel(v:number) {
    if(v<0) return
    this._maxLevel = v
  }

  // 提升分数方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    // 每增加10分升一级
    if(this.score % 10 === 0) this.levelUp()
  }
  // 提升等级方法
  levelUp() {
    if(this.level < this._maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}

export default Score