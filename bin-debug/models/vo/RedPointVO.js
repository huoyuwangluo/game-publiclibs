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
    var RedPointVO = (function (_super) {
        __extends(RedPointVO, _super);
        function RedPointVO() {
            return _super.call(this) || this;
        }
        RedPointVO.prototype.initialize = function (data) {
            this._type = data.Type;
            this._state = data.State;
            this._param = data.Param;
        };
        RedPointVO.prototype.reset = function () {
            this._type = 0;
            this._state = 0;
            this._param = 0;
        };
        Object.defineProperty(RedPointVO.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RedPointVO.prototype, "state", {
            get: function () {
                return this._state;
            },
            set: function (v) {
                this._state = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RedPointVO.prototype, "param", {
            get: function () {
                return this._param;
            },
            set: function (v) {
                this._param = v;
            },
            enumerable: true,
            configurable: true
        });
        return RedPointVO;
    }(vo.VOBase));
    vo.RedPointVO = RedPointVO;
    __reflect(RedPointVO.prototype, "vo.RedPointVO");
})(vo || (vo = {}));
