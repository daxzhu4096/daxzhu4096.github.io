class Tab {
    constructor(tab) {
    	const _this_ = this
            //默认配置参数
            this.config = {
                "triggerType": "mouseover", //定义事件触发类型
                "effect": "default", //效果 淡入淡出
                "invoke": 1, //默认显示第几个tab 
                "auto": false // 是否自动切换
            }
            this.tab = tab
            Object.assign(this.config, this.getConfig())
            //保存子元素列表
            this.tabItems = this.tab.querySelectorAll('li')
            this.contentItems = this.tab.querySelectorAll('.content-item')
            this.addHandler();
            if (this.config.auto) {
            	this.timer = null
            	this.loop = 0
            	this.autoPlay()
          		this.tab.addEventListener('mouseover',(e)=>{
          			window.clearInterval(_this_.timer)
          		},false)
          		this.tab.addEventListener('mouseout',(e)=>{
          			_this_.autoPlay()
          		},false)
            }
            if (this.config.invoke > 0  && this.config.invoke <= this.tabItems.length) {
            	this.invoke(this.config.invoke-1)
            }
        }
        //prototype

    //获取配置参数的方法
    getConfig() {
        var config = this.tab.getAttribute('data-config')
            //判断配置被读取，且不为空，这样才能用于转义成对象
        if (config && config != '') {
            return JSON.parse(config)
        } else {
            return null
        }
    }
    addHandler() {
        const _this_ = this
            //保存this，防止在函数在this指向错误
        const config = this.config;
        //保存数组，减少不断遍历造成的性能损失
        if (config.triggerType === 'click') {
            for (let i = 0; i < this.tabItems.length; i++) {
                this.tabItems[i].addEventListener(config.triggerType, e => {
                    _this_.invoke(i)
                }, false)
            }
        } else {
            //不是click的都设置成mouseover
            for (let i = 0; i < this.tabItems.length; i++) {
                this.tabItems[i].addEventListener('mouseover', e => {
                    _this_.invoke(i)
                }, false)
            }
        }
    }
    invoke(index) {
        /*  
    		要执行tab的选中状态，当前选中的add actived clss
			切换对应的tab内容，要根据配置函数effect的值
    	*/
        const tabItems = this.tabItems;
        const contentItems = this.contentItems;
        const currentContent = this.tab.querySelector('.current')
        //仿 jQuery fadeIn fadeOut
        const fadeIn= function(el) {
            let opacity = 0;

            el.style.opacity = 0;
            el.style.filter = '';

            let last = +new Date();
            let tick = function() {
                opacity += (new Date() - last) / 1000;
                el.style.opacity = opacity;
                el.style.filter = 'alpha(opacity=' + (100 * opacity) | 0 + ')';

                last = +new Date();

                if (opacity < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                }
            };

            tick();
        }

        const fadeOut=function(el) {
            let opacity = 1;

            el.style.opacity = 1;
            el.style.filter = '';

            let last = +new Date();
            let tick = function() {
                opacity -= (new Date() - last) / 1000;
                el.style.opacity = opacity;
                el.style.filter = 'alpha(opacity=' + (100 * opacity) | 0 + ')';

                last = +new Date();

                if (opacity > 0) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                }
            };

            tick();
        }

        for (let i = 0; i < tabItems.length; i++) {
            tabItems[i].className = '';
        }
        tabItems[index].className = 'actived'

            //切换对应区域var
        let effect = this.config.effect
        if (effect === 'fade') {
        	fadeOut(currentContent);
            for (let i = 0; i < contentItems.length; i++) {
                contentItems[i].className = 'content-item'
            }
            fadeIn(contentItems[index])
            contentItems[index].className = 'content-item current'
        } else {

            for (var i = 0; i < contentItems.length; i++) {
                contentItems[i].className = 'content-item'
            }
           
            contentItems[index].className = 'content-item current'
            return
        }
        if (this.config.auto) {
        	this.loop = index;
        }
    }
    autoPlay(){
    	const _this_ = this
    	const tabItems = this.tabItems
    	const config = this.config
    	let tabLength = tabItems.length
    	this.timer = window.setInterval(()=>{
    		_this_.loop++
    		if(_this_.loop === tabLength){
    			_this_.loop = 0;
    		}
    		_this_.invoke(_this_.loop)
    	},config.auto)
    }
}
