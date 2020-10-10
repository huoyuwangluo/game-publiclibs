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
    var TavernRecordListVO = (function (_super) {
        __extends(TavernRecordListVO, _super);
        function TavernRecordListVO() {
            return _super.call(this) || this;
        }
        TavernRecordListVO.prototype.initialize = function (data) {
            this._data = data;
            this._data.autoRecover = false;
        };
        TavernRecordListVO.prototype.reset = function () {
            this._data = null;
            if (this._data) {
                n.MessagePool.to(this._data);
                this._data = null;
            }
        };
        Object.defineProperty(TavernRecordListVO.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        return TavernRecordListVO;
    }(vo.VOBase));
    vo.TavernRecordListVO = TavernRecordListVO;
    __reflect(TavernRecordListVO.prototype, "vo.TavernRecordListVO");
})(vo || (vo = {}));
