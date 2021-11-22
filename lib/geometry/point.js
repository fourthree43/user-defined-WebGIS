import { Geometry } from "./geometry.js";

export class Point extends Geometry {
  constructor(props) {
    super(props);
    const [x, y] = props;
    this.x = x;
    this.y = y;
    if (!Point.RADIUS) Point.RADIUS = 10;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokenStyle = "#ff0000";
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();

    ctx.arc(this.x, this.y, Point.RADIUS, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
