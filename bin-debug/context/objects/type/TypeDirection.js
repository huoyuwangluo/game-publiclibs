var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeDirection = (function () {
    function TypeDirection() {
    }
    TypeDirection.getDirections = function () {
        return [0, 1, 2, 3, 4, 5, 6, 7];
    };
    /**方向 */
    TypeDirection.getDirectionsStr = function (direc) {
        switch (direc) {
            case TypeDirection.UP:
                return Language.F_UP;
            case TypeDirection.RIGHT_UP:
                return Language.F_RIGHT_UP;
            case TypeDirection.RIGHT:
                return Language.F_RIGHT;
            case TypeDirection.RIGHT_DOWN:
                return Language.F_RIGHT_DOWN;
            case TypeDirection.DOWN:
                return Language.F_DOWN;
            case TypeDirection.LEFT_DOWN:
                return Language.F_LEFT_DOWN;
            case TypeDirection.LEFT:
                return Language.F_LEFT;
            case TypeDirection.LEFT_UP:
                return Language.F_LEFT_UP;
        }
    };
    /**
     * 是否需要翻转
     * @param direction
     * @return
     */
    TypeDirection.isNeedRevert = function (direction) {
        return direction > 4;
    };
    /**
     * 获取资源方向
     * @param direction
     * @return
     */
    TypeDirection.getAssetDirection = function (direction, totalDirect, simpleDirect) {
        if (totalDirect === void 0) { totalDirect = 5; }
        if (simpleDirect === void 0) { simpleDirect = true; }
        if (this.isNeedRevert(direction)) {
            //direction=this.getCopyDirection(direction);
        }
        if (totalDirect == 5) {
            if (!simpleDirect) {
                switch (direction) {
                    case 0: return 0;
                    case 1: return 1;
                    case 2: return 2;
                    case 3: return 3;
                    case 4: return 4;
                    case 5: return 3;
                    case 6: return 2;
                    case 7: return 1;
                }
            }
            switch (direction) {
                case 0:
                case 1: return 1;
                case 2:
                case 3:
                case 4: return 3;
                case 5: return 3;
                case 6: return 3;
                case 7: return 1;
            }
        }
        if (totalDirect == 2) {
            switch (direction) {
                case 0:
                case 1: return 0;
                case 2:
                case 3:
                case 4: return 1;
                case 5: return 1;
                case 6: return 1;
                case 7: return 0;
            }
        }
        return 0;
    };
    /**
     * 获得镜像方向
     * @param direction
     * @return
     */
    TypeDirection.getCopyDirection = function (direction) {
        switch (direction) {
            case TypeDirection.UP: return TypeDirection.DOWN;
            case TypeDirection.RIGHT_UP: return TypeDirection.LEFT_UP;
            case TypeDirection.RIGHT: return TypeDirection.LEFT;
            case TypeDirection.RIGHT_DOWN: return TypeDirection.LEFT_DOWN;
            case TypeDirection.LEFT_DOWN: return TypeDirection.RIGHT_DOWN;
            case TypeDirection.LEFT: return TypeDirection.RIGHT;
            case TypeDirection.LEFT_UP: return TypeDirection.RIGHT_UP;
            case TypeDirection.DOWN: return TypeDirection.UP;
        }
        return TypeDirection.UP;
    };
    /**
     * 获得相反的方向
     * @param direction
     * @return
     */
    TypeDirection.getOppositeDirection8 = function (direction) {
        return this.getRealDirection8(direction + 4);
    };
    /**
     * 获得当前的前一个方向
     * @param direction
     * @return
     */
    TypeDirection.getPrevDirection8 = function (direction, off) {
        if (off === void 0) { off = 1; }
        return this.getRealDirection8(direction - off);
        ;
    };
    /**
     * 获得当前方向的下一个方向
     * @param direction
     * @return
     */
    TypeDirection.getNextDirection8 = function (direction, off) {
        if (off === void 0) { off = 1; }
        return this.getRealDirection8(direction + off);
    };
    TypeDirection.getRealDirection8 = function (direction) {
        if (direction < 0) {
            direction += 8;
        }
        direction = direction % 8;
        return direction;
    };
    /**
     * 获得相反的方向
     * @param direction
     * @return
     *
     */
    TypeDirection.getOppositeDirection4 = function (direction) {
        return this.getRealDirection4(direction + 2);
    };
    /**
     * 获得当前的前一个方向
     * @param direction
     * @return
     */
    TypeDirection.getPrevDirection4 = function (direction, off) {
        if (off === void 0) { off = 1; }
        return this.getRealDirection4(direction - off);
        ;
    };
    /**
     * 获得当前方向的下一个方向
     * @param direction
     * @return
     */
    TypeDirection.getNextDirection4 = function (direction, off) {
        if (off === void 0) { off = 1; }
        return this.getRealDirection4(direction + off);
    };
    TypeDirection.getRealDirection4 = function (direction) {
        direction = direction % 4;
        if (direction < 0) {
            direction += 4;
        }
        return direction;
    };
    /**
     * 强制取横向方向
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return
     */
    TypeDirection.getDirection2 = function (x1, y1, x2, y2) {
        return x2 >= x1 ? TypeDirection.RIGHT : TypeDirection.LEFT;
    };
    /**
     * 获取4方向
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return
     */
    TypeDirection.getDirection4 = function (x1, y1, x2, y2) {
        /*if (x1 == x2) {
            if (y2 >= y1) {
                return TypeDirection.DOWN;
            }
            return TypeDirection.UP;
        }
        if (y1 == y2) {
            if (x2 >= x1) {
                return TypeDirection.RIGHT;
            }
            return TypeDirection.LEFT;
        }
        var angle: number = utils.MathUtil.getUAngle((x2 - x1), (y2 - y1));
        var direction: number = ((angle + 45) / 90) >> 0;
        return direction > 3 ? 0 : direction;
        */
        var direction = this.getDirection8(x1, y1, x2, y2);
        if (direction == TypeDirection.DOWN) {
            direction = (x1 > x2) ? TypeDirection.LEFT_DOWN : TypeDirection.RIGHT_DOWN;
        }
        else if (direction == TypeDirection.UP) {
            direction = (x1 > x2) ? TypeDirection.LEFT_UP : TypeDirection.RIGHT_UP;
        }
        else if (direction == TypeDirection.RIGHT) {
            direction = (y1 > y2) ? TypeDirection.RIGHT_UP : TypeDirection.RIGHT_DOWN;
        }
        else if (direction == TypeDirection.LEFT) {
            direction = (y1 > y2) ? TypeDirection.LEFT_UP : TypeDirection.LEFT_DOWN;
        }
        return direction;
    };
    /**
     * 获取8方向
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return
     */
    TypeDirection.getDirection8 = function (x1, y1, x2, y2) {
        if (x1 == x2) {
            if (y2 >= y1) {
                return TypeDirection.DOWN;
            }
            return TypeDirection.UP;
        }
        if (y1 == y2) {
            if (x2 >= x1) {
                return TypeDirection.RIGHT;
            }
            return TypeDirection.LEFT;
        }
        var angle = utils.MathUtil.getUAngle(x2 - x1, y2 - y1);
        var direction = ((angle + 20) / 45) >> 0;
        return direction > 7 ? 0 : direction;
    };
    /**
     * 获得方向对应的角度
     * @param direction
     * @return
     */
    TypeDirection.getDirectionAngle = function (direction) {
        switch (direction) {
            case TypeDirection.UP:
                return 270;
            case TypeDirection.RIGHT_UP:
                return 315;
            case TypeDirection.RIGHT:
                return 0;
            case TypeDirection.RIGHT_DOWN:
                return 45;
            case TypeDirection.DOWN:
                return 90;
            case TypeDirection.LEFT_DOWN:
                return 135;
            case TypeDirection.LEFT:
                return 180;
            case TypeDirection.LEFT_UP:
                return 225;
            default:
                return 0;
        }
    };
    /**
     * 获得角度对应的 方向
     * @param direction
     * @return
     */
    TypeDirection.getAngleDirection8 = function (angle) {
        return ((angle + 112.5) % 360) / 45 >> 0;
    };
    TypeDirection.getAngleDirection4 = function (angle) {
        return ((angle + 135) % 360) / 90 >> 0;
    };
    TypeDirection.getOffsetByPos = function (x1, y1, x2, y2) {
        var point = new egret.Point();
        var offX = x2 - x1;
        var offY = y2 - y1;
        if (offX > 0) {
            point.x = 1;
        }
        else {
            if (offX < 0) {
                point.x = -1;
            }
            else {
                point.x = 0;
            }
        }
        if (offY > 0) {
            point.y = 1;
        }
        else {
            if (offX < 0) {
                point.y = -1;
            }
            else {
                point.y = 0;
            }
        }
        return point;
    };
    TypeDirection.getOffsetByDirection = function (direction, point) {
        if (point === void 0) { point = null; }
        if (!point)
            point = new egret.Point();
        else
            point.setTo(0, 0);
        switch (direction) {
            case TypeDirection.UP:
                point.y = -1;
                break;
            case TypeDirection.RIGHT_UP:
                point.x = 1;
                point.y = -1;
                break;
            case TypeDirection.RIGHT:
                point.x = 1;
                break;
            case TypeDirection.RIGHT_DOWN:
                point.x = 1;
                point.y = 1;
                break;
            case TypeDirection.DOWN:
                point.y = 1;
                break;
            case TypeDirection.LEFT_DOWN:
                point.x = -1;
                point.y = 1;
                break;
            case TypeDirection.LEFT:
                point.x = -1;
                break;
            case TypeDirection.LEFT_UP:
                point.x = -1;
                point.y = -1;
            default:
        }
        return point;
    };
    TypeDirection.UP = 0;
    TypeDirection.RIGHT_UP = 1;
    TypeDirection.RIGHT = 2;
    TypeDirection.RIGHT_DOWN = 3;
    TypeDirection.DOWN = 4;
    TypeDirection.LEFT_DOWN = 5;
    TypeDirection.LEFT = 6;
    TypeDirection.LEFT_UP = 7;
    return TypeDirection;
}());
__reflect(TypeDirection.prototype, "TypeDirection");
