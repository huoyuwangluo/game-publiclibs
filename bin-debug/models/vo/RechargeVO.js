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
    var RechargeVO = (function (_super) {
        __extends(RechargeVO, _super);
        function RechargeVO() {
            return _super.call(this) || this;
        }
        RechargeVO.prototype.initialize = function (tmp, state) {
            this._tmp = tmp;
            this._buyState = state;
        };
        RechargeVO.prototype.reset = function () {
            this._tmp = null;
        };
        Object.defineProperty(RechargeVO.prototype, "template", {
            get: function () {
                return this._tmp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RechargeVO.prototype, "buyState", {
            get: function () {
                return this._buyState;
            },
            set: function (value) {
                this._buyState = value;
            },
            enumerable: true,
            configurable: true
        });
        return RechargeVO;
    }(vo.VOBase));
    vo.RechargeVO = RechargeVO;
    __reflect(RechargeVO.prototype, "vo.RechargeVO");
})(vo || (vo = {}));
