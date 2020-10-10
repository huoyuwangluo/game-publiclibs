var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var vo;
(function (vo) {
    var FashionVO = (function (_super) {
        __extends(FashionVO, _super);
        // public attHtml: Array<any>;
        // public attHtml2: Array<any>;
        function FashionVO() {
            return _super.call(this) || this;
        }
        /**初始化VO,不要调用此方法，请通过vo.fromPool来调用并初始化 */
        FashionVO.prototype.initialize = function (tmp) {
            this.template = tmp;
            this.isDressed = false;
            this.isActived = false;
            this.limitSeconds = tmp.duration;
            this.property = {};
            var args = tmp.properties.split(";");
            for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                var str = args_1[_i];
                var p = str.split("_");
                this.property[p[0]] = p[1];
            }
        };
        FashionVO.prototype.updateFashion = function (data) {
            this.isDressed = Boolean(data.IsDressed);
            this.isActived = Boolean(data.IsActived);
            this.limitSeconds = data.LeftSeconds;
            this._endTime = this.limitSeconds + GameModels.timer.getTimer() / 1000;
        };
        FashionVO.prototype.updateFashionEndTime = function (leftTime) {
            this._endTime = leftTime + GameModels.timer.getTimer() / 1000;
        };
        FashionVO.prototype.updateTitle = function (data) {
            this.isActived = true;
            this.isDressed = Boolean(data.IsDressed);
            this.limitSeconds = data.LeftSeconds;
        };
        /**清空VO,不要调用此方法，请通过vo.toPool来调用并清空 */
        FashionVO.prototype.reset = function () {
            this.template = null;
            this.isDressed = false;
            this.isActived = false;
            this.limitSeconds = 0;
            this.property = null;
        };
        Object.defineProperty(FashionVO.prototype, "type", {
            get: function () {
                return this.template.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FashionVO.prototype, "id", {
            get: function () {
                return this.template.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FashionVO.prototype, "name", {
            get: function () {
                return this.template.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FashionVO.prototype, "consume", {
            get: function () {
                return this.template.consume;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FashionVO.prototype, "model", {
            get: function () {
                return this.template.modelId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FashionVO.prototype, "score", {
            get: function () {
                return this.template.score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FashionVO.prototype, "proites", {
            get: function () {
                return this.template.properties;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FashionVO.prototype, "lastTime", {
            get: function () {
                return (this._endTime - GameModels.timer.getTimer() / 1000);
            },
            enumerable: true,
            configurable: true
        });
        return FashionVO;
    }(vo.VOBase));
    vo.FashionVO = FashionVO;
    __reflect(FashionVO.prototype, "vo.FashionVO");
})(vo || (vo = {}));
