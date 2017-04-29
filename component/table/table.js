//是不是在后台接受json数据，然后传递到函数中？
/*{
    naem:['姓名','语文','数学','英语','政治'],
    data: [['ninja',32,34,54,76],...]
    
}*/
class SequenceTable {
    constructor(config, el) {
        this.config = config
        this.length_td = this.config.name.length
        this.length_tr = this.config.data.length

        this.el = el
        this.table = null

        this.init()
        this.bindEvent()
    }
    init() {
        //初始化数组
        this.table = document.createElement('table')
        this.table.appendChild(this.createThead())
        this.table.appendChild(this.createTbody())
        this.el.appendChild(this.table)
    }

    createThead() {
        const thead = document.createElement('thead')
        thead.insertRow(0)
        for (let i = 0; i < this.length_td; i++) {
            thead.rows[0].insertCell(i)
            if (i === 0) {
                thead.rows[0].cells[i].innerHTML = this.config.name[i]
            } else {
                thead.rows[0].cells[i].innerHTML = this.config.name[i] + `<i class="up"></i><i class="down"></i>`
            }
        }
        return thead
    }
    createTbody() {
        const tbody = document.createElement('tbody')
        for (let i = 0; i < this.length_tr; i++) {
            tbody.insertRow(i)
            for (let j = 0; j < this.length_td; j++) {
                tbody.rows[i].insertCell(j)
                tbody.rows[i].cells[j].innerHTML = this.config.data[i][j]
            }
        }
        return tbody
    }


    bindEvent() {
        const up = this.table.querySelectorAll('.up')
        const down = this.table.querySelectorAll('.down')
        for (let i = 1; i < this.length_td; i++) {
            up[i - 1].onclick = () => {
                this.config.data.sort((a, b) => {
                    return a[i] - b[i]
                })
                this.table.replaceChild(this.createTbody(), this.table.lastChild)
                this.el.replaceChild(this.table, this.el.firstChild)
            }
            down[i - 1].onclick = () => {
                this.config.data.sort((a, b) => {
                    return b[i] - a[i]
                })
                this.table.replaceChild(this.createTbody(), this.table.lastChild)
                this.el.replaceChild(this.table, this.el.firstChild)
            }
        }

    }
}
