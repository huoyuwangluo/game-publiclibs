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
    var CdVO = (function (_super) {
        __extends(CdVO, _super);
        function CdVO() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CdVO.prototype.initialize = function (time) {
            this._time = time;
        };
        CdVO.prototype.reset = function () {
            this.stop();
        };
        Object.defineProperty(CdVO.prototype, "startTime", {
            get: function () {
                return this._startTime;
            },
            enumerable: true,
            configurable: true
        });
        CdVO.prototype.start = function () {
            this._startTime = egret.getTimer();
            utils.timer.once(this._time, this, this.cdOverHandler, true);
        };
        CdVO.prototype.stop = function () {
            utils.timer.clear(this, this.cdOverHandler);
        };
        CdVO.prototype.cdOverHandler = function () {
            if (this._handler) {
                this._handler.run();
            }
        };
        CdVO.prototype.onOver = function (caller, method) {
            this.offOver();
            this._handler = utils.Handler.create(caller, method, null, false);
        };
        CdVO.prototype.offOver = function () {
            if (this._handler) {
                this._handler.recover();
                this._handler = null;
            }
        };
        return CdVO;
    }(vo.VOBase));
    vo.CdVO = CdVO;
    __reflect(CdVO.prototype, "vo.CdVO");
})(vo || (vo = {}));
