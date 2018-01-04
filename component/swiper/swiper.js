class Swiper {
  constructor(el,config){
    this.config = Object.assign({},{
      direction: 'horizontal',//默认方向 水平
      speed: 300,
      autoplay: true,
      delay: 3000,
      touch: true,
      width: 400
    },config)
    this.el = el
    this.wrapper = el.querySelector('.swiper-wrapper')
    this.length = null
    this.timer = null
    this.index = 0
    this.init()
  }
  init(){
    this.create()
    this.event()
    this.startLoop()
  }
  create(){
    var children = this.wrapper.children
    this.length = children.length
    var first = children[0].cloneNode(true),
        last = children[children.length-1].cloneNode(true);
    this.wrapper.appendChild(first)
    this.wrapper.insertBefore(last,this.wrapper.firstChild)

    this.el.style.width = this.config.width + 'px'
    this.wrapper.style.width = this.config.width * (this.length + 2) + 'px'
    this.wrapper.style.transition = 'all ' + this.config.speed + 'ms'


    if(this.el.querySelector('.swiper-pagination')){
      var pagination = this.el.querySelector('.swiper-pagination')
      for(let i=0;i<this.length;i++){
        var item = document.createElement('div')
        item.className = 'pagination-item'
        item.addEventListener('click',function(){
          this.index = i + 1
          this.setMarginLeft()
        }.bind(this),false)
        pagination.appendChild(item)
      }
    }
  }
  prev(){
    this.index--
    this.setMarginLeft()
    if(this.index === 0){
      this.replace()
    }
  }
  setMarginLeft(){
    this.wrapper.style.transition =  'all ' + this.config.speed + 'ms'
    this.wrapper.style.marginLeft = -1 * this.index * this.config.width +'px'
  }
  next(){
    this.index++
    this.setMarginLeft()
    if(this.index === this.length+1){
      this.replace()
    }
  }
  replace(){
    if(this.index === 0){
      this.index = this.length
    }else{
      this.index = 1
    }
    setTimeout(function(){
      this.wrapper.style.transition = null
      this.wrapper.style.marginLeft = -1 * this.index * this.config.width +'px'
    }.bind(this),this.config.speed)
  }
  startLoop(){
    this.timer = setInterval(this.next.bind(this),this.config.delay)
  }
  event(){
    this.el.addEventListener('mouseover',function(){
      clearInterval(this.timer)
      // this.timer = null
    }.bind(this),false)
    this.el.addEventListener('mouseout',function(){
      // this.index--
      this.startLoop()
    }.bind(this),false)
    this.el.querySelector('.swiper-button-prev').addEventListener('click',function(){
      this.prev()
    }.bind(this),false)
    this.el.querySelector('.swiper-button-next').addEventListener('click',function(){
      this.next()
    }.bind(this),false)
  }
}