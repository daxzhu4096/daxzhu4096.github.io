class Selector {
  constructor(config, dom) {
    this.config = Object.assign({},{options: [],curOption: 0} , config)
    this.dom = dom
    this.map = {}
  }
  createHtml() {
    let that = this
    var div = document.createElement('div'),
      p = document.createElement('p'),
      ul = document.createElement('ul');
      this.map = {div,ul,p}
    div.className = 'selector-container'
    div.style.position= "relative"
    p.classname = 'selector-selected'
    ul.className = 'selector-list'
    ul.style.position= "absolute"
    p.innerText = this.config.options[this.config.curOption]
    for (let i = 0; i < this.config.options.length; i++) {
      let li = document.createElement('li')
      if(i === this.config.curOption){
        li.className = 'active'
      }
      li.dataset.index = i
      li.innerText = this.config.options[i]
      ul.appendChild(li)
    }
    div.appendChild(p);
    div.appendChild(ul)
    ul.hidden=true
    this.dom.appendChild(div)
  }
  addevent(){
    var that = this
    that.map.p.addEventListener('click',()=>{
      if(!that.map.ul.hidden){
        that.map.ul.hidden = true
      }else{
        that.map.ul.hidden=false
        that.map.ul.children[that.config.curOption].className = 'active'
      }
    },false)
    that.map.ul.addEventListener('click',(e)=>{
      that.map.p.innerText = e.target.innerText
      that.map.ul.hidden = true
      that.config.curOption = parseInt(e.target.dataset.index)
    },false)
    that.map.ul.addEventListener('mouseover',(e)=>{
      that.map.ul.children[that.config.curOption].className = ''
      e.target.className= 'active'
    },false)
    that.map.ul.addEventListener('mouseout',(e)=>{
      e.target.className = ''
    },false)
  }
  init(){
    this.createHtml()
    this.addevent()
  }
}