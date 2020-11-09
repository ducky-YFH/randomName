class RandomDrawing {
  constructor() {
    this.runBtn = document.querySelector(".btn__run");
    this.resetBtn = document.querySelector(".btn__reset");
    this.leftNode = document.querySelector(".left");
    this.rightNode = document.querySelector(".right");
    this.inputNode = document.querySelector(".inputNode");
    this.count = 1;
    this.currentGroup = 1;
    this.newList = [];
    this.time = null;
    this.leftNodeChilds = null;
    this.list = ["陈显薇", "罗浩森", "张靖菲", "陈晓璇", "陈颖琪", "陈思燕", "钟菲", "张俊辉", "陈诗平", "林桂旭", "冯玉琼", "黄腾超", "黄伟钒", "柯冬明", "袁丽婷", "詹萍萍", "钟炜荣", "林浩熙", "杨晓敏", "冯润德", "林志溪", "江嘉玲", "李琳涵", "赖嘉幸", "许煜桁", "谢钰然", "练月连", "邹俊浩", "郭林杰", "周焕贤", "陈淑婷", "李宝欣", "柯昕妤", "周健彬", "刘晓娟", "黄晓珍", "沈钦洲", "刘文镔", "刘宙鑫", "李婷婷", "廖颖娴", "李广荣", "曾德富", "陈宇鹏", "王莹", "甘美凤", "陈裕优", "冯俊恒", "陈瑞飚", "张铭昕", "冯婕", "马莉", "翟浩冰", "陈秀华", "朱琳怡", "罗烨盛"];
  }
  init() {
    this.list.forEach((item) => {
      let div = document.createElement("div");
      div.innerText = item;
      this.leftNode.appendChild(div);
    });
    this.leftNodeChilds = this.leftNode.children;
    this.runBtn.addEventListener("click", () => {
      if (this.time) {
        this.pause();
      }
      this.start();
    });
    this.reset();
    this.inputModel();
  }
  reset() {
    this.resetBtn.addEventListener("click", () => {
      Object.assign(this, {
        newList: [],
        currentGroup: 1,
        count: 1
      })
      this.rightNode.innerHTML = "";
      this.inputNode.value = '';
      const leftChilds = [...this.leftNode.children];
      leftChilds.forEach((item) => {
        item.classList.remove("active");
      });
    });
  }
  inputModel() {
    const that = this;
    var listenValue = {
      get inputValue() {
        return that.inputNode.value;
      },
      set inputValue(value) {
        that.inputNode.value = value;
        that.count = value;
      },
    };
    that.inputNode.addEventListener("keyup", function () {
      that.count = listenValue.inputValue;
    });
  }
  start() {
    if (this.newList.length === this.list.length) return true;
    this.setrunBtnState(true);
    let count = 1;
    let currentArr = [];
    let over = false;
    this.time = setInterval(() => {
      if (count > this.count || over) {
        this.setGroup(this.currentGroup, currentArr);
        this.pause();
        currentArr = [];
        return;
      }
      while (true) {
        if (this.newList.length == this.list.length) {
          over = true;
          break;
        }
        const index = Math.floor(Math.random() * 100000) % this.list.length;
        if (this.newList.includes(this.list[index])) {
          continue;
        }
        this.addActive(this.leftNodeChilds[index], "active");
        this.newList.push(this.list[index]);
        currentArr.push(this.list[index]);
        break;
      }
      count += 1;
    }, 50);
  }
  pause() {
    this.runBtn.innerHTML = "开始";
    clearInterval(this.time);
    this.time = null;
    this.setrunBtnState(false);
    this.currentGroup += 1;
  }
  addActive(dom, className) {
    dom.classList.add(className);
  }
  setrunBtnState(state) {
    this.runBtn.disabled = state;
  }
  setGroup(index, arr) {
    let temp = `
    <div class="label">第${index}组</div>
    <div>${arr.join("，")}</div>`;
    const div = document.createElement("div");
    div.className = "group";
    div.innerHTML = temp;
    this.rightNode.appendChild(div);
  }
}

const rollCall = new RandomDrawing();
rollCall.init();
L2Dwidget.init({
  "model": {
    jsonPath:"https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
    "scale": 1
  }, 
  "display": {
    "position": "left", 
    "width": 200, 
    "height": 400,
    "hOffset": 0, 
    "vOffset": -20,
  }, 
  "mobile": { "show": true, "scale": 0.5 }, 
  "react": { "opacityDefault": 0.7, "opacityOnHover": 0.2 },
});
