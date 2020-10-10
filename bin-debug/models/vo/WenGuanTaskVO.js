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
    var WenGuanTaskVO = (function (_super) {
        __extends(WenGuanTaskVO, _super);
        function WenGuanTaskVO() {
            return _super.call(this) || this;
        }
        WenGuanTaskVO.prototype.initialize = function () {
            this._templates = null;
            this._currValue = 0;
            this._tatolValue = 0;
            this._state = 0;
            this._taskId = 0;
        };
        WenGuanTaskVO.prototype.reset = function () {
            this._templates = null;
            this._currValue = 0;
            this._tatolValue = 0;
            this._state = 0;
            this._taskId = 0;
        };
        WenGuanTaskVO.prototype.decode = function (data) {
            this._templates = Templates.getTemplateById(templates.Map.WENGUANTASK, data.TaskId);
            this._currValue = data.Progress;
            this._tatolValue = data.TargetCnt;
            this._state = data.Status;
            this._taskId = data.TaskId;
        };
        Object.defineProperty(WenGuanTaskVO.prototype, "templates", {
            get: function () {
                return this._templates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WenGuanTaskVO.prototype, "taskId", {
            get: function () {
                return this._taskId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WenGuanTaskVO.prototype, "currValue", {
            get: function () {
                return this._currValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WenGuanTaskVO.prototype, "tatolValue", {
            get: function () {
                return this._tatolValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WenGuanTaskVO.prototype, "state", {
            /**0：未达成，1：已达成，2：已领奖 */
            get: function () {
                return this._state;
            },
            set: function (v) {
                this._state = v;
            },
            enumerable: true,
            configurable: true
        });
        return WenGuanTaskVO;
    }(vo.VOBase));
    vo.WenGuanTaskVO = WenGuanTaskVO;
    __reflect(WenGuanTaskVO.prototype, "vo.WenGuanTaskVO");
})(vo || (vo = {}));
