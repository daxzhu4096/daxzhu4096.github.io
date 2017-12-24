class FmApp {
  constructor() {
    this.Map = {
      $songlist: document.querySelector('.songlist'),
      $title: document.querySelector('.fm-title'),
      $artist: document.querySelector('.fm-artist'),
      $cover: document.querySelector('.fm-cover img'),
      $volume: document.querySelector('.fm-volume-slider'),
      $volumeValue: document.querySelector('.fm-volume-value'),
      $progress: document.querySelector('.fm-progress'),
      $progressValue: document.querySelector('.fm-progress-value'),
      $time: document.querySelector('.fm-time'),
      $play: document.querySelector('.icon-play'),
      $pause: document.querySelector('.icon-pause'),
      $star: document.querySelector('.star'),
      $next: document.querySelector('.icon-next'),
      $toggle:document.querySelector('.fm-toggle')
    }
    this.audio = new Audio()
    this.data = []
    this.currentData = null
    this.musicFrom = false
    this.index = 0
  }
  init() {
    this.data = JSON.parse(localStorage.getItem('starSongList')) || []
    this.Map.$progress.addEventListener('click', this.setProgress.bind(this), false)
    this.Map.$volume.addEventListener('click', this.setVolume.bind(this), false)
    this.Map.$play.addEventListener('click', this.play.bind(this), false)
    this.Map.$pause.addEventListener('click', this.pause.bind(this), false)
    this.Map.$star.addEventListener('click', this.star.bind(this), false)
    this.Map.$next.addEventListener('click', this.next.bind(this), false)
    this.Map.$songlist.addEventListener('click',this.playStar.bind(this),false)
    this.Map.$toggle.addEventListener('click',this.playFm.bind(this),false)
    this.audio.addEventListener('ended', this.next.bind(this), false)
    this.audio.addEventListener('timeupdate', this.updateProgress.bind(this), false)
    document.body.appendChild(this.audio)
    this.createSongList()
    this.loadState()
  }
  createSongList() {
    this.Map.$songlist.innerHTML = this.data.map((item, index) => {
      return `<div class="fm-songlist-item" data-index="${index}" title="${item.title} - ${item.artist}">
        ${index + 1}. ${item.title} - ${item.artist}
      </div>`
    }).join('')
  }
  playFm(){
    this.musicFrom = false
    this.next()
  }
  playStar(event){
    this.musicFrom = true
    this.index = isNaN(parseInt(event.target.dataset["index"])) ? 0 : parseInt(event.target.dataset["index"])
    
    this.next()
    console.log(this.index)
  }
  loadState() {
    var that = this
    fetch('https://jirenguapi.applinzi.com/fm/getSong.php?channel=public_tuijian_rege').then(response => response.json()).then(function (data) {
      that.currentData = data.song[0]
      that.setState(data.song[0])
      that.play()
    }).catch(e => {
      console.log(e)
      that.loadState()
    })
  }
  setState(data) {
    this.Map.$title.textContent = data.title
    this.Map.$artist.textContent = data.artist
    this.Map.$cover.src = data.picture
    this.audio.src = data.url
    document.title = data.title
    console.log(data)
  }
  star() {
    let length = this.data.length, flag = false, i;
    for (i = 0; i < length; i++) {
      if (this.data[i].sid === this.currentData.sid) {
        flag = true
      }
    }
    if (!flag) {
      this.data.push(this.currentData)
      this.createSongList()
      localStorage.setItem('starSongList', JSON.stringify(this.data))
    }

  }
  setProgress(e) {
    //点击进度条的操作
    this.audio.currentTime = e.offsetX / this.Map.$progress.clientWidth * this.audio.duration
  }
  updateProgress() {
    //时间条
    const time = parseInt(this.audio.duration - this.audio.currentTime)
    const m = parseInt(time / 60)
    let s = time % 60
    if (s < 10) {
      s = '0' + s
    }
    this.Map.$time.textContent = `-${m}:${s}`
    this.Map.$progressValue.style.width = (this.audio.currentTime / this.audio.duration * 100) + '%'
  }

  setVolume(event) {
    //调节音量
    const rect = this.Map.$volume.getBoundingClientRect()
    const volume = (event.x - rect.left) / rect.width
    this.Map.$volumeValue.style.width = volume * 100 + '%'
    this.audio.volume = volume
  }
  play() {
    this.audio.play()
    this.Map.$pause.style.display = 'inline-block'
    this.Map.$play.style.display = 'none'
  }
  pause() {
    this.audio.pause()
    this.Map.$play.style.display = 'inline-block'
    this.Map.$pause.style.display = 'none'
  }
  next() {
    if(this.musicFrom){
      this.setState(this.data[this.index])
      this.currentData = this.data[this.index]
      this.play()
      if(this.index === this.data.length-1){
        this.index = 0
      }else{
        this.index++
      }      
    }else{
      this.loadState()
    }    
  }
}

const app = new FmApp()
app.init()
