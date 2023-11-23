class Food {
  // 食物的Elment
  element: HTMLElement
  // 食物坐标的范围
  private _maxLeft: number
  private _maxTop: number
  
  constructor(id:string = 'food') {
    this.element = document.getElementById(id)!
    this._maxLeft = 300
    this._maxTop = 300
  }
  // 食物当前的坐标
  get X() {
    return this.element.offsetLeft
  }
  get Y() {
    return this.element.offsetTop
  }

  // 设置食物随机位置范围
  set maxLeft(maxLeft:number) {
    if (maxLeft%10 !== 0) return
    this._maxLeft = maxLeft
  }
  set maxTop(_maxTop:number) {
    if (_maxTop%10 !== 0) return
    this._maxTop = _maxTop
  }

  // 食物会随机更换位置
  change() {
    const x = Math.floor(Math.random() * this._maxLeft / 10) * 10
    const y = Math.floor(Math.random() * this._maxTop / 10) * 10
    this.element.style.left = x + 'px'
    this.element.style.top = y + 'px'
  }
}

export default Food