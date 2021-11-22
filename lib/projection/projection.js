/*
 * @Author: 张仕山
 * @Date: 2021-08-05 23:03:59
 * @LastEditors: 张仕山
 * @LastEditTime: 2021-08-07 19:31:00
 * @Description:  投影坐标系基类
 * @FilePath: \lib\projection\projection.js
 */

import { Bound } from "../util/bound";

export class Projection {

  // 经纬度转平面坐标
  project([lng, lat]){
    return [];
  }

  // 平面坐标转经纬度
  unproject([x, y]) {
    return [];
  }

  // 投影后的平面坐标范围
  get bound(){
    return null;
  }
}
