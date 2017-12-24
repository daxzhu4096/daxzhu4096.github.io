class Calendar {
	constructor(dom) {
		this.dom = dom
		this.calendar = false
		this.dis = false
		this.date = new Date()
		this.calendarDate = {}
		this.weeks = ['日', '一', '二', '三', '四', '五', '六']

	}
	start() {
		var _this = this;
		var inputBox = document.createElement('div'),
			input = document.createElement('input'),
			i = document.createElement('i');
		inputBox.className = 'inputbox'
		input.className = 'calendarDate'
		i.className = 'fa fa-calendar'
		i.setAttribute('aria-hidden', true)

		inputBox.appendChild(input)
		inputBox.appendChild(i)
		this.dom.appendChild(inputBox)

		document.querySelector('.inputbox').addEventListener('click', function() {
			if (!_this.calendar && !_this.dis) {
				_this.create()
			} else if (_this.dis) {
				_this.hide(document.querySelector('.calendar'))
				_this.dis = false
			} else {
				_this.show(document.querySelector('.calendar'))
				_this.dis = true
			}
		}, false)
	}
	create() {
		this.calendar = true
		this.dis = true
		var pickes = document.createElement('div'),
			left = document.createElement('div'),
			right = document.createElement('div');

		pickes.className = 'calendar'
		left.className = 'left'
		right.className = 'right'

		pickes.appendChild(left)
		pickes.appendChild(right)

		this.dom.appendChild(pickes)


		this.calendarDate.year = this.date.getFullYear()
		this.calendarDate.month = this.date.getUTCMonth() + 1
		this.calendarDate.day = this.date.getDate()
		this.calendarDate.week = this.weeks[this.date.getDay()]
		this.calendarDate.allDays = this.getdays(this.calendarDate.year, this.calendarDate.month)
		const calendarDate = this.calendarDate;

		this.renderLeft(calendarDate, left, right)
		this.renderRight(calendarDate, right, left)
	}

	renderLeft(date, left, right) {
		left.innerHTML = ''
		var showYear = document.createElement('a')
		var _this = this

		showYear.innerHTML = date.year
		showYear.className = 'show-year'
		left.appendChild(showYear)

		var showWeek = document.createElement('a')
		showWeek.className = 'show-week'
		showWeek.innerHTML = '星期' + date.week
		left.appendChild(showWeek)

		var showDay = document.createElement('a')
		showDay.className = 'show-day'
		showDay.innerHTML = date.month + '月' + date.day + '日'
		left.appendChild(showDay)

		showYear.addEventListener('click', function() {
			_this.hide(showWeek)
			_this.hide(showDay)

			if (showYear.innerHTML !== '去选月') {
				showYear.innerHTML = '去选月'
				if (document.querySelector('.select-month')) {
					_this.hide(document.querySelector('.select-month'))
				}
				_this.selectYear(date, left, right)
			} else {
				showYear.innerHTML = '去选年'
				if (document.querySelector('.select-year')) {
					_this.hide(document.querySelector('.select-year'))
				}
				_this.selectMonth(date, left, right)
			}
		}, false)
	}

	selectYear(date, left, right) {
		if (!document.querySelector('.select-year')) {
			var _this = this
			var div = document.createElement('div')
			div.className = 'select-year'
			for (let i = date.year - 1; i < date.year + 11; i++) {
				if (i === date.year - 1) {
					var upContent = document.createElement('a')
					var up = document.createElement('i')

					upContent.className = 'year-control'
					up.className = 'fa fa-chevron-up'

					upContent.appendChild(up)
					div.appendChild(upContent)
				} else if (i === date.year + 10) {
					var downContent = document.createElement('a')
					var down = document.createElement('i')

					downContent.className = 'year-control'
					down.className = 'fa fa-chevron-down'

					downContent.appendChild(down)
					div.appendChild(downContent)
				} else {
					var a = document.createElement('a')
					a.className = 'year-item'
					a.innerHTML = i
					div.appendChild(a)
					a.addEventListener('click', (e) => {
						date.year = parseInt(e.target.innerHTML)
						_this.renderRight(date, right, left, 'animate')
					}, false)
				}
			}
			left.appendChild(div)
			downContent.addEventListener('click', () => {
				var goDown = document.querySelectorAll('.year-item')
				for (let i = 0; i < goDown.length; i++) {
					goDown[i].innerHTML = parseInt(goDown[i].innerHTML) + 10
				}
			}, false)

			upContent.addEventListener('click', () => {
				var goUp = document.querySelectorAll('.year-item')
				for (var i = 0; i < goUp.length; i++) {
					goUp[i].innerHTML = parseInt(goUp[i].innerHTML) - 10
				}
			}, false)
		} else {
			this.show(document.querySelector('.select-year'))
		}
	}

	selectMonth(date, left, right) {
		var _this = this
		if (!document.querySelector('.select-month')) {
			var div = document.createElement('div')
			div.className = 'select-month'
			for (let i = 1; i <= 12; i++) {
				var a = document.createElement('a')
				a.className = 'month-item'
				a.innerHTML = i + '月'
				a.addEventListener('click', () => {
					date.month = i
					_this.renderRight(date, right, left, 'animate')
				}, false)
				div.appendChild(a)
			}
			left.appendChild(div)
		} else {
			this.show(document.querySelector('.select-month'))
		}
	}
	renderRight(date, right, left, animate) {
		right.innerHTML = ''
		var _this = this
		var control = document.createElement('div')
		var reduce = document.createElement('i')
		var add = document.createElement('i')
		var now = document.createElement('a')

		control.className = 'control'
		reduce.className = 'fa fa-chevron-left go-left'
		add.className = 'fa fa-chevron-right go-right'
		now.className = 'control-now'
		reduce.setAttribute('aria-hidden', true)
		add.setAttribute('aria-hidden', true)

		now.innerHTML = date.year + '/' + date.month

		control.appendChild(reduce)
		control.appendChild(now)
		control.appendChild(add)
		right.appendChild(control)

		this.dateTable(right, date, left, animate)

		var footer = document.createElement('div')
		footer.className = 'calendarDate-footer'
		var today = document.createElement('a')
		today.className = 'go-today'
		today.innerHTML = '今天'
		var choose = document.createElement('a')
		choose.className = 'choose-time'
		choose.innerHTML = '确认'
		footer.appendChild(today)
		footer.appendChild(choose)
		right.appendChild(footer)
		today.addEventListener('click', () => {
			var nowTime = new Date()
			date.year = nowTime.getFullYear()
			date.month = nowTime.getUTCMonth() + 1
			date.day = nowTime.getDate()
			date.week = _this.weeks[nowTime.getDay()]
			date.allDays = _this.getdays(date.year, date.month)
			_this.renderRight(date, right, left, 'animate')
			_this.renderLeft(date, left, right)
		}, false)
		choose.addEventListener('click', () => {
			_this.hide(document.querySelector('.calendar'))
			_this.dis = false
			document.querySelector('.inputbox>.calendarDate').value = date.year + '年' + date.month + '月' + date.day + '日'
			_this.renderLeft(date, left, right)
		}, false)
		document.querySelector('.right .go-left').addEventListener('click', () => {
			if (date.month > 1) {
				date.month -= 1
			} else {
				date.year -= 1
				date.month = 12
			}
			date.day = 1
			date.allDays = _this.getdays(date.year, date.month)

			var news = new Date(date.year + '/' + date.month + '/' + date.day)
			date.week = _this.weeks[news.getDay()]

			_this.renderRight(date, right, left, 'animat')
			_this.renderLeft(date, left, right)
		}, false)
		document.querySelector('.right .go-right').addEventListener('click', () => {
			if (date.month < 12) {
				date.month += 1
			} else {
				date.year += 1
				date.month = 1
			}
			date.day = 1
			date.allDays = _this.getdays(date.year, date.month)

			var news = new Date(date.year + '/' + date.month + '/' + date.day)
			date.week = _this.weeks[news.getDay()]

			_this.renderRight(date, right, left, 'animat')
			_this.renderLeft(date, left, right)
		}, false)
	}

	dateTable(right, date, left, animate) {
		var _this = this,
			table = document.createElement('table'),
			thead = document.createElement('thead'),
			tbody = document.createElement('tbody'),
			tr = document.createElement('tr');

		_this.weeks.map((item) => {
			var th = document.createElement('th')
			th.innerHTML = item
			tr.appendChild(th)
		})

		thead.appendChild(tr)
		table.appendChild(thead)
		table.className = animate ? 'animate' : ''

		var firstDay = new Date(date.year + '/' + date.month + '/' + 1).getDay()

		for (let i = 0; i < date.allDays + firstDay; i++) {
			if (i % 7 === 0) {
				var tr = document.createElement('tr')
			}
			var td = document.createElement('td')
			var value = i - firstDay + 1
			if (i >= firstDay) {
				var a = document.createElement('a')
				a.innerHTML = value
				if (value === date.day) {
					a.className = 'choose'
				}
				td.appendChild(a)
				a.addEventListener('click', (e) => {
					date.day = parseInt(e.target.innerHTML)
					var news = new Date(date.year + '/' + date.month + '/' + date.day)
					date.week = _this.weeks[news.getDay()]
					_this.renderRight(date, right, left)
					_this.renderLeft(date, left, right)
				}, false)
			}
			tr.appendChild(td)
			if (i % 7 === 0) {
				tbody.appendChild(tr)
			}
		}
		table.appendChild(tbody)
		right.appendChild(table)
	}
	getdays(year, month) {
		var days = 30
		switch (month) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				days = 31
				break;
			case 2:
				if (year % 4 === 0 && year % 100 !== 0) {
					days = 29
				} else {
					days = 28
				}
				break;
		}
		return days
	}
	hide(el) {
		el.style.display = 'none'
	}
	show(el) {
		el.style.display = ''
	}
}