/**
 * hasClass(element,className)
 * addClass(element,className)
 * removeClass(element,className)
 * css 设置或者返回样式
 * next 返回下一个兄弟元素
 * prev 返回上一个兄弟元素
 * createEL(element,className) 创建含有class的元素
 * randomColor 生成随机颜色
 * randomNum 传入返回  生成随机数
 * isEmail  email正则
 * isPhoneNum 手机号码正则
 * isCard 身份证正则
 * formatPassTime 生成过去的时间
 * formatRemainTime 生成距离给定时间的剩余时间
 * ajax 封装了fetch和XMLHttpRequest 函数
 * 
 */
const utility = {
  hasClass(element, className) {
    let reg = new RegExp(`(\\s|^)${className}(\\s|$)`)
    return reg.test(element.className)
  },
  addClass(element, className) {
    let reg = new RegExp(`(\\s|^)${className}(\\s|$)`)
    if (!reg.test(className)) {
      element.className += ' ' + className
    }
  },
  removeClass(element, className) {
    let reg = new RegExp(`(\\s|^)${className}(\\s|$)`)
    if (reg.test(className))
      element.className = element.className.replace(className, '')
  },
  css(element, attr, val) {
    let length = arguments.length
    if (length == 2) {
      return getComputedStyle(item, null)[attr]
    }
    element.style[attr] = val
  },
  sibling(element, dir) {
    let cur = element
    while ((cur = cur[dir]) && cur.nodeType !== 1) { }
    return cur
  },
  next(element) {
    return sibling(element, 'nextSibling')
  },
  prev(element) {
    return sibling(element, 'previousSibling')
  },
  createEl(el, className) {
    let el = document.createElement(el)
    el.className = className
    return el
  },
  randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
  },
  randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  },
  isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
  },
  isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  },
  isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
  },
  formatPassTime(startTime) {
    var currentTime = Date.parse(new Date()),
      time = currentTime - startTime,
      day = parseInt(time / (1000 * 60 * 60 * 24)),
      hour = parseInt(time / (1000 * 60 * 60)),
      min = parseInt(time / (1000 * 60)),
      month = parseInt(day / 30),
      year = parseInt(month / 12);
    if (year) return year + "年前"
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    else return '刚刚'
  },
  formatRemainTime(endTime) {
    var startDate = new Date(); 
    var endDate = new Date(endTime);
    var t = endDate.getTime() - startDate.getTime();
    var d = 0,
      h = 0,
      m = 0,
      s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor(t / 1000 / 60 / 60 % 24);
      m = Math.floor(t / 1000 / 60 % 60);
      s = Math.floor(t / 1000 % 60);
    }
    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
  },
  ajax(method, url, callback, data) {
    if (fetch) {
      fetch(url, { method: method, headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data || null }).then(response => response.json()).then(data => callback(data)).catch(e => console('err: ', e))
    } else {
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            callback(JSON.parse(xhr.responseText))
          } else {
            console.log('err', xhr.status)
          }
        }
      }
      xhr.open(method, url)
      if (method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      }
      data = data || null
      xhr.send(data)
    }
  }
}