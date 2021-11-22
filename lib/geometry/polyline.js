import { Geometry } from "./geometry";

export class Polyline extends Geometry {
  constructor(coordinates) {
    super();
    this.coordinates = coordinates;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    this.coordinates.forEach((point, index) => {
      const [x, y] = point;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.restore();
  }
}
