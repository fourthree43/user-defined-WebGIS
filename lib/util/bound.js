/*
 * @Author: 张仕山
 * @Date: 2021-08-05 22:47:20
 * @LastEditors: 张仕山
 * @LastEditTime: 2021-08-08 16:25:11
 * @Description:  边界类，可应用于视图范围extent，点线面的包络矩形envelope
 * @FilePath: \lib\util\bound.js
 */

export class Bound {
  constructor(props) {
    const { xmin, ymin, xmax, ymax } = props;
    this.xmin = Math.min(xmin, xmax);
    this.ymin = Math.min(ymin, ymax);
    this.xmax = Math.max(xmin, xmax);
    this.ymax = Math.max(ymin, ymax);
    // +1表示x方向自西向东，-1反之
    this.xscale = xmin <= xmax ? 1 : -1;
    // +1表示y方向自北向南，-1反之
    this.yscale = ymin <= ymax ? 1 : -1;
  }

  // get xmin() {
  //   return this.xmin;
  // }
  // get xmax() {
  //   return this.xmax;
  // }
  // get ymin() {
  //   return this.ymin;
  // }
  // get ymax() {
  //   return this.ymax;
  // }
  // get xscale() {
  //   return this.xscale;
  // }
  // get yscale() {
  //   return this.yscale;
  // }

  /**
   * @author: 张仕山
   * @description: 是否交叉叠盖
   * @param {*} bound: 范围坐标
   * @return {*}
   */
  intersect(bound) {
    return (
      bound.xmax >= this.xmin &&
      bound.xmin <= this.xmax &&
      bound.ymax >= this.ymin &&
      bound.ymin <= this.ymax
    );
  }
}
