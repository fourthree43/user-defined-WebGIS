export class Map {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.geometries = [];
    // 鼠标拖曳
    this.drag = {
      flag: false,
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 0,
        y: 0,
      },
    };

    this.canvas.addEventListener("dblclick", this.onDoubleClick.bind(this));
    // 添加拖曳事件
    this.canvas.addEventListener(
      "mousedown",
      this.onMouseDown.bind(this)
    );
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.canvas.addEventListener("wheel", this.onWheel.bind(this));

  }

  addGeometry(geometry) {
    geometry.draw(this.ctx);
    this.geometries.push(geometry);
  }

  redraw() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
    this.geometries.forEach((geometry) => geometry.draw(this.ctx));
  }

  onDoubleClick(event) {
    const matrix = this.ctx.getTransform();
    // x轴
    const { a: a1, e: e1 } = matrix;
    const { offsetX: x1 } = event;
    const x2 = x1;
    const e = ((x2 - e1) / a1) * (1 - 2);
    // y轴
    const { d: d1, f: f1 } = matrix;
    const { offsetY: y1 } = event;
    const y2 = y1;
    const f = ((y2 - f1) / d1) * (1 - 2);
    this.ctx.transform(2, 0, 0, 2, e, f);
    this.redraw();
  }

  onMouseDown(event) {
    this.drag.flag = true;
    this.drag.start.x = event.x;
    this.drag.start.y = event.y;
  }

  onMouseUp(event) {
    if (this.drag.flag) {
      this.drag.end.x = event.x;
      this.drag.end.y = event.y;
    }
    this.drag.flag = false;
    // 重绘img
    const curTransMatrix = this.ctx.getTransform();
    // 如果放大n倍，(this.drag.end.x - this.drag.start.x)为原来的n倍
    // 所以在当前放大坐标系下，需要转换为当前坐标系的移动的距离

    // this.ctx.translate(
    //   (this.drag.end.x - this.drag.start.x) / curTransMatrix.a,
    //   (this.drag.end.y - this.drag.start.y) / curTransMatrix.d
    // );
    this.ctx.transform(
      1,
      0,
      0,
      1,
      (this.drag.end.x - this.drag.start.x) / curTransMatrix.a,
      (this.drag.end.y - this.drag.start.y) / curTransMatrix.d
    );

    this.redraw();
  }

  onWheel(event) {
    let scale = 1;
    const sensitivity = 100;
    const delta = event.deltaY / sensitivity;
    if (delta < 0) {
      scale *= delta * -2;
    } else {
      scale /= delta * 2;
    }

    const matrix = this.ctx.getTransform(); // (1,0,0,1,0,0) => (...)
    // x轴
    const { a: a1, e: e1 } = matrix;
    const { offsetX: x1 } = event;
    const x2 = x1;
    const e = ((x2 - e1) / a1) * (1 - scale);
    // y轴
    const { d: d1, f: f1 } = matrix;
    const { offsetY: y1 } = event;
    const y2 = y1;
    const f = ((y2 - f1) / d1) * (1 - scale);
    this.ctx.transform(scale, 0, 0, scale, e, f); // 先平移后缩放

    this.redraw();

  }

  destroy() {
    //取消双击监听
    this.canvas.removeEventListener("dblclick", this.onDoubleClick);
  }
}
