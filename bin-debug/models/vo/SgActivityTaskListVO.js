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
    var SgActivityTaskListVO = (function (_super) {
        __extends(SgActivityTaskListVO, _super);
        function SgActivityTaskListVO() {
            return _super.call(this) || this;
        }
        SgActivityTaskListVO.prototype.initialize = function (data, actType) {
            this._actType = actType;
            this._taskCfgId = data.TaskId;
            this._progress = data.Progress;
            this._targetCnt = data.TargetCnt;
            this._progress2 = data.Progress2;
            this._targetCnt2 = data.TargetCnt2;
            this._status = data.Status;
            if (actType == 811 || actType == 801 || actType == 802 || actType == 805) {
                //任务活动
                this._template = Templates.getTemplateById(templates.Map.ACTTASK, this._taskCfgId);
            }
            else if (actType == 851) {
                //兑换活动
                this._template = Templates.getTemplateById(templates.Map.ACTEXCHANGE, this._taskCfgId);
            }
            else {
            }
        };
        SgActivityTaskListVO.prototype.reset = function () {
            this._taskCfgId = 0;
            this._template = null;
            this._progress = 0;
            this._targetCnt = 0;
            this._progress2 = 0;
            this._targetCnt2 = 0;
            this._status = 0;
        };
        Object.defineProperty(SgActivityTaskListVO.prototype, "actType", {
            get: function () {
                return this._actType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "progress", {
            get: function () {
                return this._progress;
            },
            set: function (v) {
                this._progress = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "targetCnt", {
            get: function () {
                return this._targetCnt;
            },
            set: function (v) {
                this._targetCnt = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "progress2", {
            get: function () {
                return this._progress2;
            },
            set: function (v) {
                this._progress2 = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "targetCnt2", {
            get: function () {
                return this._targetCnt2;
            },
            set: function (v) {
                this._targetCnt2 = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "orde", {
            get: function () {
                if (this._status == 2) {
                    return 2;
                }
                else {
                    return this._status == 1 ? 0 : 1;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "status", {
            /**0：未达成，1：已达成，2：已领奖*/
            get: function () {
                return this._status;
            },
            set: function (v) {
                this._status = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "taskCfgId", {
            get: function () {
                return this._taskCfgId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "templateDes", {
            get: function () {
                if (this._template instanceof templates.actTask)
                    return this._template.des;
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "templateReward", {
            get: function () {
                if (this._template instanceof templates.actTask)
                    return this._template.rewards;
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SgActivityTaskListVO.prototype, "templateFunId", {
            get: function () {
                if (this._template instanceof templates.actTask)
                    return this._template.functionId;
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        return SgActivityTaskListVO;
    }(vo.VOBase));
    vo.SgActivityTaskListVO = SgActivityTaskListVO;
    __reflect(SgActivityTaskListVO.prototype, "vo.SgActivityTaskListVO");
})(vo || (vo = {}));
