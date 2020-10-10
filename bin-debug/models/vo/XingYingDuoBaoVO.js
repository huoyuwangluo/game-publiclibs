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
    var XingYingDuoBaoVO = (function (_super) {
        __extends(XingYingDuoBaoVO, _super);
        function XingYingDuoBaoVO() {
            return _super.call(this) || this;
        }
        XingYingDuoBaoVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        XingYingDuoBaoVO.prototype.reset = function () {
            this._state = this._pos = 0;
        };
        XingYingDuoBaoVO.prototype.decode = function (data) {
            this._state = data.State;
            this._pos = data.Pos;
        };
        Object.defineProperty(XingYingDuoBaoVO.prototype, "pos", {
            get: function () {
                return this._pos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XingYingDuoBaoVO.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        return XingYingDuoBaoVO;
    }(vo.VOBase));
    vo.XingYingDuoBaoVO = XingYingDuoBaoVO;
    __reflect(XingYingDuoBaoVO.prototype, "vo.XingYingDuoBaoVO");
})(vo || (vo = {}));
