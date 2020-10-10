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
    var LimitTargetVo = (function (_super) {
        __extends(LimitTargetVo, _super);
        function LimitTargetVo() {
            return _super.call(this) || this;
        }
        LimitTargetVo.prototype.initialize = function () {
            this._templates = null;
            this._currValue = 0;
            this._tatolValue = 0;
            this._currValue1 = 0;
            this._tatolValue1 = 0;
            this._state = 0;
            this._taskId = 0;
            this._older = 0;
        };
        LimitTargetVo.prototype.reset = function () {
            this._templates = null;
            this._currValue = 0;
            this._tatolValue = 0;
            this._currValue1 = 0;
            this._tatolValue1 = 0;
            this._state = 0;
            this._taskId = 0;
            this._older = 0;
        };
        LimitTargetVo.prototype.decode = function (data) {
            this._templates = Templates.getTemplateById(templates.Map.LIMITTARGETTASK, data.TaskId);
            this._currValue = data.Progress;
            this._tatolValue = data.TargetCnt;
            this._currValue1 = data.Progress2;
            this._tatolValue1 = data.TargetCnt2;
            this._state = data.Status;
            this._taskId = data.TaskId;
            this._older = this._templates.order;
            if (data.Status == 1)
                this._older = 1.5;
            if (data.Status == 2)
                this._older = 999;
        };
        Object.defineProperty(LimitTargetVo.prototype, "older", {
            get: function () {
                return this._older;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LimitTargetVo.prototype, "templates", {
            get: function () {
                return this._templates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LimitTargetVo.prototype, "taskId", {
            get: function () {
                return this._taskId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LimitTargetVo.prototype, "currValue", {
            get: function () {
                return this._currValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LimitTargetVo.prototype, "tatolValue", {
            get: function () {
                return this._tatolValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LimitTargetVo.prototype, "currValue1", {
            get: function () {
                return this._currValue1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LimitTargetVo.prototype, "tatolValue1", {
            get: function () {
                return this._tatolValue1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LimitTargetVo.prototype, "state", {
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
        return LimitTargetVo;
    }(vo.VOBase));
    vo.LimitTargetVo = LimitTargetVo;
    __reflect(LimitTargetVo.prototype, "vo.LimitTargetVo");
})(vo || (vo = {}));
