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
    var MingJiangTaskVO = (function (_super) {
        __extends(MingJiangTaskVO, _super);
        function MingJiangTaskVO() {
            return _super.call(this) || this;
        }
        MingJiangTaskVO.prototype.initialize = function (data) {
            this._taskId = data.TaskId;
            this._param1 = data.Param1;
            this._param2 = data.Param2;
            this._cond1 = data.Cond1;
            this._cond2 = data.Cond2;
            this._state = data.Status;
            this._finishCount = data.FinishCount;
            if (this._state == 3) {
                this._orde = 4;
            }
            else if (this._state == 2) {
                this._orde = 1;
            }
            else if (this._state == 1) {
                this._orde = 2;
            }
            else {
                this._orde = 3;
            }
        };
        MingJiangTaskVO.prototype.reset = function () {
            this._orde = 0;
            this._taskId = 0;
            this._param1 = 0;
            this._param2 = 0;
            this._cond1 = 0;
            this._cond2 = 0;
            this._state = 0;
            this._finishCount = 0;
        };
        Object.defineProperty(MingJiangTaskVO.prototype, "finishCount", {
            get: function () {
                return this._finishCount;
            },
            set: function (v) {
                this._finishCount = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MingJiangTaskVO.prototype, "taskId", {
            get: function () {
                return this._taskId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MingJiangTaskVO.prototype, "param1", {
            get: function () {
                return this._param1;
            },
            set: function (v) {
                this._param1 = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MingJiangTaskVO.prototype, "param2", {
            get: function () {
                return this._param2;
            },
            set: function (v) {
                this._param2 = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MingJiangTaskVO.prototype, "cond1", {
            get: function () {
                return this._cond1;
            },
            set: function (v) {
                this._cond1 = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MingJiangTaskVO.prototype, "cond2", {
            get: function () {
                return this._cond2;
            },
            set: function (v) {
                this._cond2 = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MingJiangTaskVO.prototype, "state", {
            /**0：未激活，1：已激活，2：完成可领取奖励，3：结束 */
            get: function () {
                return this._state;
            },
            set: function (v) {
                this._state = v;
                if (this._state == 3) {
                    this._orde = 4;
                }
                else if (this._state == 2) {
                    this._orde = 1;
                }
                else if (this._state == 1) {
                    this._orde = 2;
                }
                else {
                    this._orde = 3;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MingJiangTaskVO.prototype, "orde", {
            get: function () {
                return this._orde;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MingJiangTaskVO.prototype, "temp", {
            get: function () {
                var temp = Templates.getTemplateById(templates.Map.GENERALTASK, this._taskId);
                return temp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MingJiangTaskVO.prototype, "generalTemp", {
            get: function () {
                var temp = Templates.getTemplateById(templates.Map.GENERAL, this.temp.general);
                return temp;
            },
            enumerable: true,
            configurable: true
        });
        return MingJiangTaskVO;
    }(vo.VOBase));
    vo.MingJiangTaskVO = MingJiangTaskVO;
    __reflect(MingJiangTaskVO.prototype, "vo.MingJiangTaskVO");
})(vo || (vo = {}));
