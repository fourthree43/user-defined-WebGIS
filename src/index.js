/*
 * @Author: 张仕山
 * @Date: 2021-05-23 18:59:45
 * @LastEditors: 张仕山
 * @LastEditTime: 2021-08-14 22:34:29
 * @Description:
 * @FilePath: \src\index.js
 */

import { Map } from '../lib/map.js';
import { Point } from '../lib/geometry/point';
import { Polyline } from '../lib/geometry/polyline.js';
import { Polygon } from '../lib/geometry/polygon.js';

const map = new Map("gisCanvas");
const point = new Point([100, 100]);
map.addGeometry(point);
const polyline = new Polyline([
  [200, 200],
  [300, 200],
]);
map.addGeometry(polyline);
const polygon = new Polygon([
  [300, 300],
  [300, 400],
  [400, 300],
]);
map.addGeometry(polygon);