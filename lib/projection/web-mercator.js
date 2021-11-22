/*
 * @Author: 张仕山
 * @Date: 2021-08-05 23:03:59
 * @LastEditors: 张仕山
 * @LastEditTime: 2021-08-08 22:11:32
 * @Description:  web mercator投影
 * @FilePath: \lib\projection\web-mercator.js
 */

import { Bound } from "../util/bound";
import { Projection } from "./projection";

export class WebMercator extends Projection {
  constructor(props) {
    super(props);
    WebMercator.R = 6378137;
  }

  get bound() {
    return new Bound({
      xmin: -Math.PI * WebMercator.R,
      ymin: Math.PI * WebMercator.R,
      xmax: Math.PI * WebMercator.R,
      ymax: -Math.PI * WebMercator.R,
    });
  }

  // 经纬度转平面坐标
  project([lng, lat]) {
    const d = Math.PI / 180,
      sin = Math.sin(lat * d);
    return [
      WebMercator.R * lng * d,
      (WebMercator.R * Math.log((1 + sin) / (1 - sin))) / 2,
    ];
  }

  unproject([x, y]) {
    const d = 180 / Math.PI;
    return [
      (x * d) / WebMercator.R,
      (2 * Math.atan(Math.exp(y / WebMercator.R)) -( Math.PI / 2)) * d,
    ];
  }
}